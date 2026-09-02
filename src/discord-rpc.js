// ============================================================================
// NINJAGO CLUB LAUNCHER - DISCORD RICH PRESENCE (RPC) CLIENT
// Pure JavaScript Named Pipe Implementation (Zero External Dependencies)
// ============================================================================

const net = require('net');
const EventEmitter = require('events');

const OPCODES = {
  HANDSHAKE: 0,
  FRAME: 1,
  CLOSE: 2,
  PING: 3,
  PONG: 4
};

class DiscordRPCClient extends EventEmitter {
  constructor(clientId) {
    super();
    this.clientId = clientId;
    this.socket = null;
    this.connected = false;
    this.currentActivity = null;
    this.startTimestamp = Math.floor(Date.now() / 1000);
    this.reconnectTimer = null;
    // Buffer for reassembling split TCP packets
    this._recvBuf = Buffer.alloc(0);
  }

  setClientId(clientId) {
    if (clientId && clientId !== this.clientId) {
      this.clientId = clientId;
      if (this.connected) {
        this.disconnect();
      }
      this.connect();
    }
  }

  connect() {
    if (this.socket || !this.clientId) return;

    this.findDiscordPipe((pipePath) => {
      if (!pipePath) {
        this.scheduleReconnect();
        return;
      }

      this.socket = net.connect(pipePath, () => {
        this._recvBuf = Buffer.alloc(0);
        this.sendHandshake();
      });

      this.socket.on('data', (chunk) => {
        this.handleChunk(chunk);
      });

      this.socket.on('close', () => {
        this.cleanup();
        this.scheduleReconnect();
      });

      this.socket.on('error', () => {
        this.cleanup();
        this.scheduleReconnect();
      });
    });
  }

  findDiscordPipe(callback) {
    let index = 0;
    const tryNext = () => {
      if (index > 9) return callback(null);
      const pipe = `\\\\?\\pipe\\discord-ipc-${index}`;
      const s = net.connect(pipe, () => {
        s.removeAllListeners();
        s.end();
        callback(pipe);
      });
      s.on('error', () => {
        index++;
        tryNext();
      });
    };
    tryNext();
  }

  sendHandshake() {
    this.send(OPCODES.HANDSHAKE, { v: 1, client_id: this.clientId });
  }

  send(opcode, data) {
    if (!this.socket || this.socket.destroyed) return;
    try {
      const json = JSON.stringify(data);
      const jsonBuf = Buffer.from(json, 'utf8');
      const packet = Buffer.alloc(8 + jsonBuf.length);
      packet.writeInt32LE(opcode, 0);
      packet.writeInt32LE(jsonBuf.length, 4);
      jsonBuf.copy(packet, 8);
      this.socket.write(packet);
    } catch (err) {
      console.warn('[Discord RPC] Send error:', err.message);
    }
  }

  // Handles TCP fragmentation — Discord IPC can send split packets
  handleChunk(chunk) {
    this._recvBuf = Buffer.concat([this._recvBuf, chunk]);

    while (this._recvBuf.length >= 8) {
      const length = this._recvBuf.readInt32LE(4);
      const totalLength = 8 + length;

      // Wait for full packet
      if (this._recvBuf.length < totalLength) break;

      const opcode = this._recvBuf.readInt32LE(0);
      const jsonStr = this._recvBuf.toString('utf8', 8, totalLength);

      // Consume packet from buffer
      this._recvBuf = this._recvBuf.slice(totalLength);

      try {
        const data = JSON.parse(jsonStr);
        this.handlePacket(opcode, data);
      } catch (e) {
        // Malformed JSON from Discord — safe to ignore
      }
    }
  }

  handlePacket(opcode, data) {
    if (opcode === OPCODES.PING) {
      // Reply to Discord keepalive pings
      this.send(OPCODES.PONG, data);
      return;
    }

    if (data.evt === 'READY') {
      this.connected = true;
      this.emit('ready', data.data);
      if (this.currentActivity) {
        this.updateActivity(this.currentActivity);
      }
    } else if (data.evt === 'ERROR') {
      // Log but don't crash — Discord returns errors for unsupported fields
      console.warn('[Discord RPC] Error response:', data.data && data.data.message);
    }
  }

  setActivity(activity) {
    this.currentActivity = activity;
    if (this.connected) {
      this.updateActivity(activity);
    } else if (!this.socket) {
      this.connect();
    }
  }

  updateActivity(activity) {
    if (!this.connected || !this.socket || this.socket.destroyed) return;

    // NOTE: 'buttons' field is NOT supported via IPC (only via Bot API).
    // Including it causes Discord to return an error and close the connection.
    const activityPayload = {
      details: activity.details || 'W launcherze',
      state: activity.state || 'Ninjago Club Launcher',
      timestamps: {
        start: activity.startTimestamp || this.startTimestamp
      },
      assets: {
        large_image: activity.largeImage || 'ninjagologo',
        large_text: activity.largeText || 'Ninjago Club Launcher',
        small_image: activity.smallImage || 'logolego',
        small_text: activity.smallText || 'Wczesny Dostęp (UE5)'
      }
    };

    // Only include small_image if provided (avoids empty asset errors)
    if (!activity.smallImage) {
      delete activityPayload.assets.small_image;
      delete activityPayload.assets.small_text;
    }

    const payload = {
      cmd: 'SET_ACTIVITY',
      args: {
        pid: process.pid,
        activity: activityPayload
      },
      nonce: `ncl-${Date.now()}`
    };

    this.send(OPCODES.FRAME, payload);
  }

  clearActivity() {
    this.currentActivity = null;
    if (this.connected && this.socket && !this.socket.destroyed) {
      this.send(OPCODES.FRAME, {
        cmd: 'SET_ACTIVITY',
        args: { pid: process.pid, activity: null },
        nonce: `ncl-clear-${Date.now()}`
      });
    }
  }

  scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 12000);
  }

  cleanup() {
    this.connected = false;
    this._recvBuf = Buffer.alloc(0);
    if (this.socket) {
      this.socket.removeAllListeners();
      try { this.socket.destroy(); } catch (e) {}
      this.socket = null;
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.clearActivity();
    this.cleanup();
  }
}

module.exports = DiscordRPCClient;
