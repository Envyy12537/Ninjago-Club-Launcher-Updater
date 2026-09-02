const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ninjagoLauncher', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  onWindowStateChange: (callback) => {
    const handler = (_, state) => callback(state);
    ipcRenderer.on('window:state-changed', handler);
    return () => ipcRenderer.removeListener('window:state-changed', handler);
  },

  // System Locale, Updates, Disk Space & App Version
  getAppVersion: () => ipcRenderer.invoke('app:get-version'),
  getSystemLocale: () => ipcRenderer.invoke('system:get-locale'),
  checkUpdates: (customRepo) => ipcRenderer.invoke('app:check-updates', customRepo),
  downloadUpdate: (url) => ipcRenderer.invoke('app:download-update', url),
  installUpdate: (filePath) => ipcRenderer.invoke('app:install-update', filePath),
  onUpdateProgress: (callback) => {
    const handler = (_, progress) => callback(progress);
    ipcRenderer.on('updater:progress', handler);
    return () => ipcRenderer.removeListener('updater:progress', handler);
  },
  getDiskSpace: (targetPath) => ipcRenderer.invoke('system:get-disk-space', targetPath),
  getAvailableDrives: () => ipcRenderer.invoke('system:get-available-drives'),

  // External browser links
  openExternal: (url) => ipcRenderer.invoke('open:external', url),

  // Configuration
  getConfig: () => ipcRenderer.invoke('config:get'),
  saveConfig: (config) => ipcRenderer.invoke('config:save', config),

  // Discord Authentication & Rich Presence (RPC)
  loginDiscord: (credentials) => ipcRenderer.invoke('auth:discord-login', credentials),
  setDiscordCredentials: (credentials) => ipcRenderer.invoke('auth:set-discord-credentials', credentials),
  getDiscordConfig: () => ipcRenderer.invoke('auth:get-discord-config'),
  setDiscordActivity: (activity) => ipcRenderer.invoke('discord:set-activity', activity),

  // Game management
  selectGameExe: () => ipcRenderer.invoke('dialog:select-game-exe'),
  selectDirectory: (title) => ipcRenderer.invoke('dialog:select-directory', title),
  checkGameFile: (customPath) => ipcRenderer.invoke('game:check-file', customPath),
  openGameFolder: (customPath) => ipcRenderer.invoke('game:open-folder', customPath),
  verifyGameFiles: (customPath) => ipcRenderer.invoke('game:verify-files', customPath),
  launchGame: (options) => ipcRenderer.invoke('game:launch', options),
  stopGame: () => ipcRenderer.invoke('game:stop'),
  onGameStatus: (callback) => {
    const handler = (_, data) => callback(data);
    ipcRenderer.on('game:status-changed', handler);
    return () => ipcRenderer.removeListener('game:status-changed', handler);
  }
});
