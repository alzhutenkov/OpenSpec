# OpenSpec: документация на русском

Переведён весь имеющийся текст 83 документов: актуальные материалы, прежние руководства и документация участников проекта. Английские оригиналы сохранены по прежним путям.

В 18 исходных страницах ещё нет полного текста. Их заголовки и заметки переведены, но сами руководства остаются незавершёнными. На страницах и в реестре это явно отмечено. По SDD такие ограничения оригиналов допускаются при приёмке перевода всего доступного текста.

## Начните здесь

1. [Установите OpenSpec](docs-lab/start/installation.md).
2. [Настройте проект](docs-lab/start/setup.md).
3. [Выполните первое изменение](docs-lab/start/quickstart.md).

Команды терминала, ключи конфигурации и реальные сообщения CLI сохраняют исходное написание. Пояснения и запросы к ИИ-помощнику переведены.

## Сопровождение перевода

- [Правила перевода](TRANSLATION_RULES.md).
- [Обновления из исходного репозитория](UPSTREAM_SYNC.md).
- [Русский глоссарий](GLOSSARY.md).
- [Реестр источников и проверенных версий](translation-manifest.json).
- [Результаты проверок](VALIDATION.md).

Ручная проверка приёмки без записи файлов и доступа к сети:

```bash
node scripts/check-russian-docs.mjs --strict
```

## Актуальная документация: начало

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Установка](docs-lab/start/installation.md) | `docs-lab/start/installation.md` | Текст переведён |
| [Обзор](docs-lab/start/overview.md) | `docs-lab/start/overview.md` | Не завершён |
| [Быстрый старт](docs-lab/start/quickstart.md) | `docs-lab/start/quickstart.md` | Текст переведён |
| [Настройте проект](docs-lab/start/setup.md) | `docs-lab/start/setup.md` | Текст переведён |

## Настройка OpenSpec

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Обзор](docs-lab/customize/overview.md) | `docs-lab/customize/overview.md` | Текст переведён |
| [Профили](docs-lab/customize/profiles.md) | `docs-lab/customize/profiles.md` | Текст переведён |
| [Конфигурация проекта](docs-lab/customize/project-config.md) | `docs-lab/customize/project-config.md` | Текст переведён |
| [Схемы](docs-lab/customize/schemas.md) | `docs-lab/customize/schemas.md` | Текст переведён |
| [Настройка навыков](docs-lab/customize/skills.md) | `docs-lab/customize/skills.md` | Не завершён |

## Руководства

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Выполните изменение](docs-lab/guides/apply.md) | `docs-lab/guides/apply.md` | Не завершён |
| [Измените план](docs-lab/guides/change-course.md) | `docs-lab/guides/change-course.md` | Не завершён |
| [Концепции](docs-lab/guides/concepts.md) | `docs-lab/guides/concepts.md` | Не завершён |
| [Примеры](docs-lab/guides/examples.md) | `docs-lab/guides/examples.md` | Не завершён |
| [Существующие кодовые базы](docs-lab/guides/existing-codebases.md) | `docs-lab/guides/existing-codebases.md` | Не завершён |
| [Исследуйте идею](docs-lab/guides/explore.md) | `docs-lab/guides/explore.md` | Не завершён |
| [Проверьте план](docs-lab/guides/review-the-plan.md) | `docs-lab/guides/review-the-plan.md` | Не завершён |
| [Работа в команде](docs-lab/guides/teams.md) | `docs-lab/guides/teams.md` | Не завершён |

## Несколько репозиториев (beta)

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Хранилища (beta)](docs-lab/multi-repo/stores.md) | `docs-lab/multi-repo/stores.md` | Текст переведён |
| [Рабочие наборы (beta)](docs-lab/multi-repo/worksets.md) | `docs-lab/multi-repo/worksets.md` | Текст переведён |

## Справочник CLI, навыков и инструментов

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [CLI](docs-lab/reference/cli.md) | `docs-lab/reference/cli.md` | Текст переведён |
| [Глоссарий](docs-lab/reference/glossary.md) | `docs-lab/reference/glossary.md` | Текст переведён |
| [Навыки](docs-lab/reference/skills.md) | `docs-lab/reference/skills.md` | Текст переведён |
| [Поддерживаемые инструменты](docs-lab/reference/supported-tools.md) | `docs-lab/reference/supported-tools.md` | Текст переведён |

