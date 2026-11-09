# Основания описаний проектов

**Обновление:** после первоначального изучения выполнен локальный запуск отдельных копий проектов, проверки и съёмка экранов. Актуальные результаты и обнаруженные ограничения приведены в `PROJECT_TEST_REPORT.md`. Ниже сохранены основания первоначального описания.

Изучены локальные папки, указанные пользователем. Исходные файлы проектов не изменялись; код приложений не запускался, миграции и тесты исходных проектов не выполнялись. Наличие кода не приравнивается к подтверждению готовности production-сервиса.

Данные прочитаны 9 ноября 2026 года. GitHub-ссылки взяты из задания; удалённые репозитории отдельно не сравнивались с локальными копиями. Секреты `.env`, содержимое баз и виртуальных окружений не использовались в описаниях и не копировались в сайт.

## CinemaProject

Папка: `C:\Users\Ильгар\Desktop\Cinema-project(FastApi)`.

Структура: `booking-service`, `cinema-service`, `common_auth`, `tests`, конфигурации Docker Compose. README сверялся с роутерами и сервисным кодом.

| Утверждение | Основание |
| --- | --- |
| Два FastAPI-сервиса | README, `booking-service/app/main.py`, `cinema-service/app/main.py` |
| Клиенты, баланс, бронирование, билеты | `booking-service/app/routers/clients.py`, `app/utils/user_booking_service.py` |
| Фильмы, залы, сеансы, места | `cinema-service/app/routers/movies.py`, `sessions.py`, `control.py`, модели |
| Redis, TTL 900 секунд | `clients.py`, `cinema-service/app/utils/lister_expired.py`, README |
| Проверка владельца брони | `user_booking_service.py`, тесты бронирования |
| Celery после покупки | `user_booking_service.py`, `app/tasks.py`, `app/celery_app.py` |
| Тестовые сценарии | `tests/test_reservations.py` — бронь, чужая бронь, покупка, истечение TTL |
| Технологии | `requirements.txt` в корне и сервисах, импорты, миграции и Docker Compose |

Не заявлены реальные платежи, отправка email, QR/PDF, промышленная надёжность или измерения производительности. Задача уведомления только пишет в лог. Тесты в этой задаче не запускались.

## BosnaFitClub

Папка: `C:\Users\Ильгар\Desktop\FitnessClub in Django #1`.

Структура Django-приложения: `accounts`, `club`, `memberships`, шаблоны, static/media, настройки и миграции.

| Утверждение | Основание |
| --- | --- |
| Регистрация и профиль | `fitness_club/accounts/views.py`, `forms.py`, `models.py` |
| Google OAuth | README, настройки `social_django` и social-auth pipeline |
| Абонементы и демонстрационная оплата | `memberships/views.py`, `models.py`, шаблоны checkout |
| Заявки и решение тренера | `club/views.py`, `models.py`, `forms.py` |
| Расписание и профили тренеров | `club/views.py`, `models.py`, соответствующие шаблоны |
| Изображения | Поля моделей, media, Pillow в requirements |
| Django, PostgreSQL, шаблоны | requirements, настройки БД, templates |

README прямо указывает, что проект учебный и создан с помощью AI. Оплата fake/demo. В `requirements.txt` перечислены Django, psycopg и Pillow; используемый `social-auth-app-django` там не указан. Наличие настройки OAuth не означает, что вход проверен с действующими ключами.

Из исходной папки скопирована одна существующая демонстрационная запись. Это пользовательское видео проекта, а не сгенерированная демонстрация.

## IT Career Navigator — в разработке

Папка: `C:\Users\Ильгар\Desktop\It career navigator`.

Изучены README на двух языках, PLAN.md, pyproject.toml, структура `src/it_career_navigator`, модели, роутеры, сервисы, тестовые файлы, миграции и Compose.

**Важное расхождение:** README описывает более ранний этап и отрицает наличие миграций, импорта и анализа. В текущей папке соответствующий код уже есть. Для портфолио приоритет отдан существующему коду, а планы сохранены отдельно.

| Есть в коде | Основание и предел утверждения |
| --- | --- |
| Регистрация, JWT, профиль, навыки, цель | `auth.py`, `routers/users.py`, `schemas.py` |
| Расширенная модель | `models.py`: User, Skill, Direction, Vacancy, VacancyRequirement, SkillAlias, Analysis, SkillStatistic, Roadmap, RoadmapItem |
| Миграции | `alembic/versions/`: начальная схема, вакансии, требования, направления, анализы, статистика и roadmap |
| Импорт | `services/importer.py`, `/internal/import_vacancies`: принимает список структурированных объектов, проверяет направление и пропускает дубликаты source/external_id |
| Статистика | `services/analysis.py`: частота навыков по набору вакансий, фильтрация направления и уровня |
| Базовый roadmap | `services/roadmap.py`: исключает имеющиеся навыки, сохраняет остальные с priority = demand_percent |
| Тестовые файлы | `test_user.py`, `test_internal.py`, `test_importer.py`, `test_analysis.py`, `test_roadmap.py`; выполнение не проверялось |
| PostgreSQL-инфраструктура | asyncpg в зависимостях, миграции, `docker-compose.yml` с PostgreSQL/pgAdmin; aiosqlite тоже есть в зависимостях. Активная БД из приватного .env не определялась |

**Запланировано по PLAN.md:** файловый JSON/CSV-импорт, нормализация синонимов навыков, извлечение требований через OpenAI-совместимый LLM API и fallback, расширение расчёта приоритетов/истории/отметок, Jinja-интерфейс, Celery/RabbitMQ/Redis и Compose для полного приложения. Упоминание Chart.js в плане условное; в стек сайта не включено.

LLM-адаптера и готового пользовательского веб-интерфейса в просмотренном коде нет. Импорт уже принимает требования в данных — это не LLM-извлечение. Наличие модели SkillAlias не равно готовой нормализации. Наличие поля is_completed не равно готовому интерфейсу отметок. Текущий roadmap — заготовка, а не завершённый персональный рекомендательный сервис.

GitHub диплома позднее предоставлен пользователем: `https://github.com/07HaNNibal07/It-career-navigator`. Ссылка добавлена в карточку и подробное описание. На карточке и в диалоге сохранён статус **«В разработке»**.
