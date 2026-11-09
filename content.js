/* Редактируйте описания, стек и медиа здесь. Порядок объектов = порядок карточек.
   screenshot: 'assets/my-screen.webp', screenshotAlt: 'Описание экрана',
   video: 'assets/my-demo.mp4'. Пустая строка оставляет честное место для медиа.
   Для нового проекта задайте уникальный id и cover: 'cinema', 'fitness' или 'career'. */
window.portfolioContent = {
  technologies: [
    { title: 'Python и backend', symbol: '</>', items: ['Python', 'FastAPI', 'Django', 'Pydantic'] },
    { title: 'Данные и очереди', symbol: '{ }', items: ['PostgreSQL', 'SQLAlchemy', 'Alembic', 'Redis', 'RabbitMQ'] },
    { title: 'Инструменты и web', symbol: '⌘', items: ['Git / GitHub', 'Docker Compose', 'pytest', 'Celery', 'HTML / CSS / JavaScript', 'Jinja / Django Templates'] },
    { title: 'Планирую изучить', symbol: '✦', items: ['LangChain', 'LangGraph', 'Qdrant', 'LLM API'] }
  ],
  projects: [
    {
      id: 'cinema', cover: 'cinema', name: 'CinemaProject', category: 'УЧЕБНЫЙ ПРОЕКТ', framework: 'FastAPI', status: 'Учебный проект',
      description: 'Система бронирования и покупки билетов в кинотеатр. Два FastAPI-сервиса разделяют работу с клиентами и управление фильмами, сеансами и местами.',
      stack: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Redis', 'Celery'],
      github: 'https://github.com/07HaNNibal07/CinemaProject-FastAPI-',
      implemented: ['Регистрация, вход, профиль и внутренний баланс клиента.', 'Каталог фильмов, залы, сеансы и статусы мест.', 'Бронь места через Redis на 15 минут и освобождение после истечения TTL.', 'Покупка билета с внутреннего баланса и проверка владельца брони.', 'Просмотр своих билетов; тесты сценариев бронирования в pytest.'],
      notes: 'Учебная система: покупка использует внутренний баланс, без платёжного шлюза. Celery-задача после покупки пишет уведомление в лог; отправка email и QR/PDF-билеты не реализованы.',
      tools: 'Также в коде: Alembic, HTTPX, JWT, Jinja2 и Docker Compose.',
      planned: [], plannedStack: [],
      screenshot: 'assets/screenshots/cinema-catalog.jpg', screenshotAlt: 'Каталог фильмов BosnaCinema',
      screenshotCaption: 'CinemaProject: реальный экран каталога при локальном запуске с демонстрационными фильмами.',
      extraScreenshots: [
        { src: 'assets/screenshots/cinema-sessions.jpg', alt: 'Сеанс Interstellar и места зала с разными статусами', caption: 'Свободные, забронированные и купленные места. Статусы получены через работающий API на тестовых данных.' },
        { src: 'assets/screenshots/cinema-catalog-user.png', alt: 'Каталог BosnaCinema с фильмами Blade Runner 2049, Interstellar и The Pianist', caption: 'Каталог фильмов BosnaCinema. Скриншот предоставлен автором проекта.' },
        { src: 'assets/screenshots/cinema-login-user.png', alt: 'Страница входа в CinemaProject с полями email или телефона и пароля', caption: 'Страница входа CinemaProject. Скриншот предоставлен автором проекта.' }
      ],
      video: ''
    },
    {
      id: 'fitness', cover: 'fitness', name: 'BosnaFitClub', category: 'УЧЕБНЫЙ ПРОЕКТ', framework: 'Django', status: 'Учебный проект',
      description: 'Веб-приложение фитнес-клуба с абонементами, профилями тренеров и расписанием. Клиент отправляет заявку, а тренер принимает или отклоняет её.',
      stack: ['Django', 'PostgreSQL', 'Django Templates', 'Pillow'],
      github: 'https://github.com/07HaNNibal07/FitnessClub-in-Django--1',
      implemented: ['Регистрация, вход и настройка Google OAuth через social-auth-app-django.', 'Профиль клиента: активный абонемент, история демонстрационных оплат и заявок.', 'Каталог абонементов и демонстрационное оформление покупки.', 'Профили тренеров, расписание и заявки на тренировки.', 'Принятие и отклонение заявок тренером; связь тренера с активным абонементом.', 'Загрузка изображений абонементов и тренеров.'],
      notes: 'Оплата демонстрационная — реальные платежи не принимаются. Это учебный pet-проект, созданный с помощью AI, как указано в README. Google OAuth требует настройки ключей.',
      tools: 'Также в коде: psycopg, HTML, CSS и JavaScript.',
      planned: [], plannedStack: [],
      screenshot: 'assets/screenshots/fitness-home.jpg', screenshotAlt: 'Главная страница BosnaFitClub',
      screenshotCaption: 'BosnaFitClub: локальный запуск с демонстрационными данными и изображениями из проекта.',
      extraScreenshots: [
        { src: 'assets/screenshots/fitness-memberships.jpg', alt: 'Абонементы Basic, VIP и Premium', caption: 'Каталог абонементов. Оплата в приложении демонстрационная.' },
        { src: 'assets/screenshots/fitness-profile.jpg', alt: 'Профиль demo-клиента с абонементом и одобренной заявкой тренеру', caption: 'Профиль тестового клиента после оформления абонемента и одобрения заявки тренером. Все данные демонстрационные.' }
      ],
      video: 'assets/bosnafitclub-demo.mp4'
    },
    {
      id: 'career', cover: 'career', name: 'IT Career Navigator', category: 'ДИПЛОМНЫЙ ПРОЕКТ', framework: 'FastAPI', status: 'В разработке',
      description: 'Будущее веб-приложение для анализа IT-вакансий и требований рынка. Цель — сопоставлять навыки пользователя с востребованными и формировать рекомендации по развитию, в том числе с помощью LLM.',
      stack: ['FastAPI', 'SQLAlchemy', 'Pydantic', 'Alembic', 'PyJWT'],
      github: 'https://github.com/07HaNNibal07/It-career-navigator',
      implemented: ['Код регистрации, JWT-авторизации, профиля, навыков и целевого направления пользователя.', 'Модели вакансий, требований и анализов; миграции Alembic.', 'Импорт структурированных вакансий через JSON API: проверка направления и пропуск дубликатов.', 'Расчёт частоты навыков в вакансиях по направлению и уровню.', 'Построение roadmap из отсутствующих у пользователя навыков с приоритетом по востребованности.', 'Тестовые файлы для пользовательского API, импорта, анализа и roadmap.'],
      notes: 'Готовы отдельные компоненты backend, проект продолжает развиваться. LLM пока не подключена: требования к навыкам передаются во входных данных. Полный пользовательский сценарий с веб-интерфейсом ещё предстоит реализовать.',
      tools: 'В материалах также указаны Python 3.14+, uv, pytest, Argon2 и pydantic-settings.',
      planned: ['Импорт файлов JSON/CSV и нормализация названий навыков.', 'Извлечение требований через OpenAI-совместимый LLM API и резервный поиск по ключевым словам.', 'Расширение skill gap и roadmap, история анализов и отметки изученных навыков.', 'Пользовательский интерфейс на Jinja с результатами анализа.', 'Фоновые задачи и расширение Docker Compose для полного приложения.'],
      plannedStack: ['LLM API', 'Jinja', 'Celery', 'RabbitMQ', 'Redis'],
      screenshot: 'assets/screenshots/career-swagger.jpg', screenshotAlt: 'Swagger UI работающего API IT Career Navigator',
      screenshotCaption: 'IT Career Navigator — в разработке. Это Swagger UI работающего backend API, а не готовый пользовательский интерфейс. LLM ещё не подключена.',
      video: ''
    }
  ]
};
