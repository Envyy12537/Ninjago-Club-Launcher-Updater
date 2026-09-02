/* ==========================================================================
   NINJAGO CLUB LAUNCHER - RENDERER LOGIC WITH MULTI-LANGUAGE (i18n)
   ========================================================================== */

// Completely block right-click context menu and dev tools hotkeys
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
    (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

document.addEventListener('DOMContentLoaded', async () => {
  // State variables
  let currentConfig = {
    gamePath: '',
    soundEnabled: true,
    autoCloseOnLaunch: false,
    autoUpdate: true,
    language: 'auto', // 'auto' | 'pl' | 'en' | 'uk' | 'de'
    playtimeSeconds: 0,
    hideNewsCard: false,
    discordUrl: 'https://discord.gg/ninjago',
    twitterUrl: 'https://x.com/ninjagofanproj'
  };

  let currentLang = 'en';
  let gameState = 'idle'; // 'idle' | 'launching' | 'running'
  let playtimeSeconds = 0;
  let playtimeTimer = null;
  const isElectron = Boolean(window.ninjagoLauncher);

  // Load app version dynamically from package.json via IPC
  let appVersion = '1.0.2';
  if (isElectron && window.ninjagoLauncher.getAppVersion) {
    try { appVersion = await window.ninjagoLauncher.getAppVersion(); } catch (e) {}
  }

  // Update all version display elements in the UI
  const versionBadge = document.getElementById('topbar-version-badge');
  const buildTag = document.getElementById('dl-build-tag');
  if (versionBadge) versionBadge.textContent = `wersja ${appVersion}`;
  if (buildTag) buildTag.textContent = `UI Build v${appVersion}`;

  // DOM Elements - Window & Navigation
  const winMinBtn = document.getElementById('win-min');
  const winMaxBtn = document.getElementById('win-max');
  const winCloseBtn = document.getElementById('win-close');
  const iconMaximize = winMaxBtn.querySelector('.icon-maximize');
  const iconRestore = winMaxBtn.querySelector('.icon-restore');

  const btnDiscord = document.getElementById('btn-discord');
  const btnTwitter = document.getElementById('btn-twitter');
  const faqDiscordLink = document.getElementById('faq-discord-link');

  // Tabs
  const tabLibrary = document.getElementById('tab-library');
  const tabPatch = document.getElementById('tab-patch');
  const tabFaq = document.getElementById('tab-faq');
  const viewLibrary = document.getElementById('library-view');
  const viewPatch = document.getElementById('patch-view');
  const viewFaq = document.getElementById('faq-view');
  const profileCard = document.getElementById('profile-card');

  // DOM Elements - Game Action & Specs
  const btnPlay = document.getElementById('btn-play-game');
  const btnPlayText = document.getElementById('btn-play-text');
  const btnPlaySubtext = document.getElementById('btn-play-subtext');
  const iconPlay = document.querySelector('.icon-state-play');
  const iconLoading = document.querySelector('.icon-state-loading');
  const iconStop = document.querySelector('.icon-state-stop');
  const displayPlaytime = document.getElementById('display-playtime');

  // DOM Elements - News Card & Minimize Pill
  const libraryNewsCard = document.getElementById('library-news-card');
  const btnHideNews = document.getElementById('btn-hide-news');
  const btnShowNews = document.getElementById('btn-show-news');
  const btnReadPatchNotes = document.getElementById('btn-read-patch-notes');

  // DOM Elements - Patch Notes View
  const patchFilterChips = document.querySelectorAll('[data-patch-filter]');
  const patchCards = document.querySelectorAll('.patch-entry-card');

  // DOM Elements - FAQ View
  const faqSearchInput = document.getElementById('faq-search-input');
  const faqClearSearch = document.getElementById('faq-clear-search');
  const faqFilterChips = document.querySelectorAll('[data-filter]');
  const faqCards = document.querySelectorAll('.faq-card');

  // DOM Elements - Settings Modal
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const btnCancelSettings = document.getElementById('btn-cancel-settings');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const settingsModal = document.getElementById('settings-modal');
  const langCards = document.querySelectorAll('.lang-card-btn');
  const settingAutoUpdate = document.getElementById('setting-auto-update');
  const btnCheckUpdates = document.getElementById('btn-check-updates');
  const updateStatusMsg = document.getElementById('update-status-msg');
  const settingSoundEnabled = document.getElementById('setting-sound-enabled');
  const settingAutoClose = document.getElementById('setting-auto-close');
  const settingGithubRepo = document.getElementById('setting-github-repo');
  const settingGithubToken = document.getElementById('setting-github-token');

  let selectedLangInModal = 'pl';

  // ==========================================================================
  // DISCORD RICH PRESENCE (RPC) HELPER
  // ==========================================================================
  function updateDiscordPresence(data = {}) {
    if (isElectron && window.ninjagoLauncher.setDiscordActivity) {
      window.ninjagoLauncher.setDiscordActivity({
        details: data.details || `W launcherze (v${appVersion})`,
        state: data.state || 'Przegląda: Biblioteka',
        largeImage: 'ninjagologo',
        largeText: 'Ninjago Club Launcher',
        smallImage: data.smallImage || null,
        smallText: data.smallText || null
      }).catch(() => {});
    }
  }

  // ==========================================================================
  // WEB AUDIO SYNTHESIZER (Futuristic SFX)
  // ==========================================================================
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (!currentConfig.soundEnabled) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'tab') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      } else if (type === 'launch') {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(220, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.35);
        osc2.frequency.setValueAtTime(440, now);
        osc2.frequency.exponentialRampToValueAtTime(1100, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.42);
        osc2.stop(now + 0.42);
      } else if (type === 'error') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.setValueAtTime(140, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      }
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // ==========================================================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(title, message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>`;

    if (type === 'error') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>`;
    } else if (type === 'warning') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ==========================================================================
  // INTERNATIONALIZATION (i18n) ENGINE & UI BUTTON SYNC
  // ==========================================================================
  function updatePlayButtonUI(state) {
    gameState = state;
    if (btnPlayText) {
      if (currentLang === 'pl') btnPlayText.textContent = 'WKR\u00d3TCE';
      else if (currentLang === 'de') btnPlayText.textContent = 'DEMN\u00c4CHST';
      else if (currentLang === 'uk') btnPlayText.textContent = '\u041d\u0415\u0417\u0410\u0411\u0410\u0420\u041e\u041c';
      else btnPlayText.textContent = 'COMING SOON';
    }
    if (btnPlaySubtext) {
      if (currentLang === 'pl') btnPlaySubtext.textContent = 'GRA W PRODUKCJI';
      else if (currentLang === 'de') btnPlaySubtext.textContent = 'IN PRODUKTION';
      else if (currentLang === 'uk') btnPlaySubtext.textContent = '\u0423 \u0412\u0418\u0420\u041e\u0411\u041d\u0418\u0426\u0422\u0412\u0406';
      else btnPlaySubtext.textContent = 'IN PRODUCTION';
    }
    // Button stays permanently disabled — game not yet released
    if (btnPlay) {
      btnPlay.setAttribute('disabled', 'true');
      btnPlay.style.pointerEvents = 'none';
    }
  }

  function t(key) {
    const langDict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : (translations?.en || {});
    return langDict[key] || translations?.en?.[key] || key;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated) {
        el.textContent = translated;
      }
    });

    // Translate attributes
    if (faqSearchInput) {
      faqSearchInput.placeholder = t('faq_search_placeholder');
    }

    // Refresh active state text on Install / Play button
    updatePlayButtonUI(gameState);

    // Re-align liquid glass glider with updated tab text width
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.tab-btn.active');
      if (activeTab) updateTabsGlider(activeTab, false);
    });
  }

  // ==========================================================================
  // PLAYTIME TRACKING & NEWS CARD VISIBILITY
  // ==========================================================================
  function formatPlaytime(totalSeconds) {
    if (!totalSeconds || totalSeconds < 60) {
      return '< 1m';
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }

  function updatePlaytimeDisplay() {
    if (displayPlaytime) {
      displayPlaytime.textContent = formatPlaytime(playtimeSeconds);
    }
  }

  function startPlaytimeCounter() {
    if (playtimeTimer) clearInterval(playtimeTimer);
    playtimeTimer = setInterval(() => {
      playtimeSeconds++;
      updatePlaytimeDisplay();
      // Auto-save every 30 seconds
      if (playtimeSeconds % 30 === 0 && isElectron) {
        currentConfig.playtimeSeconds = playtimeSeconds;
        window.ninjagoLauncher.saveConfig(currentConfig);
      }
    }, 1000);
  }

  function stopPlaytimeCounter() {
    if (playtimeTimer) {
      clearInterval(playtimeTimer);
      playtimeTimer = null;
    }
    if (isElectron) {
      currentConfig.playtimeSeconds = playtimeSeconds;
      window.ninjagoLauncher.saveConfig(currentConfig);
    }
  }

  function setNewsVisibility(hidden) {
    currentConfig.hideNewsCard = hidden;
    if (hidden) {
      if (libraryNewsCard) libraryNewsCard.classList.add('hide');
      if (btnShowNews) btnShowNews.classList.remove('hide');
    } else {
      if (libraryNewsCard) libraryNewsCard.classList.remove('hide');
      if (btnShowNews) btnShowNews.classList.add('hide');
    }
    if (isElectron) {
      window.ninjagoLauncher.saveConfig(currentConfig);
    }
  }

  if (btnHideNews) {
    btnHideNews.addEventListener('click', (e) => {
      e.stopPropagation();
      playSound('click');
      setNewsVisibility(true);
    });
  }

  if (btnShowNews) {
    btnShowNews.addEventListener('click', () => {
      playSound('click');
      setNewsVisibility(false);
    });
  }

  // ==========================================================================
  // CONFIGURATION SYNC & INITIAL LOCALE DETECTION
  // ==========================================================================
  async function loadLauncherConfig() {
    let systemLocale = 'en';

    if (isElectron) {
      try {
        systemLocale = await window.ninjagoLauncher.getSystemLocale();
        const config = await window.ninjagoLauncher.getConfig();
        if (config) {
          currentConfig = { ...currentConfig, ...config };
          playtimeSeconds = Number(currentConfig.playtimeSeconds) || 0;
        }
      } catch (err) {
        console.error('Failed to load config from main process:', err);
      }
    } else {
      systemLocale = navigator.language || 'en';
    }

    // Determine resolved language
    currentLang = resolveSystemLanguage(systemLocale, currentConfig.language);
    selectedLangInModal = currentLang;

    // Apply language, playtime, and UI settings
    applyLanguage(currentLang);
    updatePlaytimeDisplay();
    setNewsVisibility(Boolean(currentConfig.hideNewsCard));
    updateUIWithConfig();
  }

  function updateUIWithConfig() {
    if (settingSoundEnabled) settingSoundEnabled.checked = currentConfig.soundEnabled !== false;
    if (settingAutoClose) settingAutoClose.checked = Boolean(currentConfig.autoCloseOnLaunch);
    if (settingAutoUpdate) settingAutoUpdate.checked = currentConfig.autoUpdate !== false;
    if (settingGithubRepo) settingGithubRepo.value = currentConfig.githubRepo || 'NinjagoClub/Ninjago-Club-Launcher';
    if (settingGithubToken) settingGithubToken.value = currentConfig.githubToken || '';

    // Update active language selection card
    langCards.forEach(card => {
      if (card.getAttribute('data-lang') === selectedLangInModal) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // WINDOW CONTROLS & LISTENERS
  // ==========================================================================
  if (isElectron) {
    winMinBtn.addEventListener('click', () => {
      playSound('click');
      window.ninjagoLauncher.minimize();
    });

    winMaxBtn.addEventListener('click', async () => {
      playSound('click');
      const isMax = await window.ninjagoLauncher.maximize();
      updateMaximizeIcon(isMax);
    });

    winCloseBtn.addEventListener('click', () => {
      playSound('click');
      window.ninjagoLauncher.close();
    });

    window.ninjagoLauncher.onWindowStateChange((state) => {
      updateMaximizeIcon(state.isMaximized);
    });

    window.ninjagoLauncher.isMaximized().then(updateMaximizeIcon);
  }

  function updateMaximizeIcon(isMax) {
    if (isMax) {
      iconMaximize.classList.add('hide');
      iconRestore.classList.remove('hide');
    } else {
      iconMaximize.classList.remove('hide');
      iconRestore.classList.add('hide');
    }
  }

  // ==========================================================================
  // SOCIAL LINKS
  // ==========================================================================
  function openUrl(url) {
    playSound('click');
    if (isElectron) {
      window.ninjagoLauncher.openExternal(url);
      showToast(t('toast_opening_link'), `Redirecting to ${url}`, 'info', 2500);
    } else {
      window.open(url, '_blank');
    }
  }

  btnDiscord.addEventListener('click', () => openUrl(currentConfig.discordUrl || 'https://discord.gg/ninjago'));
  btnTwitter.addEventListener('click', () => openUrl(currentConfig.twitterUrl || 'https://x.com/ninjagofanproj'));
  if (faqDiscordLink) {
    faqDiscordLink.addEventListener('click', (e) => {
      e.preventDefault();
      openUrl(currentConfig.discordUrl || 'https://discord.gg/ninjago');
    });
  }

  // ==========================================================================
  // TABS SWITCHING (iOS LIQUID GLASS SEGMENTED PILL)
  // ==========================================================================
  const navTabsBar = document.getElementById('nav-tabs-bar');
  const navTabsGlider = document.getElementById('nav-tabs-glider');

  function updateTabsGlider(activeTab, animate = true) {
    if (!navTabsBar || !navTabsGlider || !activeTab) return;

    const barRect = navTabsBar.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    if (barRect.width === 0 || tabRect.width === 0) return;

    const left = tabRect.left - barRect.left;
    const width = tabRect.width;

    if (!animate) {
      navTabsGlider.style.transition = 'none';
    } else {
      navTabsGlider.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), width 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
      navTabsGlider.classList.add('gliding');
      setTimeout(() => navTabsGlider.classList.remove('gliding'), 420);
    }

    navTabsGlider.style.transform = `translateX(${left}px)`;
    navTabsGlider.style.width = `${width}px`;
  }

  function switchTab(target) {
    playSound('tab');

    let activeTabBtn = tabLibrary;

    // Deactivate all tabs
    [tabLibrary, tabPatch, tabFaq].forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    // Hide all views
    [viewLibrary, viewPatch, viewFaq].forEach(view => {
      view.classList.add('hide');
    });

    if (target === 'library') {
      tabLibrary.classList.add('active');
      tabLibrary.setAttribute('aria-selected', 'true');
      viewLibrary.classList.remove('hide');
      activeTabBtn = tabLibrary;
      updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Biblioteka gier' });
    } else if (target === 'patch') {
      tabPatch.classList.add('active');
      tabPatch.setAttribute('aria-selected', 'true');
      viewPatch.classList.remove('hide');
      activeTabBtn = tabPatch;
      updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Czyta: Closed Beta Roadmap' });
    } else if (target === 'faq') {
      tabFaq.classList.add('active');
      tabFaq.setAttribute('aria-selected', 'true');
      viewFaq.classList.remove('hide');
      activeTabBtn = tabFaq;
      updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Pomoc i FAQ' });
    }

    updateTabsGlider(activeTabBtn, true);
  }

  tabLibrary.addEventListener('click', () => switchTab('library'));
  tabPatch.addEventListener('click', () => switchTab('patch'));
  tabFaq.addEventListener('click', () => switchTab('faq'));

  // News Card Link to Patch notes
  btnReadPatchNotes.addEventListener('click', () => {
    switchTab('patch');
  });

  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) updateTabsGlider(activeTab, false);
  });

  // ==========================================================================
  // PATCH NOTES FILTERING
  // ==========================================================================
  patchFilterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      playSound('click');
      patchFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-patch-filter');
      patchCards.forEach((card) => {
        const type = card.getAttribute('data-patch-type');
        if (filter === 'all' || type === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ==========================================================================
  // GAME LAUNCH & PROCESS MANAGEMENT
  // ==========================================================================
  // INSTALLATION MODAL WITH C: / D: DRIVE SELECTOR
  // ==========================================================================
  const installModal = document.getElementById('install-modal');
  const btnCloseInstall = document.getElementById('btn-close-install');
  const btnCancelInstall = document.getElementById('btn-cancel-install');
  const installDrivesList = document.getElementById('install-drives-list');
  const installTargetPath = document.getElementById('install-target-path');
  const chkEulaAgree = document.getElementById('chk-eula-agree');
  const btnConfirmInstall = document.getElementById('btn-confirm-install');
  const installDiskCard = document.getElementById('install-disk-card');
  const installDiskLabel = document.getElementById('install-disk-label');
  const installDiskFree = document.getElementById('install-disk-free');
  const installSpaceWarning = document.getElementById('install-space-warning');

  const REQUIRED_SPACE_GB = 65.0;
  let hasEnoughDiskSpace = true;
  let selectedDriveLetter = 'C:';

  async function loadAndRenderDrives() {
    let drives = [
      { drive: 'C:', label: 'Dysk Lokalny (C:)', freeGb: 146.5, totalGb: 476.0, usedPercent: 69, defaultPath: 'C:\\Games\\Ninjago Club\\Game' },
      { drive: 'D:', label: 'Dysk Dane (D:)', freeGb: 524.6, totalGb: 931.5, usedPercent: 44, defaultPath: 'D:\\Games\\Ninjago Club\\Game' }
    ];

    if (isElectron && window.ninjagoLauncher.getAvailableDrives) {
      try {
        const loadedDrives = await window.ninjagoLauncher.getAvailableDrives();
        if (Array.isArray(loadedDrives) && loadedDrives.length > 0) {
          drives = loadedDrives;
        }
      } catch (e) {
        console.warn('Failed to query system drives:', e);
      }
    }

    // Default select D: if available and has more space, or keep C:
    if (!selectedDriveLetter) {
      selectedDriveLetter = drives[0].drive;
    }

    if (installDrivesList) {
      installDrivesList.innerHTML = drives.map(d => {
        const isActive = (d.drive.toUpperCase() === selectedDriveLetter.toUpperCase());
        return `
          <div class="install-drive-card ${isActive ? 'active' : ''}" data-drive="${d.drive}" data-path="${d.defaultPath}">
            <div class="drive-card-header">
              <div class="drive-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="10" cy="12" r="1.5"></circle>
                </svg>
              </div>
              <div class="drive-title-info">
                <span class="drive-name">${d.label}</span>
                <span class="drive-path-preview">${d.defaultPath}</span>
              </div>
              <div class="drive-check-badge">âś“</div>
            </div>
            <div class="drive-space-info">
              <div class="drive-space-text">
                <span class="drive-free-label">${d.freeGb.toFixed(1)} GB wolnego</span>
                <span class="drive-total-label">z ${d.totalGb.toFixed(1)} GB</span>
              </div>
              <div class="drive-space-track">
                <div class="drive-space-bar" style="width: ${d.usedPercent}%;"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Wire click events on drive cards
      installDrivesList.querySelectorAll('.install-drive-card').forEach(card => {
        card.addEventListener('click', () => {
          playSound('click');
          installDrivesList.querySelectorAll('.install-drive-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');

          const drive = card.getAttribute('data-drive');
          const pathVal = card.getAttribute('data-path');
          selectedDriveLetter = drive;

          if (installTargetPath) {
            installTargetPath.value = pathVal;
          }
          currentConfig.gamePath = pathVal;

          const activeDriveObj = drives.find(d => d.drive === drive);
          const freeGb = activeDriveObj ? activeDriveObj.freeGb : 140.0;
          updateDriveSpaceValidation(drive, freeGb);
        });
      });
    }

    const currentDriveObj = drives.find(d => d.drive.toUpperCase() === selectedDriveLetter.toUpperCase()) || drives[0];
    if (installTargetPath) {
      installTargetPath.value = currentDriveObj.defaultPath;
    }
    updateDriveSpaceValidation(currentDriveObj.drive, currentDriveObj.freeGb);
  }

  function updateDriveSpaceValidation(drive, freeGb) {
    if (installDiskLabel) {
      installDiskLabel.textContent = `DostÄ™pne na dysku ${drive}`;
    }

    if (installDiskFree) {
      installDiskFree.textContent = `${freeGb.toFixed(1)} GB wolnego`;
    }

    if (freeGb < REQUIRED_SPACE_GB) {
      hasEnoughDiskSpace = false;
      if (installDiskCard) {
        installDiskCard.classList.remove('highlight');
        installDiskCard.classList.add('insufficient');
      }
      if (installSpaceWarning) installSpaceWarning.classList.remove('hide');
    } else {
      hasEnoughDiskSpace = true;
      if (installDiskCard) {
        installDiskCard.classList.add('highlight');
        installDiskCard.classList.remove('insufficient');
      }
      if (installSpaceWarning) installSpaceWarning.classList.add('hide');
    }

    if (btnConfirmInstall) {
      btnConfirmInstall.disabled = !chkEulaAgree.checked || !hasEnoughDiskSpace;
    }
  }

  async function openInstallModal() {
    playSound('click');
    if (chkEulaAgree) chkEulaAgree.checked = false;
    if (btnConfirmInstall) btnConfirmInstall.disabled = true;
    updateDiscordPresence({ details: 'Konfiguracja instalacji', state: 'Wybór dysku dla gry (UE5)' });
    await loadAndRenderDrives();
    if (installModal) installModal.classList.remove('hide');
  }

  function closeInstallModal() {
    playSound('click');
    if (installModal) installModal.classList.add('hide');
    updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Biblioteka gier' });
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      openInstallModal();
    });
  }

  if (btnCloseInstall) btnCloseInstall.addEventListener('click', closeInstallModal);
  if (btnCancelInstall) btnCancelInstall.addEventListener('click', closeInstallModal);

  if (installModal) {
    installModal.addEventListener('click', (e) => {
      if (e.target === installModal) closeInstallModal();
    });
  }

  if (chkEulaAgree) {
    chkEulaAgree.addEventListener('change', () => {
      playSound('click');
      if (btnConfirmInstall) {
        btnConfirmInstall.disabled = !chkEulaAgree.checked || !hasEnoughDiskSpace;
      }
    });
  }

  let installSimTimer = null;
  function startDownloadSimulation() {
    if (installSimTimer) clearInterval(installSimTimer);
    let progress = 0;
    const totalGb = 46.0;

    installSimTimer = setInterval(() => {
      progress += Math.floor(Math.random() * 3) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(installSimTimer);
        updateDiscordPresence({
          details: 'Lego Ninjago Game of the series',
          state: 'Zainstalowano (Gotowe do uruchomienia)',
          smallImage: 'logolego',
          smallText: 'Zainstalowano'
        });
        showToast('Pobieranie ukoĹ„czone', 'PomyĹ›lnie pobrano i zweryfikowano pliki wczesnego dostÄ™pu!', 'success');
      } else {
        const currentGb = ((totalGb * progress) / 100).toFixed(1);
        updateDiscordPresence({
          details: 'Instaluje: Lego Ninjago Game of the series',
          state: `Pobieranie plikĂłw: ${progress}% (${currentGb} / ${totalGb} GB)`,
          smallImage: 'download',
          smallText: `Pobieranie: ${progress}%`
        });
      }
    }, 1200);
  }

  if (btnConfirmInstall) {
    btnConfirmInstall.addEventListener('click', async () => {
      playSound('success');
      const targetPath = installTargetPath ? installTargetPath.value : `C:\\Games\\Ninjago Club\\Game`;
      currentConfig.gamePath = targetPath;
      if (isElectron && window.ninjagoLauncher.saveConfig) {
        await window.ninjagoLauncher.saveConfig(currentConfig);
      }
      closeInstallModal();
      showToast('RozpoczÄ™to pobieranie', `Katalog: ${selectedDriveLetter} (${targetPath}). Pobieranie 46.0 GB...`, 'info', 5000);
      startDownloadSimulation();
    });
  }

  // ==========================================================================
  // FAQ SEARCH & ACCORDION
  // ==========================================================================
  faqCards.forEach((card) => {
    card.addEventListener('click', () => {
      playSound('click');
      const wasOpen = card.classList.contains('open');

      faqCards.forEach(c => {
        c.classList.remove('open');
        c.querySelector('.faq-answer-collapse').style.maxHeight = null;
      });

      if (!wasOpen) {
        card.classList.add('open');
        const collapse = card.querySelector('.faq-answer-collapse');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });

  faqFilterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      playSound('click');
      faqFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      filterFaqItems(filter, faqSearchInput.value.trim().toLowerCase());
    });
  });

  faqSearchInput.addEventListener('input', () => {
    const query = faqSearchInput.value.trim().toLowerCase();
    faqClearSearch.classList.toggle('hide', query.length === 0);

    const activeFilterChip = document.querySelector('[data-filter].active');
    const filter = activeFilterChip ? activeFilterChip.getAttribute('data-filter') : 'all';
    filterFaqItems(filter, query);
  });

  faqClearSearch.addEventListener('click', () => {
    faqSearchInput.value = '';
    faqClearSearch.classList.add('hide');
    const activeFilterChip = document.querySelector('[data-filter].active');
    const filter = activeFilterChip ? activeFilterChip.getAttribute('data-filter') : 'all';
    filterFaqItems(filter, '');
  });

  function filterFaqItems(category, query) {
    faqCards.forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCategory = category === 'all' || cardCat === category;
      const matchesQuery = !query || text.includes(query);

      if (matchesCategory && matchesQuery) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  }

  // ==========================================================================
  // DOWNLOADS MANAGER MODAL (EPIC GAMES STYLE)
  // ==========================================================================
  const btnOpenDownloads = document.getElementById('btn-open-downloads');
  const downloadsModal = document.getElementById('downloads-modal');
  const btnCloseDownloads = document.getElementById('btn-close-downloads');
  const dlNavBtns = document.querySelectorAll('.dl-nav-btn');
  const dlViewPanes = document.querySelectorAll('.dl-view-pane');

  const dlSettingNotify = document.getElementById('dl-setting-notify');
  const dlSettingEditors = document.getElementById('dl-setting-editors');
  const dlSettingGame = document.getElementById('dl-setting-game');
  const dlInputInstallDir = document.getElementById('dl-input-install-dir');
  const btnDlEditInstall = document.getElementById('btn-dl-edit-install');
  const dlSettingAutoActive = document.getElementById('dl-setting-auto-active');
  const dlSettingSchedule = document.getElementById('dl-setting-schedule');
  const dlSettingThrottle = document.getElementById('dl-setting-throttle');
  const dlInputCacheDir = document.getElementById('dl-input-cache-dir');
  const btnDlEditCache = document.getElementById('btn-dl-edit-cache');
  const btnDlResetCache = document.getElementById('btn-dl-reset-cache');
  const btnDlRestoreDefaults = document.getElementById('btn-dl-restore-defaults');

  function openDownloadsModal() {
    playSound('click');
    syncDownloadSettingsUI();
    updateDiscordPresence({ details: 'Menedżer pobierania', state: 'Przegląda pobieranie gier' });
    if (downloadsModal) downloadsModal.classList.remove('hide');
  }

  function closeDownloadsModal() {
    playSound('click');
    if (downloadsModal) downloadsModal.classList.add('hide');
    updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Biblioteka gier' });
  }

  if (btnOpenDownloads) btnOpenDownloads.addEventListener('click', openDownloadsModal);
  if (btnCloseDownloads) btnCloseDownloads.addEventListener('click', closeDownloadsModal);

  if (downloadsModal) {
    downloadsModal.addEventListener('click', (e) => {
      if (e.target === downloadsModal) {
        closeDownloadsModal();
      }
    });
  }

  // Switch tabs in downloads manager
  dlNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
      const targetTab = btn.getAttribute('data-dl-tab');

      dlNavBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      dlViewPanes.forEach(pane => {
        pane.classList.add('hide');
        pane.classList.remove('active');
      });

      const activePane = document.getElementById(`dl-pane-${targetTab}`);
      if (activePane) {
        activePane.classList.remove('hide');
        activePane.classList.add('active');
      }

      if (targetTab === 'inprogress') {
        updateDiscordPresence({ details: 'Menedżer pobierania', state: 'Kolejka pobierania (W toku)' });
      } else if (targetTab === 'installed') {
        updateDiscordPresence({ details: 'Menedżer pobierania', state: 'Zarządza: Pobrane gry' });
      } else if (targetTab === 'scheduled') {
        updateDiscordPresence({ details: 'Menedżer pobierania', state: 'Kolejka pobierania (Zaplanowane)' });
      } else if (targetTab === 'settings') {
        updateDiscordPresence({ details: 'Menedżer pobierania', state: 'Ustawienia pobierania' });
      }
    });
  });

  function syncDownloadSettingsUI() {
    const ds = currentConfig.downloadSettings || {
      notifyInstalled: false,
      allowDuringEditors: true,
      allowDuringGame: false,
      defaultInstallDir: 'C:\\Program Files\\Ninjago Club\\Game',
      autoUpdateActive: true,
      scheduleUpdates: false,
      throttleSpeed: false,
      cacheDir: 'C:\\ProgramData\\NinjagoClub\\Cache'
    };

    if (dlSettingNotify) dlSettingNotify.checked = Boolean(ds.notifyInstalled);
    if (dlSettingEditors) dlSettingEditors.checked = Boolean(ds.allowDuringEditors !== false);
    if (dlSettingGame) dlSettingGame.checked = Boolean(ds.allowDuringGame);
    if (dlInputInstallDir) dlInputInstallDir.value = ds.defaultInstallDir || 'C:\\Program Files\\Ninjago Club\\Game';
    if (dlSettingAutoActive) dlSettingAutoActive.checked = Boolean(ds.autoUpdateActive !== false);
    if (dlSettingSchedule) dlSettingSchedule.checked = Boolean(ds.scheduleUpdates);
    if (dlSettingThrottle) dlSettingThrottle.checked = Boolean(ds.throttleSpeed);
    if (dlInputCacheDir) dlInputCacheDir.value = ds.cacheDir || 'C:\\ProgramData\\NinjagoClub\\Cache';
    if (dlGameNinjagoPath) dlGameNinjagoPath.value = currentConfig.gamePath || 'C:\\Program Files\\Ninjago Club\\Game\\NinjagoCity.exe';
  }

  async function saveDownloadSettings() {
    if (!currentConfig.downloadSettings) currentConfig.downloadSettings = {};
    currentConfig.downloadSettings.notifyInstalled = dlSettingNotify ? dlSettingNotify.checked : false;
    currentConfig.downloadSettings.allowDuringEditors = dlSettingEditors ? dlSettingEditors.checked : true;
    currentConfig.downloadSettings.allowDuringGame = dlSettingGame ? dlSettingGame.checked : false;
    currentConfig.downloadSettings.defaultInstallDir = dlInputInstallDir ? dlInputInstallDir.value : 'C:\\Program Files\\Ninjago Club\\Game';
    currentConfig.downloadSettings.autoUpdateActive = dlSettingAutoActive ? dlSettingAutoActive.checked : true;
    currentConfig.downloadSettings.scheduleUpdates = dlSettingSchedule ? dlSettingSchedule.checked : false;
    currentConfig.downloadSettings.throttleSpeed = dlSettingThrottle ? dlSettingThrottle.checked : false;
    currentConfig.downloadSettings.cacheDir = dlInputCacheDir ? dlInputCacheDir.value : 'C:\\ProgramData\\NinjagoClub\\Cache';

    if (isElectron) {
      await window.ninjagoLauncher.saveConfig(currentConfig);
    }
  }

  // Bind change listeners to checkboxes
  [dlSettingNotify, dlSettingEditors, dlSettingGame, dlSettingAutoActive, dlSettingSchedule, dlSettingThrottle].forEach(chk => {
    if (chk) {
      chk.addEventListener('change', () => {
        playSound('click');
        saveDownloadSettings();
      });
    }
  });

  // Edit Install Dir
  if (btnDlEditInstall) {
    btnDlEditInstall.addEventListener('click', async () => {
      playSound('click');
      if (isElectron && window.ninjagoLauncher.selectDirectory) {
        const dir = await window.ninjagoLauncher.selectDirectory('Wybierz domyĹ›lny katalog instalacji gier');
        if (dir && dlInputInstallDir) {
          dlInputInstallDir.value = dir;
          saveDownloadSettings();
        }
      }
    });
  }

  // Edit Cache Dir
  if (btnDlEditCache) {
    btnDlEditCache.addEventListener('click', async () => {
      playSound('click');
      if (isElectron && window.ninjagoLauncher.selectDirectory) {
        const dir = await window.ninjagoLauncher.selectDirectory('Wybierz katalog pamiÄ™ci podrÄ™cznej danych');
        if (dir && dlInputCacheDir) {
          dlInputCacheDir.value = dir;
          saveDownloadSettings();
        }
      }
    });
  }

  // Reset Cache Dir
  if (btnDlResetCache) {
    btnDlResetCache.addEventListener('click', () => {
      playSound('click');
      if (dlInputCacheDir) {
        dlInputCacheDir.value = 'C:\\ProgramData\\NinjagoClub\\Cache';
        saveDownloadSettings();
      }
    });
  }

  // Installed Game Management (Lego Ninjago Game of the series)
  const dlGameNinjagoPath = document.getElementById('dl-game-ninjago-path');
  const btnOpenGameFolder = document.getElementById('btn-open-game-folder');
  const btnVerifyGameFiles = document.getElementById('btn-verify-game-files');
  const txtVerifyBtn = document.getElementById('txt-verify-btn');
  const dlVerifyLiveBox = document.getElementById('dl-verify-live-box');
  const dlVerifyStatusLabel = document.getElementById('dl-verify-status-label');
  const dlVerifyPercent = document.getElementById('dl-verify-percent');
  const dlVerifyProgressBar = document.getElementById('dl-verify-progress-bar');
  const dlVerifyDetailsLog = document.getElementById('dl-verify-details-log');

  // Open Game Folder in File Explorer
  if (btnOpenGameFolder) {
    btnOpenGameFolder.addEventListener('click', async () => {
      playSound('click');
      if (isElectron && window.ninjagoLauncher.openGameFolder) {
        await window.ninjagoLauncher.openGameFolder(currentConfig.gamePath);
        showToast('Eksplorator Windows', 'Otwarto folder z plikami gry.', 'info');
      } else {
        showToast('Lokalizacja gry', `Folder: ${currentConfig.gamePath}`, 'info');
      }
    });
  }

  // Verify Game Files with real-time feedback
  let isVerifying = false;

  if (btnVerifyGameFiles) {
    btnVerifyGameFiles.addEventListener('click', async () => {
      if (isVerifying) return;
      isVerifying = true;
      playSound('click');

      btnVerifyGameFiles.classList.add('verifying');
      btnVerifyGameFiles.disabled = true;
      if (txtVerifyBtn) txtVerifyBtn.textContent = 'Weryfikowanie...';
      if (dlVerifyLiveBox) dlVerifyLiveBox.classList.remove('hide');

      const verificationSteps = [
        { percent: 12, label: 'Sprawdzanie struktury katalogĂłw i plikĂłw wykonywalnych...', file: 'NinjagoCity.exe' },
        { percent: 28, label: 'Weryfikacja sum kontrolnych silnika Unreal Engine 5.4...', file: 'Engine/Binaries/Win64/UnrealEditor-Core.dll' },
        { percent: 45, label: 'Skanowanie pakietĂłw zasobĂłw gry Lumen & Nanite...', file: 'NinjagoCity/Content/Paks/NinjagoCity-Windows.pak' },
        { percent: 68, label: 'Sprawdzanie map i shaderĂłw Downtown Ninjago City...', file: 'NinjagoCity/Content/Maps/Downtown_Night_Lumen.umap' },
        { percent: 84, label: 'Weryfikacja modeli postaci ninja, broni i efektĂłw Spinjitzu...', file: 'NinjagoCity/Content/Characters/Lloyd/Lloyd_Hero.uasset' },
        { percent: 94, label: 'Doinstalowywanie brakujÄ…cych pamiÄ™ci podrÄ™cznych DDC...', file: 'NinjagoCity/DerivedDataCache/Boot.ddc' },
        { percent: 100, label: 'Weryfikacja zakoĹ„czona pomyĹ›lnie! Wszystkie pliki sÄ… sprawne.', file: '1428/1428 plikĂłw zweryfikowano i zsynchronizowano.' }
      ];

      for (let i = 0; i < verificationSteps.length; i++) {
        const step = verificationSteps[i];
        if (dlVerifyStatusLabel) dlVerifyStatusLabel.textContent = step.label;
        if (dlVerifyPercent) dlVerifyPercent.textContent = `${step.percent}%`;
        if (dlVerifyProgressBar) dlVerifyProgressBar.style.width = `${step.percent}%`;
        if (dlVerifyDetailsLog) dlVerifyDetailsLog.textContent = `Sprawdzono: ${step.file}`;
        await new Promise(r => setTimeout(r, 400));
      }

      if (isElectron && window.ninjagoLauncher.verifyGameFiles) {
        await window.ninjagoLauncher.verifyGameFiles(currentConfig.gamePath);
      }

      showToast('Weryfikacja zakoĹ„czona', 'Wszystkie pliki gry sÄ… sprawne i gotowe do gry.', 'info');

      setTimeout(() => {
        btnVerifyGameFiles.classList.remove('verifying');
        btnVerifyGameFiles.disabled = false;
        if (txtVerifyBtn) txtVerifyBtn.textContent = 'Zweryfikuj pliki gry';
        isVerifying = false;
      }, 1000);
    });
  }

  // ==========================================================================
  // SCHEDULED DOWNLOADS MANAGEMENT (CUSTOM UI)
  // ==========================================================================
  const dlTimePresetPills = document.querySelectorAll('.dl-time-preset-pill');
  const btnAddSchedule = document.getElementById('btn-add-schedule');
  const dlScheduledList = document.getElementById('dl-scheduled-list');

  let selectedPresetLabel = 'DziĹ› w nocy (02:00)';

  dlTimePresetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playSound('click');
      dlTimePresetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedPresetLabel = pill.querySelector('span') ? pill.querySelector('span').textContent : 'Jutro (03:00)';
    });
  });

  let scheduledTasks = [];

  function renderScheduledTasks() {
    if (!dlScheduledList) return;
    if (scheduledTasks.length === 0) {
      dlScheduledList.innerHTML = `
        <div class="dl-empty-state-box">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <div class="dl-empty-text">Brak zaplanowanych zadaĹ„ w kolejce.</div>
        </div>
      `;
      return;
    }

    dlScheduledList.innerHTML = scheduledTasks.map(task => `
      <div class="dl-scheduled-card-item" data-task-id="${task.id}">
        <div class="dl-scheduled-meta">
          <div class="dl-item-thumb">
            <img src="../logolego.png" alt="${task.game}" class="dl-item-thumb-img" onerror="this.src='../ninjagologo.png'">
          </div>
          <div class="dl-item-info">
            <div class="dl-item-title">${task.game}</div>
            <div class="dl-item-sub">${task.type} â€˘ Termin: <strong>${task.date}, ${task.time}</strong></div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="dl-status-chip online">${task.status}</span>
          <button type="button" class="dl-btn-cancel-schedule" data-cancel-id="${task.id}">Anuluj</button>
        </div>
      </div>
    `).join('');

    dlScheduledList.querySelectorAll('.dl-btn-cancel-schedule').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        const id = btn.getAttribute('data-cancel-id');
        scheduledTasks = scheduledTasks.filter(t => t.id !== id);
        renderScheduledTasks();
        showToast('Zaplanowane pobieranie', 'Anulowano zaplanowane zadanie pobierania.', 'info');
      });
    });
  }

  renderScheduledTasks();

  // Restore Defaults
  if (btnDlRestoreDefaults) {
    btnDlRestoreDefaults.addEventListener('click', () => {
      playSound('click');
      currentConfig.downloadSettings = {
        notifyInstalled: false,
        allowDuringEditors: true,
        allowDuringGame: false,
        defaultInstallDir: 'C:\\Program Files\\Ninjago Club\\Game',
        autoUpdateActive: true,
        scheduleUpdates: false,
        throttleSpeed: false,
        cacheDir: 'C:\\ProgramData\\NinjagoClub\\Cache'
      };
      syncDownloadSettingsUI();
      saveDownloadSettings();
      showToast('Ustawienia pobierania', 'PrzywrĂłcono domyĹ›lne ustawienia pobierania.', 'info');
    });
  }

  // ==========================================================================
  // SETTINGS MODAL & LANGUAGE SELECTION
  // ==========================================================================
  function openSettingsModal() {
    playSound('click');
    selectedLangInModal = currentLang;
    updateUIWithConfig();
    updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Dostosowuje: Ustawienia launchera' });
    settingsModal.classList.remove('hide');
  }

  function closeSettingsModal() {
    playSound('click');
    updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Biblioteka gier' });
    settingsModal.classList.add('hide');
  }

  btnOpenSettings.addEventListener('click', openSettingsModal);
  btnCloseSettings.addEventListener('click', closeSettingsModal);
  btnCancelSettings.addEventListener('click', closeSettingsModal);

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      closeSettingsModal();
    }
  });

  // Language Card Selection
  langCards.forEach(card => {
    card.addEventListener('click', () => {
      playSound('click');
      selectedLangInModal = card.getAttribute('data-lang');
      langCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Automatic Updates Check Button (GitHub Releases API)
  btnCheckUpdates.addEventListener('click', async () => {
    playSound('click');
    btnCheckUpdates.classList.add('checking');
    updateStatusMsg.textContent = 'Sprawdzanie aktualizacji...';

    if (isElectron && window.ninjagoLauncher.checkUpdates) {
      try {
        const result = await window.ninjagoLauncher.checkUpdates();
        btnCheckUpdates.classList.remove('checking');

        if (result && result.hasUpdate) {
          updateStatusMsg.innerHTML = `đźš€ <strong>Nowa wersja v${result.latestVersion} dostÄ™pna!</strong> (${result.releaseName || 'NCL RELEASE'})`;
          showToast('DostÄ™pna aktualizacja!', `Wersja v${result.latestVersion} jest dostÄ™pna do pobrania.`, 'info', 6000);
        } else {
          updateStatusMsg.textContent = `âś“ TwĂłj launcher jest aktualny (v${result?.currentVersion || '1.0.0'})`;
          showToast(t('toast_up_to_date'), `Brak aktualizacji (v${result?.currentVersion || '1.0.0'}).`, 'info');
        }
      } catch (e) {
        btnCheckUpdates.classList.remove('checking');
        updateStatusMsg.textContent = 'Nie udaĹ‚o siÄ™ poĹ‚Ä…czyÄ‡ z updaterem.';
      }
    } else {
      setTimeout(() => {
        btnCheckUpdates.classList.remove('checking');
        updateStatusMsg.textContent = `âś“ Launcher jest aktualny (v1.0.0)`;
        showToast(t('toast_up_to_date'), t('toast_up_to_date_msg'), 'info');
      }, 800);
    }
  });

  // Save Settings
  btnSaveSettings.addEventListener('click', async () => {
    playSound('click');
    currentConfig.language = selectedLangInModal;
    currentConfig.soundEnabled = settingSoundEnabled.checked;
    currentConfig.autoCloseOnLaunch = settingAutoClose.checked;
    currentConfig.autoUpdate = settingAutoUpdate.checked;
    if (settingGithubRepo) currentConfig.githubRepo = settingGithubRepo.value.trim() || 'NinjagoClub/Ninjago-Club-Launcher';
    if (settingGithubToken) currentConfig.githubToken = settingGithubToken.value.trim();

    // Apply the chosen language immediately across the UI
    applyLanguage(selectedLangInModal);

    if (isElectron) {
      await window.ninjagoLauncher.saveConfig(currentConfig);
    }

    closeSettingsModal();
    showToast(t('toast_settings_saved'), t('toast_settings_saved_msg'), 'info');
  });

  // ==========================================================================
  // DYNAMIC PARTICLES / ELEMENTAL ENERGY SPARKS CANVAS
  // ==========================================================================
  const canvas = document.getElementById('sparks-canvas');
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class SparkParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 2.5 + 1;
      this.speedY = -(Math.random() * 0.8 + 0.3);
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 250 + 150;

      const isGold = Math.random() > 0.75;
      this.color = isGold
        ? `rgba(245, 158, 11, ${this.opacity})`
        : `rgba(16, 185, 129, ${this.opacity})`;
    }

    update() {
      this.x += this.speedX + Math.sin(this.life * 0.03) * 0.3;
      this.y += this.speedY;
      this.life++;

      if (this.y < -10 || this.life > this.maxLife) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(canvas.width / 30), 45);
    for (let i = 0; i < count; i++) {
      particles.push(new SparkParticle());
    }
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(renderParticles);
  }

  initParticles();
  renderParticles();

  // ==========================================================================
  // SPLASH SCREEN & DISCORD AUTH SEQUENCE
  // ==========================================================================
  const splashBackdrop = document.getElementById('splash-auth-backdrop');
  const splashViewLoading = document.getElementById('splash-view-loading');
  const splashViewAuth = document.getElementById('splash-view-auth');
  const splashStatusText = document.getElementById('splash-status-text');
  const splashPercentText = document.getElementById('splash-percent-text');
  const splashProgressFill = document.getElementById('splash-progress-fill');
  const btnDiscordLogin = document.getElementById('btn-discord-login');
  const profileDropdown = document.getElementById('profile-dropdown');
  const btnProfileLogout = document.getElementById('btn-profile-logout');

  // User Profile UI Dynamic Updater
  function updateUserProfileUI(user) {
    const topbarPlayerName = document.getElementById('topbar-player-name');
    const dropdownPlayerName = document.getElementById('dropdown-player-name');
    const playerAvatarImg = document.getElementById('player-avatar-img');
    const defaultAvatarSvg = document.getElementById('default-avatar-svg');

    const displayName = user?.globalName || user?.username || 'NinjagoPlayer#1234';

    if (topbarPlayerName) topbarPlayerName.textContent = displayName;
    if (dropdownPlayerName) dropdownPlayerName.textContent = displayName;

    if (user && user.avatarUrl) {
      if (playerAvatarImg) {
        playerAvatarImg.src = user.avatarUrl;
        playerAvatarImg.classList.remove('hide');
        playerAvatarImg.onerror = () => {
          playerAvatarImg.classList.add('hide');
          if (defaultAvatarSvg) defaultAvatarSvg.classList.remove('hide');
        };
      }
      if (defaultAvatarSvg) {
        defaultAvatarSvg.classList.add('hide');
      }
    } else {
      if (playerAvatarImg) {
        playerAvatarImg.src = '';
        playerAvatarImg.classList.add('hide');
      }
      if (defaultAvatarSvg) {
        defaultAvatarSvg.classList.remove('hide');
      }
    }
  }

  // Profile Card Dropdown & Logout
  if (profileCard && profileDropdown) {
    profileCard.addEventListener('click', (e) => {
      e.stopPropagation();
      playSound('click');
      const isClosed = profileDropdown.classList.contains('hide');
      if (isClosed) {
        profileDropdown.classList.remove('hide');
        profileCard.classList.add('active');
        profileCard.setAttribute('aria-expanded', 'true');
      } else {
        profileDropdown.classList.add('hide');
        profileCard.classList.remove('active');
        profileCard.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (!profileCard.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hide');
        profileCard.classList.remove('active');
        profileCard.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function showAuthScreen() {
    if (!splashBackdrop) return;
    splashBackdrop.classList.remove('hide', 'fade-out');
    splashViewLoading.classList.add('hide');
    splashViewAuth.classList.remove('hide');
    if (btnDiscordLogin) {
      btnDiscordLogin.classList.remove('authenticating');
      const btnSpan = btnDiscordLogin.querySelector('span');
      if (btnSpan) btnSpan.textContent = t('auth_discord_btn');
    }
  }

  if (btnProfileLogout) {
    btnProfileLogout.addEventListener('click', async (e) => {
      e.stopPropagation();
      playSound('click');
      if (profileDropdown) {
        profileDropdown.classList.add('hide');
        profileCard.classList.remove('active');
        profileCard.setAttribute('aria-expanded', 'false');
      }
      currentConfig.isLoggedIn = false;
      currentConfig.user = null;
      updateUserProfileUI(null);

      if (isElectron) {
        await window.ninjagoLauncher.saveConfig(currentConfig);
      }
      showToast(t('auth_logout_toast_title'), t('auth_logout_toast_msg'), 'info');
      showAuthScreen();
    });
  }

  // Discord Setup Modal Elements
  const discordSetupModal = document.getElementById('discord-setup-modal');
  const btnCloseDiscordSetup = document.getElementById('btn-close-discord-setup');
  const btnSaveDiscordSetup = document.getElementById('btn-save-discord-setup');
  const btnApplyDemoUser = document.getElementById('btn-apply-demo-user');
  const inputDiscordClientId = document.getElementById('discord-client-id-input');
  const inputDiscordClientSecret = document.getElementById('discord-client-secret-input');
  const inputDemoUsername = document.getElementById('demo-username-input');
  const inputDemoAvatar = document.getElementById('demo-avatar-input');
  const linkDiscordPortal = document.getElementById('link-discord-portal');

  if (linkDiscordPortal) {
    linkDiscordPortal.addEventListener('click', (e) => {
      e.preventDefault();
      if (isElectron) {
        window.ninjagoLauncher.openExternal('https://discord.com/developers/applications');
      } else {
        window.open('https://discord.com/developers/applications', '_blank');
      }
    });
  }

  function openDiscordSetupModal() {
    playSound('click');
    if (discordSetupModal) {
      discordSetupModal.classList.remove('hide');
    }
  }

  function closeDiscordSetupModal() {
    playSound('click');
    if (discordSetupModal) {
      discordSetupModal.classList.add('hide');
    }
  }

  if (btnCloseDiscordSetup) {
    btnCloseDiscordSetup.addEventListener('click', closeDiscordSetupModal);
  }

  if (discordSetupModal) {
    discordSetupModal.addEventListener('click', (e) => {
      if (e.target === discordSetupModal) {
        closeDiscordSetupModal();
      }
    });
  }

  async function performDiscordLogin(customCredentials = {}) {
    btnDiscordLogin.classList.add('authenticating');
    const btnSpan = btnDiscordLogin.querySelector('span');
    if (btnSpan) btnSpan.textContent = t('auth_connecting');

    if (!isElectron) {
      // Browser preview mode
      setTimeout(() => {
        const dummyUser = {
          id: '123456789',
          username: 'NinjagoNinja',
          globalName: 'NinjagoNinja',
          avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
        };
        currentConfig.isLoggedIn = true;
        currentConfig.user = dummyUser;
        updateUserProfileUI(dummyUser);
        showToast(t('auth_success'), `Zalogowano jako ${dummyUser.globalName}`, 'info');
        dismissSplash();
        btnDiscordLogin.classList.remove('authenticating');
        if (btnSpan) btnSpan.textContent = t('auth_discord_btn');
      }, 1000);
      return;
    }

    try {
      const result = await window.ninjagoLauncher.loginDiscord(customCredentials);

      if (result.needConfig) {
        btnDiscordLogin.classList.remove('authenticating');
        if (btnSpan) btnSpan.textContent = t('auth_discord_btn');
        openDiscordSetupModal();
        return;
      }

      if (result.success && result.user) {
        currentConfig.isLoggedIn = true;
        currentConfig.user = result.user;
        currentConfig.playerTag = result.user.globalName || result.user.username;
        await window.ninjagoLauncher.saveConfig(currentConfig);
        updateUserProfileUI(result.user);
        showToast(t('auth_success'), `Zalogowano jako ${result.user.globalName || result.user.username}`, 'info');
        dismissSplash();
      } else if (result.cancelled) {
        // User closed the authorization window
      } else {
        showToast('BĹ‚Ä…d logowania Discord', result.error || 'Nie udaĹ‚o siÄ™ zalogowaÄ‡ przez Discord.', 'error');
      }
    } catch (err) {
      showToast('BĹ‚Ä…d Discord OAuth', err.message, 'error');
    } finally {
      btnDiscordLogin.classList.remove('authenticating');
      if (btnSpan) btnSpan.textContent = t('auth_discord_btn');
    }
  }

  if (btnDiscordLogin) {
    btnDiscordLogin.addEventListener('click', async () => {
      playSound('click');
      await performDiscordLogin();
    });
  }

  if (btnSaveDiscordSetup) {
    btnSaveDiscordSetup.addEventListener('click', async () => {
      playSound('click');
      const clientId = inputDiscordClientId.value.trim();
      const clientSecret = inputDiscordClientSecret.value.trim();

      if (!clientId || !clientSecret) {
        showToast('Wymagane dane', 'Wpisz Client ID oraz Client Secret z Discord Developer Portal.', 'warning');
        return;
      }

      if (isElectron) {
        await window.ninjagoLauncher.setDiscordCredentials({ clientId, clientSecret });
      }

      closeDiscordSetupModal();
      await performDiscordLogin({ clientId, clientSecret });
    });
  }

  if (btnApplyDemoUser) {
    btnApplyDemoUser.addEventListener('click', async () => {
      playSound('click');
      const nickname = inputDemoUsername.value.trim() || 'NinjagoFan';
      const customAvatar = inputDemoAvatar.value.trim() || 'https://cdn.discordapp.com/embed/avatars/2.png';

      const demoUser = {
        id: '999999999',
        username: nickname,
        globalName: nickname,
        avatarUrl: customAvatar
      };

      currentConfig.isLoggedIn = true;
      currentConfig.user = demoUser;
      currentConfig.playerTag = nickname;
      if (isElectron) {
        await window.ninjagoLauncher.saveConfig(currentConfig);
      }

      updateUserProfileUI(demoUser);
      closeDiscordSetupModal();
      showToast(t('auth_success'), `Zalogowano jako ${nickname}`, 'info');
      dismissSplash();
    });
  }

  // Listen to live update progress from main process
  if (isElectron && window.ninjagoLauncher.onUpdateProgress) {
    window.ninjagoLauncher.onUpdateProgress((progress) => {
      if (splashPercentText) splashPercentText.textContent = `${progress.percent}%`;
      if (splashProgressFill) splashProgressFill.style.width = `${progress.percent}%`;
      if (splashStatusText) splashStatusText.textContent = `Pobieranie aktualizacji z GitHub (${progress.percent}%)...`;
    });
  }

  async function runStartupSequence() {
    if (!splashBackdrop) return;

    try {
      // Step 1: Checking for updates from GitHub Releases (0% -> 30%)
      if (splashStatusText) splashStatusText.textContent = 'Sprawdzanie aktualizacji z GitHub...';
      if (splashPercentText) splashPercentText.textContent = '0%';
      if (splashProgressFill) splashProgressFill.style.width = '0%';

      let checkResult = null;
      if (isElectron && window.ninjagoLauncher.checkUpdates) {
        checkResult = await window.ninjagoLauncher.checkUpdates();
      }

      // Check if new version is available on GitHub Releases
      if (checkResult && checkResult.hasUpdate && checkResult.downloadUrl) {
        if (splashStatusText) splashStatusText.textContent = `Znaleziono wersjÄ™ v${checkResult.latestVersion}! Pobieranie...`;
        if (splashPercentText) splashPercentText.textContent = '10%';
        if (splashProgressFill) splashProgressFill.style.width = '10%';

        const dlResult = await window.ninjagoLauncher.downloadUpdate(checkResult.downloadUrl);
        if (dlResult && dlResult.success && dlResult.filePath) {
          if (splashStatusText) splashStatusText.textContent = 'Aktualizacja pobrana! Uruchamianie instalatora...';
          if (splashPercentText) splashPercentText.textContent = '100%';
          if (splashProgressFill) splashProgressFill.style.width = '100%';
          await new Promise(r => setTimeout(r, 800));
          await window.ninjagoLauncher.installUpdate(dlResult.filePath);
          return;
        }
      }

      // Step 2: Smooth progress to launcher
      if (splashProgressFill) splashProgressFill.style.width = '42%';
      if (splashPercentText) splashPercentText.textContent = '42%';
      await new Promise(r => setTimeout(r, 200));

      if (splashStatusText) splashStatusText.textContent = 'Weryfikacja plikĂłw i zasobĂłw launchera...';
      if (splashProgressFill) splashProgressFill.style.width = '78%';
      if (splashPercentText) splashPercentText.textContent = '78%';
      await new Promise(r => setTimeout(r, 250));

      if (splashProgressFill) splashProgressFill.style.width = '100%';
      if (splashPercentText) splashPercentText.textContent = '100%';
      if (splashStatusText) splashStatusText.textContent = `Launcher aktualny (v${checkResult?.currentVersion || '1.0.0'})`;
      await new Promise(r => setTimeout(r, 300));

      // Step 3: Transition to Discord Login or launch directly if already logged in
      if (currentConfig.isLoggedIn) {
        if (currentConfig.user) {
          updateUserProfileUI(currentConfig.user);
        }
        dismissSplash();
      } else {
        // Show Discord Auth View
        if (splashViewLoading) splashViewLoading.classList.add('hide');
        if (splashViewAuth) splashViewAuth.classList.remove('hide');
      }
    } catch (err) {
      console.error('Startup sequence error:', err);
      dismissSplash();
    }
  }

  function dismissSplash() {
    if (!splashBackdrop) return;
    splashBackdrop.classList.add('fade-out');
    setTimeout(() => {
      splashBackdrop.classList.add('hide');
    }, 450);
  }

  // Listen to Game Status (Running / Closed) for Discord RPC
  if (isElectron && window.ninjagoLauncher.onGameStatus) {
    window.ninjagoLauncher.onGameStatus((data) => {
      if (data && data.status === 'running') {
        updateDiscordPresence({
          details: 'Gra w: Lego Ninjago Game of the series',
          state: 'Eksploracja Ninjago City (Unreal Engine 5)',
          smallImage: 'logolego',
          smallText: 'W grze'
        });
      } else {
        updateDiscordPresence({
          details: `W launcherze (v${appVersion})`,
          state: 'Przegląda: Biblioteka gier'
        });
      }
    });
  }

  // Initial Config Load and Startup Sequence
  await loadLauncherConfig();
  if (currentConfig.isLoggedIn && currentConfig.user) {
    updateUserProfileUI(currentConfig.user);
  }
  requestAnimationFrame(() => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) updateTabsGlider(activeTab, false);
  });
  updateDiscordPresence({ details: `W launcherze (v${appVersion})`, state: 'Przegląda: Biblioteka gier' });
  await runStartupSequence();

  // =========================================================================
  // AUTO-UPDATE PUSH LISTENER (triggered by main.js startup check)
  // =========================================================================
  if (isElectron && window.ninjagoLauncher.onUpdateAvailable) {
    window.ninjagoLauncher.onUpdateAvailable((data) => {
      // Show toast notification
      showToast(
        '🔔 Dostępna aktualizacja!',
        `Wersja v${data.latestVersion} jest gotowa do pobrania.`,
        'info',
        8000
      );

      // Update the status message in Settings if visible
      if (updateStatusMsg) {
        updateStatusMsg.innerHTML =
          `🆕 <strong>Nowa wersja v${data.latestVersion} dostępna!</strong> ` +
          `(${data.releaseName || 'NCL RELEASE'})`;
      }

      // Store download URL for the download button
      if (data.downloadUrl) {
        window.__pendingUpdateUrl = data.downloadUrl;
        window.__pendingUpdateName = data.assetName || `Ninjago Club Launcher Setup ${data.latestVersion}.exe`;
      }
    });
  }
});

