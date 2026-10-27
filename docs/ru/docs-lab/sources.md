<!-- translation-source: docs-lab/sources.md -->
> Оригинал: [docs-lab/sources.md (английский)](../../../docs-lab/sources.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/sources.md).

> Служебный материал проекта: заметки, карта документации или план работ.

<a id="where-every-current-page-goes"></a>
# Куда ведет каждая текущая страница

Сопоставление старого и нового: исходный материал для каждой
страницы `docs-lab/` во время черчения и список перенаправления при
переключении. Целевой структурой является индекс страницы в [README.md](README.md) .

|Текущий (`docs/`)|Пункт назначения|
|---|---|
|README.md (индекс)|`start/overview.md`, переписанный как шаг и маршрутизация.|
|getting-started.md|`start/quickstart.md`|
|install.md|разделение: `start/installation.md` (уровень компьютера: матрица, обновление, удаление) · `start/setup.md` (уровень проекта: инициализация, что пишет инициализация, форма установки навыков и команд, сохраняет маршрутизатор)|
|how-commands-work.md|`start/quickstart.md` (встроенные метки) · `help/faq.md` · `help/troubleshooting.md`|
|existing-projects.md|`guides/existing-codebases.md` («Существующие кодовые базы»); половина прохождения к `start/quickstart.md`|
|overview.md|`guides/concepts.md`|
|concepts.md|`guides/concepts.md` (ядро) · дельта-формат для `reference/schemas/spec-driven/index.md` (раздел дельта-спецификации) · удален встроенный глоссарий|
|explore.md|`guides/explore.md`|
|workflows.md|`guides/apply.md` (шаблоны выполнения, продолжить/ff) · `reference/skills.md`|
|opsx.md|разделение на четыре части: конфигурация для `customize/project-config.md` · команды для `reference/skills.md` · философия для `guides/concepts.md` · архитектура для `reference/architecture/`|
|reviewing-changes.md + writing-specs.md|`guides/review-the-plan.md` (объединено)|
|editing-changes.md|`guides/change-course.md`|
|team-workflow.md|`guides/teams.md`|
|examples.md|припаркован: скелет `guides/examples.md` отключен от индексации и конфигурации синхронизации до тех пор, пока не появятся настоящие архивные изменения (см. README TODO)|
|customization.md|`customize/project-config.md` + `customize/schemas.md` + `customize/overview.md` (лестница принятия решений) · поля schema.yaml в `reference/schemas/schema-yaml.md`|
|multi-language.md|`customize/project-config.md` §context, примечание «Другой язык».|
|store-beta/user-guide.md|`multi-repo/stores.md` · раздел рабочих наборов для `multi-repo/worksets.md`|
|commands.md|`reference/skills.md` (устаревший раздел `/openspec:*` удален)|
|cli.md|`reference/cli.md` (без установки, которая переходит в `start/installation.md`)|
|supported-tools.md|`reference/supported-tools.md`|
|glossary.md|`reference/glossary.md`|
|faq.md|`help/faq.md` (заявление о неопубликованной модели удалено; обновить/удалить до `start/installation.md`)|
|устранение troubleshooting.md|`help/troubleshooting.md`, канонический дом для всех 5 копий, а также получение помощи.|
|migration-guide.md|`help/legacy/migration.md` (понижен)|
|agent-contract.md|**за пределами сайта**, в документы участников репозитория.|

Новые страницы без единого текущего источника:
`customize/overview.md` , `customize/profiles.md` (сегодня: разбросанные двухстрочные фрагменты
по 12 страницам), а также разделы `reference/schemas/`
и `reference/configuration/` (которые заменили запланированный `reference/file-formats.md` ).

<a id="cutover"></a>
## Переключение

укажите здесь `website/docs.sync.config.mjs` , добавьте перенаправления от
старых к новым в `website/public/_redirects` и проверьте
маршруты `llms.txt` /`llms-full.txt`/постраничной Markdown. `docs/` остается на
месте, нетронутым. Сайт просто перестает его читать.