## Справочник конфигурации

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Метаданные изменения (.openspec.yaml)](docs-lab/reference/configuration/change-metadata.md) | `docs-lab/reference/configuration/change-metadata.md` | Текст переведён |
| [Настройки CLI (config.json)](docs-lab/reference/configuration/config-json.md) | `docs-lab/reference/configuration/config-json.md` | Текст переведён |
| [Конфигурация проекта (config.yaml)](docs-lab/reference/configuration/config-yaml.md) | `docs-lab/reference/configuration/config-yaml.md` | Текст переведён |
| [Переменные окружения](docs-lab/reference/configuration/environment-variables.md) | `docs-lab/reference/configuration/environment-variables.md` | Не завершён |
| [Обзор](docs-lab/reference/configuration/index.md) | `docs-lab/reference/configuration/index.md` | Текст переведён |
| [Хранилища](docs-lab/reference/configuration/stores.md) | `docs-lab/reference/configuration/stores.md` | Не завершён |

## Справочник схем

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Обзор](docs-lab/reference/schemas/index.md) | `docs-lab/reference/schemas/index.md` | Текст переведён |
| [schema.yaml](docs-lab/reference/schemas/schema-yaml.md) | `docs-lab/reference/schemas/schema-yaml.md` | Текст переведён |
| [spec-driven](docs-lab/reference/schemas/spec-driven/index.md) | `docs-lab/reference/schemas/spec-driven/index.md` | Текст переведён |

## Архитектура

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Архитектурные решения](docs-lab/reference/architecture/design-decisions.md) | `docs-lab/reference/architecture/design-decisions.md` | Не завершён |
| [Обзор](docs-lab/reference/architecture/index.md) | `docs-lab/reference/architecture/index.md` | Не завершён |
| [Выполнение рабочих процессов](docs-lab/reference/architecture/workflow-runs.md) | `docs-lab/reference/architecture/workflow-runs.md` | Не завершён |

## Помощь

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Часто задаваемые вопросы](docs-lab/help/faq.md) | `docs-lab/help/faq.md` | Не завершён |
| [Переход с прежнего рабочего процесса](docs-lab/help/legacy/migration.md) | `docs-lab/help/legacy/migration.md` | Не завершён |
| [Устранение неполадок](docs-lab/help/troubleshooting.md) | `docs-lab/help/troubleshooting.md` | Не завершён |

## Прежние руководства

Этот набор помечен как прежний в оригинале. Он переведён полностью, но может описывать устаревшее поведение.

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Документация OpenSpec](docs/README.md) | `docs/README.md` | Текст переведён |
| [Агентский контракт OpenSpec](docs/agent-contract.md) | `docs/agent-contract.md` | Текст переведён |
| [Справочник CLI](docs/cli.md) | `docs/cli.md` | Текст переведён |
| [Команды](docs/commands.md) | `docs/commands.md` | Текст переведён |
| [Презентация для сообщества](docs/community.md) | `docs/community.md` | Текст переведён |
| [Концепции](docs/concepts.md) | `docs/concepts.md` | Текст переведён |
| [Настройка](docs/customization.md) | `docs/customization.md` | Текст переведён |
| [Редактирование и повторение изменений](docs/editing-changes.md) | `docs/editing-changes.md` | Текст переведён |
| [Примеры и рецепты](docs/examples.md) | `docs/examples.md` | Текст переведён |
| [Использование OpenSpec в существующем проекте](docs/existing-projects.md) | `docs/existing-projects.md` | Текст переведён |
| [Сначала исследуйте задачу](docs/explore.md) | `docs/explore.md` | Текст переведён |
| [Часто задаваемые вопросы](docs/faq.md) | `docs/faq.md` | Текст переведён |
| [Начало работы](docs/getting-started.md) | `docs/getting-started.md` | Текст переведён |
| [Глоссарий](docs/glossary.md) | `docs/glossary.md` | Текст переведён |
| [Как работают команды](docs/how-commands-work.md) | `docs/how-commands-work.md` | Текст переведён |
| [Установка](docs/installation.md) | `docs/installation.md` | Текст переведён |
| [Переход на OPSX](docs/migration-guide.md) | `docs/migration-guide.md` | Текст переведён |
| [Многоязычное руководство](docs/multi-language.md) | `docs/multi-language.md` | Текст переведён |
| [Рабочий процесс OPSX](docs/opsx.md) | `docs/opsx.md` | Текст переведён |
| [Обзор основных понятий](docs/overview.md) | `docs/overview.md` | Текст переведён |
| [Проверка изменения](docs/reviewing-changes.md) | `docs/reviewing-changes.md` | Текст переведён |
| [Хранилища: план в собственном репозитории](docs/stores-beta/user-guide.md) | `docs/stores-beta/user-guide.md` | Текст переведён |
| [Поддерживаемые инструменты](docs/supported-tools.md) | `docs/supported-tools.md` | Текст переведён |
| [OpenSpec в команде](docs/team-workflow.md) | `docs/team-workflow.md` | Текст переведён |
| [Устранение неполадок](docs/troubleshooting.md) | `docs/troubleshooting.md` | Текст переведён |
| [Рабочие процессы](docs/workflows.md) | `docs/workflows.md` | Текст переведён |
| [Написание хороших спецификаций](docs/writing-specs.md) | `docs/writing-specs.md` | Текст переведён |

