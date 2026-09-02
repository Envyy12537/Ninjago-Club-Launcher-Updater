/* ==========================================================================
   NINJAGO CLUB LAUNCHER - INTERNATIONALIZATION (i18n) DICTIONARY
   Supported Languages: English (en), Polski (pl), Українська (uk), Deutsch (de)
   ========================================================================== */

const translations = {
  en: {
    // Splash & Auth Screen
    splash_app_title: 'NINJAGO CLUB',
    splash_checking_updates: 'Checking for updates...',
    splash_downloading_assets: 'Downloading required assets...',
    splash_ready: 'Ready to launch',
    auth_title: 'Sign In with Discord',
    auth_subtitle: 'Connect your Discord account to access Ninjago Club servers',
    auth_discord_btn: 'Login with Discord',
    auth_connecting: 'Authenticating with Discord...',
    auth_success: 'Logged in successfully!',
    auth_logout_toast_title: 'Logged Out',
    auth_logout_toast_msg: 'You have been logged out successfully.',

    // Top Bar
    tab_library: 'LIBRARY',
    tab_patch: 'PATCH',
    tab_faq: 'FAQ',
    social_discord: 'Discord',
    social_x: 'X',
    player_version: 'version 1.0.0',
    profile_title: 'User Profile',
    profile_logout: 'Log Out',
    status_online: 'Online',
    settings_btn_title: 'Launcher Settings',
    win_min: 'Minimize',
    win_max: 'Maximize / Restore',
    win_close: 'Close',

    // Library View
    badge_ue5: 'UNREAL ENGINE 5.4',
    badge_lumen: 'LUMEN & NANITE',
    badge_fan: 'FAN PROJECT',
    badge_online: 'CLOSED BETA',
    badge_closed_beta: 'CLOSED BETA',
    title_sub: 'THE EXPEDITION OF',
    title_main: 'NINJAGO CITY',
    title_highlight: 'OPEN WORLD',
    game_tagline: 'Master the ancient arts of Spinjitzu across the sprawling neon districts of Ninjago City. Experience a next-generation open world adventure built faithfully in Unreal Engine 5.',
    
    // Play Button States
    play_btn_idle: 'PLAY',
    play_btn_idle_sub: 'EARLY ACCESS',
    play_btn_launching: 'STARTING...',
    play_btn_launching_sub: 'INITIALIZING LUMEN & SHADERS',
    play_btn_running: 'STOP GAME',
    play_btn_running_sub: 'CLICK TO TERMINATE PROCESS',

    // Meta & Specs
    server_status: 'SERVERS ONLINE (EU-1)',
    spec_graphics_title: 'GRAPHICS API',
    spec_graphics_val: 'DirectX 12 / Vulkan',
    spec_coop_title: 'MULTIPLAYER',
    spec_coop_val: 'Up to 4 Players',
    spec_playtime_title: 'PLAY TIME',

    // News Card
    news_badge: 'LATEST PATCH',
    news_version: 'v1.0.0 Beta',
    news_title: 'Night City Spinjitzu & Lighting Overhaul',
    news_snippet: 'New high-density volumetric fog, Lumen Global Illumination enhancements, and fluid combat transitions for Kai and Lloyd.',
    news_read_btn: 'View Full Patch Notes',
    news_hide_btn: 'Hide',
    news_show_btn: 'Latest Patch',

    // Patch Notes View
    patch_badge: 'UPDATE HISTORY & CHANGELOG',
    patch_main_title: 'PATCH NOTES',
    patch_subtitle: 'Discover all new content, combat balances, visual enhancements, and Unreal Engine 5 optimizations.',
    patch_tag_all: 'All Updates',
    patch_tag_major: 'Major Releases',
    patch_tag_balance: 'Balance & Fixes',
    
    patch_v100_title: 'v1.0.0 Closed Beta - The Neon Horizon Update',
    patch_v100_date: 'September 1, 2026',
    patch_v100_badge: 'CURRENT BUILD',
    patch_v100_feat1: 'Added full exploration of Downtown Ninjago City with real-time Lumen reflections.',
    patch_v100_feat2: 'Overhauled Spinjitzu combat physics with elemental chain combos (Fire, Lightning, Earth, Ice).',
    patch_v100_feat3: 'Implemented 4-player online drop-in/drop-out cooperative multiplayer.',
    patch_v100_feat4: 'Integrated NVIDIA DLSS 3.7 Frame Generation and AMD FSR 3.1 support.',

    patch_v098_title: 'v0.9.8 Alpha - Elemental Mastery & Serpentine Lairs',
    patch_v098_date: 'August 14, 2026',
    patch_v098_feat1: 'Introduced underground Serpentine tomb dungeons with dynamic puzzle mechanics.',
    patch_v098_feat2: 'Upgraded character mobility: wall-running, grappling hook, and rooftop parkour.',
    patch_v098_feat3: 'Optimized Nanite geometry rendering for over 100,000 architectural meshes.',

    patch_v090_title: 'v0.9.0 Alpha - Unreal Engine 5.4 Core Migration',
    patch_v090_date: 'July 2, 2026',
    patch_v090_feat1: 'Migrated project to Unreal Engine 5.4 with enhanced multi-threaded CPU tasking.',
    patch_v090_feat2: 'Implemented dynamic day/night weather cycle with volumetric thunderstorms.',

    // FAQ View
    faq_badge: 'KNOWLEDGE BASE & SUPPORT',
    faq_main_title: 'FREQUENTLY ASKED QUESTIONS',
    faq_subtitle: 'Everything you need to know about Ninjago City: Open World, requirements, and UE5 performance.',
    faq_search_placeholder: 'Search questions, troubleshooting, graphics settings...',
    faq_filter_all: 'All Topics',
    faq_filter_install: 'Installation & Setup',
    faq_filter_perf: 'UE5 Performance',
    faq_filter_gameplay: 'Gameplay & Co-Op',
    faq_filter_legal: 'Fan Project Info',

    faq_q1: 'How do I start the game or select the Unreal Engine 5 build?',
    faq_a1: 'The launcher automatically launches the built Unreal Engine 5 executable from the default game directory. Click the green PLAY button on the Library tab to jump right into the game.',
    
    faq_q2: 'What are the minimum and recommended system requirements?',
    faq_a2_min_title: 'MINIMUM REQUIREMENTS',
    faq_a2_rec_title: 'RECOMMENDED (Lumen & Nanite)',
    faq_a2_os: 'OS',
    faq_a2_cpu: 'CPU',
    faq_a2_ram: 'RAM',
    faq_a2_gpu: 'GPU',
    faq_a2_dx: 'DirectX',
    faq_a2_storage: 'Storage',

    faq_q3: 'Is this game free and is it affiliated with LEGO?',
    faq_a3: 'Ninjago City: Open World is a 100% free non-commercial fan-made project created by passionate fans. All Ninjago characters, lore, and trademarks belong to The LEGO Group.',

    faq_q4: 'Does the game support co-op multiplayer and controllers?',
    faq_a4: 'Yes! The Closed Beta includes 4-player online co-op and full native support for Xbox Wireless Controllers, PlayStation DualSense / DualShock 4, and standard XInput gamepads.',

    faq_q5: 'How to boost FPS and enable DLSS / FSR 3 / TSR?',
    faq_a5: 'In the in-game settings menu under Video -> Upscaling, you can enable NVIDIA DLSS Super Resolution & Frame Generation, AMD FSR 3, or Epic TSR. For mid-range GPUs, setting Global Illumination to High yields a massive performance boost.',

    faq_q6: 'How do I report bugs or submit feedback to the developers?',
    faq_a6: 'Join our official Discord server and post your crash logs or gameplay clips in the #beta-feedback and #bug-reports channels.',

    // Settings Modal
    settings_header: 'LAUNCHER SETTINGS',
    settings_lang_label: 'Language / Język / Мова / Sprache',
    settings_lang_desc: 'Select your preferred interface language',
    settings_autoupdate_label: 'Automatic Updates',
    settings_autoupdate_desc: 'Automatically check, download, and install latest game patches & launcher fixes',
    settings_check_update_btn: 'Check for Updates Now',
    settings_check_update_status: 'Your launcher and game files are up to date (v1.0.0)',
    settings_sound_label: 'Launcher Sound Effects',
    settings_sound_desc: 'Play UI clicks, tab transitions, and ambient audio feedback',
    settings_autoclose_label: 'Close Launcher on Game Launch',
    settings_autoclose_desc: 'Automatically close the launcher once Unreal Engine 5 starts',
    btn_cancel: 'Cancel',
    // Downloads Manager
    downloads_btn_title: 'Downloads & Updates',
    dl_modal_title: 'Download Manager',
    dl_tab_summary: 'Summary',
    dl_tab_scheduled: 'Scheduled',
    dl_tab_recent: 'Recently Updated',
    dl_tab_settings: 'Download Settings',
    dl_recent_activity_title: 'Recent Activity',
    dl_section_recent: 'RECENT',
    dl_scheduled_title: 'Scheduled',
    dl_recent_updated_title: 'Recently Updated',
    dl_settings_title: 'Download Settings',

    // Toasts
    toast_settings_saved: 'Settings Saved',
    toast_settings_saved_msg: 'Your preferences have been updated.',
    toast_checking_updates: 'Checking for Updates',
    toast_checking_updates_msg: 'Connecting to update servers...',
    toast_up_to_date: 'Up to Date',
    toast_up_to_date_msg: 'You have the latest version (v1.0.0).',
    toast_game_launched: 'Game Launched!',
    toast_game_launched_msg: 'Ninjago City is running',
    toast_game_stopped: 'Game Closed',
    toast_game_stopped_msg: 'Game session ended successfully.',
    toast_opening_link: 'Opening Browser'
  },

  pl: {
    // Splash & Auth Screen
    splash_app_title: 'NINJAGO CLUB',
    splash_checking_updates: 'Sprawdzanie aktualizacji...',
    splash_downloading_assets: 'Pobieranie potrzebnych assetów...',
    splash_ready: 'Wszystko gotowe',
    auth_title: 'Zaloguj się przez Discord',
    auth_subtitle: 'Połącz swoje konto Discord, aby uzyskać dostęp do serwerów Ninjago Club',
    auth_discord_btn: 'Zaloguj się przez Discord',
    auth_connecting: 'Autoryzacja przez Discord...',
    auth_success: 'Zalogowano pomyślnie!',
    auth_logout_toast_title: 'Wylogowano',
    auth_logout_toast_msg: 'Zostałeś pomyślnie wylogowany.',

    // Top Bar
    tab_library: 'BIBLIOTEKA',
    tab_patch: 'PATCHE',
    tab_faq: 'FAQ',
    social_discord: 'Discord',
    social_x: 'X',
    player_version: 'wersja 1.0.0',
    profile_title: 'Profil gracza',
    profile_logout: 'Wyloguj się',
    status_online: 'Online',
    settings_btn_title: 'Ustawienia launchera',
    win_min: 'Minimalizuj',
    win_max: 'Maksymalizuj / Przywróć',
    win_close: 'Zamknij',

    // Library View
    badge_ue5: 'UNREAL ENGINE 5.4',
    badge_lumen: 'LUMEN & NANITE',
    badge_fan: 'PROJEKT FANOWSKI',
    badge_online: 'ZAMKNIĘTA BETA',
    badge_closed_beta: 'ZAMKNIĘTA BETA',
    title_sub: 'WYPRAWA DO',
    title_main: 'NINJAGO CITY',
    title_highlight: 'OTWARTY ŚWIAT',
    game_tagline: 'Opanuj starożytną sztukę Spinjitzu na tętniących neonami ulicach Ninjago City. Doświadcz przygody nowej generacji z otwartym światem stworzonej w Unreal Engine 5.',

    // Play Button States
    play_btn_idle: 'GRAJ',
    play_btn_idle_sub: 'WCZESNY DOSTĘP',
    play_btn_launching: 'URUCHAMIANIE...',
    play_btn_launching_sub: 'INICJOWANIE LUMEN I SHADERÓW',
    play_btn_running: 'ZATRZYMAJ GRĘ',
    play_btn_running_sub: 'KLIKNIJ, ABY ZAMKNĄĆ PROCES',

    // Meta & Specs
    server_status: 'SERWERY AKTYWNE (EU-1)',
    spec_graphics_title: 'API GRAFIKI',
    spec_graphics_val: 'DirectX 12 / Vulkan',
    spec_coop_title: 'MULTIPLAYER',
    spec_coop_val: 'Do 4 Graczy',
    spec_playtime_title: 'CZAS W GRZE',

    // News Card
    news_badge: 'NAJNOWSZY PATCH',
    news_version: 'v1.0.0 Beta',
    news_title: 'Nocne Miasto, Spinjitzu i Nowe Oświetlenie',
    news_snippet: 'Nowa gęsta mgła wolumetryczna, usprawnienia oświetlenia Lumen Global Illumination oraz płynne kombosy dla Kaia i Lloyda.',
    news_read_btn: 'Zobacz pełną listę zmian',
    news_hide_btn: 'Ukryj',
    news_show_btn: 'Najnowszy patch',

    // Patch Notes View
    patch_badge: 'HISTORIA AKTUALIZACJI I ZMIAN',
    patch_main_title: 'HISTORIA PATCHY',
    patch_subtitle: 'Odkryj wszystkie nowości, balans walki, ulepszenia graficzne i optymalizacje Unreal Engine 5.',
    patch_tag_all: 'Wszystkie aktualizacje',
    patch_tag_major: 'Główne wydania',
    patch_tag_balance: 'Balans i poprawki',

    patch_v100_title: 'v1.0.0 Zamknięta Beta - Aktualizacja Neonowy Horyzont',
    patch_v100_date: '1 września 2026',
    patch_v100_badge: 'AKTUALNA WERSJA',
    patch_v100_feat1: 'Dodano pełną eksplorację centrum Ninjago City z odbiciami Lumen w czasie rzeczywistym.',
    patch_v100_feat2: 'Przebudowano fizykę walki Spinjitzu z łańcuchowymi kombosami żywiołów (Ogień, Błyskawica, Ziemia, Lód).',
    patch_v100_feat3: 'Zaimplementowano 4-osobowy sieciowy tryb kooperacji z płynnym dołączaniem graczy.',
    patch_v100_feat4: 'Zintegrowano obsługę generatora klatek NVIDIA DLSS 3.7 oraz AMD FSR 3.1.',

    patch_v098_title: 'v0.9.8 Alpha - Mistrzostwo Żywiołów i Kryjówki Wężonów',
    patch_v098_date: '14 sierpnia 2026',
    patch_v098_feat1: 'Wprowadzono podziemne lochy grobowców Wężonów z dynamicznymi zagadkami środowiskowymi.',
    patch_v098_feat2: 'Rozbudowano mobilność postaci: bieganie po ścianach, linka z hakiem i parkour na dachach.',
    patch_v098_feat3: 'Zoptymalizowano renderowanie geometrii Nanite dla ponad 100 000 modeli architektonicznych.',

    patch_v090_title: 'v0.9.0 Alpha - Migracja na silnik Unreal Engine 5.4',
    patch_v090_date: '2 lipca 2026',
    patch_v090_feat1: 'Przeniesiono projekt na Unreal Engine 5.4 z usprawnionym wielowątkowym przetwarzaniem procesora.',
    patch_v090_feat2: 'Zaimplementowano dynamiczny cykl dnia i nocy oraz wolumetryczne burze z piorunami.',

    // FAQ View
    faq_badge: 'BAZA WIEDZY I POMOC',
    faq_main_title: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
    faq_subtitle: 'Wszystko co musisz wiedzieć o Ninjago City: Open World, instalacji i wydajności w UE5.',
    faq_search_placeholder: 'Szukaj pytań, rozwiązywania problemów, ustawień grafiki...',
    faq_filter_all: 'Wszystkie tematy',
    faq_filter_install: 'Instalacja i start',
    faq_filter_perf: 'Wydajność UE5',
    faq_filter_gameplay: 'Rozgrywka i Co-Op',
    faq_filter_legal: 'O projekcie',

    faq_q1: 'Jak uruchomić grę z Unreal Engine 5?',
    faq_a1: 'Launcher automatycznie uruchamia skompilowaną grę z domyślnego folderu. Wystarczy kliknąć duży, zielony przycisk GRAJ w zakładce Biblioteka.',

    faq_q2: 'Jakie są minimalne i zalecane wymagania sprzętowe?',
    faq_a2_min_title: 'WYMAGANIA MINIMALNE',
    faq_a2_rec_title: 'ZALECANE (Lumen & Nanite)',
    faq_a2_os: 'System',
    faq_a2_cpu: 'Procesor',
    faq_a2_ram: 'Pamięć RAM',
    faq_a2_gpu: 'Karta graficzna',
    faq_a2_dx: 'DirectX',
    faq_a2_storage: 'Dysk',

    faq_q3: 'Czy gra jest darmowa i czy to oficjalna gra LEGO?',
    faq_a3: 'Ninjago City: Open World to w 100% darmowy, niekomercyjny projekt fanowski stworzony przez pasjonatów. Wszystkie postacie i znaki towarowe Ninjago należą do The LEGO Group.',

    faq_q4: 'Czy gra posiada tryb wieloosobowy i wsparcie kontrolerów?',
    faq_a4: 'Tak! Zamknięta beta oferuje 4-osobowy tryb kooperacji online oraz natywne wsparcie dla padów Xbox, PlayStation DualSense / DualShock 4 i kontrolerów XInput.',

    faq_q5: 'Jak zwiększyć liczbę klatek (FPS) i włączyć DLSS / FSR 3 / TSR?',
    faq_a5: 'W menu gry w zakładce Wideo -> Skalowanie możesz włączyć NVIDIA DLSS, AMD FSR 3 lub Epic TSR. Na słabszych kartach zalecamy zmianę jakości Global Illumination na Wysokie.',

    faq_q6: 'Jak zgłosić błąd lub przekazać opinię twórcom?',
    faq_a6: 'Dołącz do naszego oficjalnego serwera Discord i prześlij logi lub filmiki na kanałach #beta-feedback oraz #bug-reports.',

    // Settings Modal
    settings_header: 'USTAWIENIA LAUNCHERA',
    settings_lang_label: 'Język / Language / Мова / Sprache',
    settings_lang_desc: 'Wybierz preferowany język interfejsu',
    settings_autoupdate_label: 'Automatyczne aktualizacje',
    settings_autoupdate_desc: 'Automatycznie sprawdzaj, pobieraj i instaluj najnowsze łatki gry oraz launchera',
    settings_check_update_btn: 'Sprawdź aktualizacje teraz',
    settings_check_update_status: 'Twój launcher i pliki gry są aktualne (v1.0.0)',
    settings_sound_label: 'Dźwięki interfejsu',
    settings_sound_desc: 'Odtwarzaj kliknięcia, przejścia zakładek i efekty dźwiękowe',
    settings_autoclose_label: 'Zamykaj launcher po uruchomieniu gry',
    settings_autoclose_desc: 'Automatycznie zamknij launcher po wystartowaniu gry Unreal Engine 5',
    btn_cancel: 'Anuluj',
    btn_save: 'Zapisz zmiany',

    // Downloads Manager
    downloads_btn_title: 'Pobieranie i aktualizacje',
    dl_modal_title: 'Menedżer pobierania',
    dl_tab_summary: 'Podsumowanie',
    dl_tab_scheduled: 'Zaplanowane',
    dl_tab_recent: 'Niedawno zaktualizowane',
    dl_tab_settings: 'Ustawienia pobierania',
    dl_recent_activity_title: 'Ostatnia aktywność',
    dl_section_recent: 'OSTATNIE',
    dl_scheduled_title: 'Zaplanowane',
    dl_recent_updated_title: 'Niedawno zaktualizowane',
    dl_settings_title: 'Ustawienia pobierania',

    // Toasts
    toast_settings_saved: 'Ustawienia zapisane',
    toast_settings_saved_msg: 'Twoje preferencje zostały zaktualizowane.',
    toast_checking_updates: 'Sprawdzanie aktualizacji',
    toast_checking_updates_msg: 'Łączenie z serwerem aktualizacji...',
    toast_up_to_date: 'Wszystko aktualne',
    toast_up_to_date_msg: 'Posiadasz najnowszą wersję gry i launchera (v1.0.0).',
    toast_game_launched: 'Gra uruchomiona!',
    toast_game_launched_msg: 'Ninjago City działa w tle',
    toast_game_stopped: 'Gra zamknięta',
    toast_game_stopped_msg: 'Sesja gry została zakończona.',
    toast_opening_link: 'Otwieranie przeglądarki'
  },

  uk: {
    // Splash & Auth Screen
    splash_app_title: 'NINJAGO CLUB',
    splash_checking_updates: 'Перевірка оновлень...',
    splash_downloading_assets: 'Завантаження необхідних ресурсів...',
    splash_ready: 'Все готово',
    auth_title: 'Увійти через Discord',
    auth_subtitle: 'Підключіть свій акаунт Discord для доступу до серверів Ninjago Club',
    auth_discord_btn: 'Увійти через Discord',
    auth_connecting: 'Авторизація через Discord...',
    auth_success: 'Успішний вхід!',
    auth_logout_toast_title: 'Вихід',
    auth_logout_toast_msg: 'Ви успішно вийшли з системи.',

    // Top Bar
    tab_library: 'БІБЛІОТЕКА',
    tab_patch: 'ПАТЧІ',
    tab_faq: 'FAQ',
    social_discord: 'Discord',
    social_x: 'X',
    player_version: 'версія 1.0.0',
    profile_title: 'Профіль гравця',
    profile_logout: 'Вийти',
    status_online: 'Онлайн',
    settings_btn_title: 'Налаштування лаунчера',
    win_min: 'Згорнути',
    win_max: 'Розгорнути / Відновити',
    win_close: 'Закрити',

    // Library View
    badge_ue5: 'UNREAL ENGINE 5.4',
    badge_lumen: 'LUMEN & NANITE',
    badge_fan: 'ФАН-ПРОЄКТ',
    badge_online: 'ЗАКРИТА БЕТА',
    badge_closed_beta: 'ЗАКРИТА БЕТА',
    title_sub: 'ЕКСПЕДИЦІЯ В',
    title_main: 'NINJAGO CITY',
    title_highlight: 'ВІДКРИТИЙ СВІТ',
    game_tagline: 'Опануйте стародавнє мистецтво Спінджітцу на неонових вулицях Ніндзяго-Сіті. Відкрийте для себе пригоду нового покоління у відкритому світі на Unreal Engine 5.',

    // Play Button States
    play_btn_idle: 'ГРАТИ',
    play_btn_idle_sub: 'РАННІЙ ДОСТУП',
    play_btn_launching: 'ЗАПУСК...',
    play_btn_launching_sub: 'ІНІЦІАЛІЗАЦІЯ LUMEN ТА ШЕЙДЕРІВ',
    play_btn_running: 'ЗУПИНИТИ ГРУ',
    play_btn_running_sub: 'НАТИСНІТЬ ДЛЯ ЗАВЕРШЕННЯ ПРОЦЕСУ',

    // Meta & Specs
    server_status: 'СЕРВЕРИ ОНЛАЙН (EU-1)',
    spec_graphics_title: 'ГРАФІЧНИЙ API',
    spec_graphics_val: 'DirectX 12 / Vulkan',
    spec_coop_title: 'МУЛЬТИПЛЕЄР',
    spec_coop_val: 'До 4 Гравців',
    spec_playtime_title: 'ЧАС У ГРІ',

    // News Card
    news_badge: 'ОСТАННІЙ ПАТЧ',
    news_version: 'v1.0.0 Beta',
    news_title: 'Нічне Місто, Спінджітцу та Нове Освітлення',
    news_snippet: 'Новий обʼємний туман, покращення освітлення Lumen Global Illumination та плавні комбо для Кая та Ллойда.',
    news_read_btn: 'Переглянути список змін',
    news_hide_btn: 'Сховати',
    news_show_btn: 'Останній патч',

    // Patch Notes View
    patch_badge: 'ІСТОРІЯ ОНОВЛЕНЬ ТА ЗМІН',
    patch_main_title: 'СПИСОК ПАТЧІВ',
    patch_subtitle: 'Дізнайтеся про всі нововведення, бойовий баланс, візуальні ефекти та оптимізацію Unreal Engine 5.',
    patch_tag_all: 'Усі оновлення',
    patch_tag_major: 'Головні релізи',
    patch_tag_balance: 'Баланс і виправлення',

    patch_v100_title: 'v1.0.0 Закрите Бета - Оновлення Неоновий Горизонт',
    patch_v100_date: '1 вересня 2026',
    patch_v100_badge: 'ПОТОЧНА ВЕРСІЯ',
    patch_v100_feat1: 'Додано повне дослідження центру Ніндзяго-Сіті з віддзеркаленнями Lumen у реальному часі.',
    patch_v100_feat2: 'Перероблено фізику бою Спінджітцу з комбінаціями стихій (Вогонь, Блискавка, Земля, Лід).',
    patch_v100_feat3: 'Впроваджено кооперативний мережевий режим до 4 гравців.',
    patch_v100_feat4: 'Інтегровано підтримку генерації кадрів NVIDIA DLSS 3.7 та AMD FSR 3.1.',

    patch_v098_title: 'v0.9.8 Alpha - Майстерність Стихій та Гробниці Серпентинів',
    patch_v098_date: '14 серпня 2026',
    patch_v098_feat1: 'Додано підземні підземелля Серпентинів з динамічними головоломками.',
    patch_v098_feat2: 'Покращено рухливість: біг по стінах, крюк-кішка та паркур по дахах.',
    patch_v098_feat3: 'Оптимізовано Nanite геометрію для понад 100 000 обʼєктів.',

    patch_v090_title: 'v0.9.0 Alpha - Перехід на рушій Unreal Engine 5.4',
    patch_v090_date: '2 липня 2026',
    patch_v090_feat1: 'Проєкт переведено на Unreal Engine 5.4 з оптимізованою багатопотоковістю.',
    patch_v090_feat2: 'Реалізовано динамічну зміну дня і ночі та обʼємні грози.',

    // FAQ View
    faq_badge: 'БАЗА ЗНАНЬ ТА ПІДТРИМКА',
    faq_main_title: 'ЧАСТІ ЗАПИТАННЯ',
    faq_subtitle: 'Все, що вам потрібно знати про Ninjago City: Open World, встановлення та оптимізацію UE5.',
    faq_search_placeholder: 'Пошук питань, налаштувань графіки...',
    faq_filter_all: 'Усі теми',
    faq_filter_install: 'Встановлення',
    faq_filter_perf: 'Продуктивність UE5',
    faq_filter_gameplay: 'Геймплей та Кооп',
    faq_filter_legal: 'Про проєкт',

    faq_q1: 'Як запустити гру на Unreal Engine 5?',
    faq_a1: 'Лаунчер автоматично запускає гру зі стандартного каталогу. Просто натисніть зелену кнопку ГРАТИ в бібліотеці.',

    faq_q2: 'Які системні вимоги гри?',
    faq_a2_min_title: 'МІНІМАЛЬНІ ВИМОГИ',
    faq_a2_rec_title: 'РЕКОМЕНДОВАНІ (Lumen & Nanite)',
    faq_a2_os: 'ОС',
    faq_a2_cpu: 'Процесор',
    faq_a2_ram: 'Оперативна памʼять',
    faq_a2_gpu: 'Відеокарта',
    faq_a2_dx: 'DirectX',
    faq_a2_storage: 'Накопичувач',

    faq_q3: 'Чи безкоштовна ця гра і чи це офіційний проєкт LEGO?',
    faq_a3: 'Ninjago City: Open World — це на 100% безкоштовний некомерційний фанатський проєкт. Усі права на всесвіт Ninjago належать The LEGO Group.',

    faq_q4: 'Чи підтримує гра мультиплеєр та геймпади?',
    faq_a4: 'Так! Бета-версія містить онлайн-кооператив до 4 гравців і повну підтримку геймпадів Xbox, DualSense та DualShock 4.',

    faq_q5: 'Як збільшити FPS та увімкнути DLSS / FSR 3 / TSR?',
    faq_a5: 'У меню гри у розділі Відео -> Масштабування ви можете обрати DLSS, FSR 3 або TSR. Для середніх відеокарт рекомендуємо встановити Global Illumination на Високі.',

    faq_q6: 'Як повідомити про помилку розробникам?',
    faq_a6: 'Приєднуйтесь до нашого сервера Discord та публікуйте повідомлення у каналах #beta-feedback і #bug-reports.',

    // Settings Modal
    settings_header: 'НАЛАШТУВАННЯ ЛАУНЧЕРА',
    settings_lang_label: 'Мова / Language / Język / Sprache',
    settings_lang_desc: 'Оберіть бажану мову інтерфейсу',
    settings_autoupdate_label: 'Автоматичні оновлення',
    settings_autoupdate_desc: 'Автоматично завантажувати та встановлювати оновлення гри та лаунчера',
    settings_check_update_btn: 'Перевірити оновлення зараз',
    settings_check_update_status: 'Ваш лаунчер та файли гри оновлені (v1.0.0)',
    settings_sound_label: 'Звукові ефекти лаунчера',
    settings_sound_desc: 'Відтворювати звуки кліків, перемикання вкладок та ефектів',
    settings_autoclose_label: 'Закривати лаунчер після запуску гри',
    settings_autoclose_desc: 'Автоматично закривати лаунчер після старту Unreal Engine 5',
    btn_cancel: 'Скасувати',
    btn_save: 'Зберегти зміни',

    // Downloads Manager
    downloads_btn_title: 'Завантаження та оновлення',
    dl_modal_title: 'Менеджер завантажень',
    dl_tab_summary: 'Підсумок',
    dl_tab_scheduled: 'Заплановані',
    dl_tab_recent: 'Нещодавно оновлені',
    dl_tab_settings: 'Налаштування завантаження',
    dl_recent_activity_title: 'Остання активність',
    dl_section_recent: 'ОСТАННІ',
    dl_scheduled_title: 'Заплановані',
    dl_recent_updated_title: 'Нещодавно оновлені',
    dl_settings_title: 'Налаштування завантаження',

    // Toasts
    toast_settings_saved: 'Налаштування збережено',
    toast_settings_saved_msg: 'Ваші параметри успішно оновлено.',
    toast_checking_updates: 'Перевірка оновлень',
    toast_checking_updates_msg: 'Зʼєднання із сервером оновлень...',
    toast_up_to_date: 'Все оновлено',
    toast_up_to_date_msg: 'У вас встановлено найновішу версію (v1.0.0).',
    toast_game_launched: 'Гру запущено!',
    toast_game_launched_msg: 'Ninjago City успішно працює',
    toast_game_stopped: 'Гру зупинено',
    toast_game_stopped_msg: 'Ігрову сесію завершено.',
    toast_opening_link: 'Відкриття браузера'
  },

  de: {
    // Splash & Auth Screen
    splash_app_title: 'NINJAGO CLUB',
    splash_checking_updates: 'Suche nach Updates...',
    splash_downloading_assets: 'Herunterladen erforderlicher Assets...',
    splash_ready: 'Bereit zum Start',
    auth_title: 'Mit Discord anmelden',
    auth_subtitle: 'Verbinde dein Discord-Konto, um auf die Ninjago Club Server zuzugreifen',
    auth_discord_btn: 'Mit Discord anmelden',
    auth_connecting: 'Authentifizierung mit Discord...',
    auth_success: 'Erfolgreich angemeldet!',
    auth_logout_toast_title: 'Abgemeldet',
    auth_logout_toast_msg: 'Du hast dich erfolgreich abgemeldet.',

    // Top Bar
    tab_library: 'BIBLIOTHEK',
    tab_patch: 'PATCHES',
    tab_faq: 'FAQ',
    social_discord: 'Discord',
    social_x: 'X',
    player_version: 'Version 1.0.0',
    profile_title: 'Spielerprofil',
    profile_logout: 'Abmelden',
    status_online: 'Online',
    settings_btn_title: 'Launcher-Einstellungen',
    win_min: 'Minimieren',
    win_max: 'Maximieren / Wiederherstellen',
    win_close: 'Schließen',

    // Library View
    badge_ue5: 'UNREAL ENGINE 5.4',
    badge_lumen: 'LUMEN & NANITE',
    badge_fan: 'FAN-PROJEKT',
    badge_online: 'CLOSED BETA',
    badge_closed_beta: 'CLOSED BETA',
    title_sub: 'DIE EXPEDITION VON',
    title_main: 'NINJAGO CITY',
    title_highlight: 'OPEN WORLD',
    game_tagline: 'Meistere die uralte Kunst des Spinjitzu in den neonbeleuchteten Straßen von Ninjago City. Erlebe ein Open-World-Abenteuer der nächsten Generation auf Basis der Unreal Engine 5.',

    // Play Button States
    play_btn_idle: 'SPIELEN',
    play_btn_idle_sub: 'EARLY ACCESS',
    play_btn_launching: 'WIRD GESTARTET...',
    play_btn_launching_sub: 'INITIALISIERE LUMEN & SHADER',
    play_btn_running: 'SPIEL BEENDEN',
    play_btn_running_sub: 'KLICKEN ZUM BEENDEN DES PROZESSES',

    // Meta & Specs
    server_status: 'SERVER ONLINE (EU-1)',
    spec_graphics_title: 'GRAFIK-API',
    spec_graphics_val: 'DirectX 12 / Vulkan',
    spec_coop_title: 'MULTIPLAYER',
    spec_coop_val: 'Bis zu 4 Spieler',
    spec_playtime_title: 'SPIELZEIT',

    // News Card
    news_badge: 'NEUESTER PATCH',
    news_version: 'v1.0.0 Beta',
    news_title: 'Nachtstadt, Spinjitzu & Beleuchtungs-Overhaul',
    news_snippet: 'Neuer dichter volumetrischer Nebel, Lumen Global Illumination Verbesserungen und flüssige Kombos für Kai und Lloyd.',
    news_read_btn: 'Vollständige Patchnotes anzeigen',
    news_hide_btn: 'Ausblenden',
    news_show_btn: 'Neuester Patch',

    // Patch Notes View
    patch_badge: 'UPDATE-VERLAUF & CHANGELOG',
    patch_main_title: 'PATCHNOTES',
    patch_subtitle: 'Entdecke alle neuen Features, Kampfanpassungen, Grafikeffekte und Unreal Engine 5 Optimierungen.',
    patch_tag_all: 'Alle Updates',
    patch_tag_major: 'Hauptversionen',
    patch_tag_balance: 'Balance & Fixes',

    patch_v100_title: 'v1.0.0 Closed Beta - Das Neon-Horizont Update',
    patch_v100_date: '1. September 2026',
    patch_v100_badge: 'AKTUELLE VERSION',
    patch_v100_feat1: 'Vollständige Erkundung von Ninjago City mit Echtzeit-Lumen-Reflexionen hinzugefügt.',
    patch_v100_feat2: 'Spinjitzu-Kampfphysik mit Elementar-Kombos (Feuer, Blitz, Erde, Eis) überarbeitet.',
    patch_v100_feat3: '4-Spieler-Online-Koop mit nahtlosem Beitritt implementiert.',
    patch_v100_feat4: 'NVIDIA DLSS 3.7 Frame Generation und AMD FSR 3.1 integriert.',

    patch_v098_title: 'v0.9.8 Alpha - Elementare Meisterschaft & Schlangen-Verstecke',
    patch_v098_date: '14. August 2026',
    patch_v098_feat1: 'Unterirdische Schlangen-Dungeons mit dynamischen Rätseln eingeführt.',
    patch_v098_feat2: 'Charakter-Mobilität erweitert: Wandlauf, Greifhaken und Dach-Parkour.',
    patch_v098_feat3: 'Nanite-Geometrie-Rendering für über 100.000 Modelle optimiert.',

    patch_v090_title: 'v0.9.0 Alpha - Migration auf Unreal Engine 5.4',
    patch_v090_date: '2. Juli 2026',
    patch_v090_feat1: 'Projekt auf Unreal Engine 5.4 mit verbesserter Multithreading-Leistung migriert.',
    patch_v090_feat2: 'Dynamischer Tag-/Nacht-Zyklus mit volumetrischen Gewittern implementiert.',

    // FAQ View
    faq_badge: 'WISSENSBASIS & SUPPORT',
    faq_main_title: 'HÄUFIG GESTELLTE FRAGEN',
    faq_subtitle: 'Alles, was du über Ninjago City: Open World, Installation und UE5-Leistung wissen musst.',
    faq_search_placeholder: 'Fragen, Fehlerbehebung, Grafikeinstellungen suchen...',
    faq_filter_all: 'Alle Themen',
    faq_filter_install: 'Installation & Setup',
    faq_filter_perf: 'UE5-Leistung',
    faq_filter_gameplay: 'Gameplay & Koop',
    faq_filter_legal: 'Fan-Projekt Info',

    faq_q1: 'Wie starte ich das Spiel in Unreal Engine 5?',
    faq_a1: 'Der Launcher startet automatisch das erstellte Spiel aus dem Standardverzeichnis. Klicke einfach auf den grünen SPIELEN-Button in der Bibliothek.',

    faq_q2: 'Was sind die Mindest- und empfohlenen Systemanforderungen?',
    faq_a2_min_title: 'MINDESTANFORDERUNGEN',
    faq_a2_rec_title: 'EMPFOHLEN (Lumen & Nanite)',
    faq_a2_os: 'Betriebssystem',
    faq_a2_cpu: 'Prozessor',
    faq_a2_ram: 'Arbeitsspeicher',
    faq_a2_gpu: 'Grafikkarte',
    faq_a2_dx: 'DirectX',
    faq_a2_storage: 'Festplatte',

    faq_q3: 'Ist dieses Spiel kostenlos und offiziell von LEGO lizenziert?',
    faq_a3: 'Ninjago City: Open World ist ein 100% kostenloses, nicht-kommerzielles Fanprojekt. Alle Ninjago-Charaktere und Marken gehören der LEGO Group.',

    faq_q4: 'Unterstützt das Spiel Koop-Multiplayer und Controller?',
    faq_a4: 'Ja! Die Closed Beta bietet 4-Spieler-Online-Koop sowie native Unterstützung für Xbox-, DualSense-, DualShock 4- und XInput-Controller.',

    faq_q5: 'Wie erhöhe ich die FPS und aktiviere DLSS / FSR 3 / TSR?',
    faq_a5: 'Im Spielmenü unter Video -> Skalierung kannst du NVIDIA DLSS, AMD FSR 3 oder Epic TSR aktivieren. Für Mittelklasse-GPUs empfehlen wir die Einstellung Global Illumination auf Hoch.',

    faq_q6: 'Wie melde ich Fehler oder gebe Feedback?',
    faq_a6: 'Tritt unserem offiziellen Discord-Server bei und poste deine Logs in den Kanälen #beta-feedback und #bug-reports.',

    // Settings Modal
    settings_header: 'LAUNCHER-EINSTELLUNGEN',
    settings_lang_label: 'Sprache / Language / Język / Мова',
    settings_lang_desc: 'Wähle deine bevorzugte Sprache für die Benutzeroberfläche',
    settings_autoupdate_label: 'Automatische Updates',
    settings_autoupdate_desc: 'Automatisch nach neuesten Patches für Spiel und Launcher suchen und installieren',
    settings_check_update_btn: 'Jetzt nach Updates suchen',
    settings_check_update_status: 'Dein Launcher und die Spieldateien sind auf dem neuesten Stand (v1.0.0)',
    settings_sound_label: 'Launcher-Soundeffekte',
    settings_sound_desc: 'UI-Klicks, Tab-Übergänge und Soundeffekte abspielen',
    settings_autoclose_label: 'Launcher beim Spielstart schließen',
    settings_autoclose_desc: 'Schließt den Launcher automatisch, sobald Unreal Engine 5 startet',
    btn_cancel: 'Abbrechen',
    btn_save: 'Änderungen speichern',

    // Downloads Manager
    downloads_btn_title: 'Downloads & Updates',
    dl_modal_title: 'Download-Manager',
    dl_tab_summary: 'Übersicht',
    dl_tab_scheduled: 'Geplant',
    dl_tab_recent: 'Kürzlich aktualisiert',
    dl_tab_settings: 'Download-Einstellungen',
    dl_recent_activity_title: 'Letzte Aktivität',
    dl_section_recent: 'KÜRZLICH',
    dl_scheduled_title: 'Geplant',
    dl_recent_updated_title: 'Kürzlich aktualisiert',
    dl_settings_title: 'Download-Einstellungen',

    // Toasts
    toast_settings_saved: 'Einstellungen gespeichert',
    toast_settings_saved_msg: 'Deine Einstellungen wurden aktualisiert.',
    toast_checking_updates: 'Nach Updates suchen',
    toast_checking_updates_msg: 'Verbindung zum Update-Server wird hergestellt...',
    toast_up_to_date: 'Auf dem neuesten Stand',
    toast_up_to_date_msg: 'Du hast bereits die neueste Version (v1.0.0).',
    toast_game_launched: 'Spiel gestartet!',
    toast_game_launched_msg: 'Ninjago City läuft im Hintergrund',
    toast_game_stopped: 'Spiel beendet',
    toast_game_stopped_msg: 'Spielsitzung wurde erfolgreich beendet.',
    toast_opening_link: 'Browser wird geöffnet'
  }
};

// Helper to determine active language
function resolveSystemLanguage(systemLocale, savedLang) {
  if (savedLang && savedLang !== 'auto' && translations[savedLang]) {
    return savedLang;
  }
  
  const locale = (systemLocale || (typeof navigator !== 'undefined' ? navigator.language : 'en')).toLowerCase();
  
  if (locale.startsWith('pl')) return 'pl';
  if (locale.startsWith('uk') || locale.startsWith('ua')) return 'uk';
  if (locale.startsWith('de')) return 'de';
  return 'en';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, resolveSystemLanguage };
}