## Документы проекта

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [@fission-ai/openspec](project/CHANGELOG.md) | `CHANGELOG.md` | Текст переведён |
| [Участие в разработке](project/CONTRIBUTING.md) | `CONTRIBUTING.md` | Текст переведён |
| [Сопровождающие](project/MAINTAINERS.md) | `MAINTAINERS.md` | Текст переведён |
| [README.md](project/README.md) | `README.md` | Текст переведён |
| [OpenSpec](project/README_OLD.md) | `README_OLD.md` | Текст переведён |
| [Политика безопасности](project/SECURITY.md) | `SECURITY.md` | Текст переведён |
| [openspec](project/install.md) | `install.md` | Текст переведён |
| [План устранения параллельных дельт OpenSpec](project/openspec-parallel-merge-plan.md) | `openspec-parallel-merge-plan.md` | Текст переведён |

## Документация подсистем

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [Наборы изменений](.changeset/README.md) | `.changeset/README.md` | Текст переведён |
| [Настройка контейнера разработки](.devcontainer/README.md) | `.devcontainer/README.md` | Текст переведён |
| [Рабочие процессы GitHub](.github/workflows/README.md) | `.github/workflows/README.md` | Текст переведён |
| [Скрипты OpenSpec](scripts/README.md) | `scripts/README.md` | Текст переведён |
| [Навыки OpenSpec для skills.sh](skills/README.md) | `skills/README.md` | Текст переведён |
| [Сайт документации OpenSpec](website/README.md) | `website/README.md` | Текст переведён |

## Служебные карты и заметки редакторов

| Документ | Файл | Состояние оригинала |
|---|---|---|
| [docs-lab/Notes.md](docs-lab/Notes.md) | `docs-lab/Notes.md` | Текст переведён |
| [docs-lab: параллельная перестройка документации OpenSpec](docs-lab/README.md) | `docs-lab/README.md` | Текст переведён |
| [Карта сообщений: вопросы, на которые должны ответить документы, и где](docs-lab/message-map.md) | `docs-lab/message-map.md` | Текст переведён |
| [Куда ведет каждая текущая страница](docs-lab/sources.md) | `docs-lab/sources.md` | Текст переведён |

## SDD

- [Основная спецификация: требования и сценарии](../../openspec/specs/russian-documentation/spec.md).
- [Предложение (архив)](../../openspec/changes/archive/2026-10-27-add-russian-documentation/proposal.md).
- [Изменения требований (архив)](../../openspec/changes/archive/2026-10-27-add-russian-documentation/specs/russian-documentation/spec.md).
- [Техническое решение (архив)](../../openspec/changes/archive/2026-10-27-add-russian-documentation/design.md).
- [Завершённые задачи (архив)](../../openspec/changes/archive/2026-10-27-add-russian-documentation/tasks.md).

## Английские оригиналы

- [Карта актуальной документации (английский)](../../docs-lab/README.md).
- [Прежняя документация (английский)](../README.md).
- [Основной README (английский)](../../README.md).

В начале каждого перевода есть ссылка на оригинал и его проверенную версию. Обновление перевода не требует перемещения английских файлов или переписывания истории Git.
