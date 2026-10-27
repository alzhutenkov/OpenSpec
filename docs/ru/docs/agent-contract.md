<!-- translation-source: docs/agent-contract.md -->
> Оригинал: [docs/agent-contract.md (английский)](../../agent-contract.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs/agent-contract.md).

> [!WARNING]
> Прежняя документация: материал может быть устаревшим. [Актуальный русский раздел](../README.md).

<a id="openspec-agent-contract"></a>
# Агентский контракт OpenSpec

Машиночитаемые поверхности `openspec` CLI, проверенные на соответствие `src/` (контрольный аудит, 11 июня 2026 г.). Каждая фигура ниже задокументирована из исходного кода.

<a id="1-general-conventions"></a>
## 1. Общие соглашения.

- **Один документ JSON на вызов.** В режиме `--json` стандартный вывод содержит ровно один документ JSON (красиво напечатанный с двумя пробелами). Человеческая проша, спиннеры и баннер хранилища идут в stderr.
- **Баннер хранилища.** В человеческом режиме корневой каталог, выбранный в хранилище, печатает `Using OpenSpec root: <id> (<path>)` в поток stderr. Никогда не печатался в режиме JSON.
- **Регистр клавиш зависит от поверхности** (см. Известные несоответствия): полезные данные хранилища/доктора/контекста используют `snake_case`; полезные нагрузки рабочего процесса (`status`, `instructions`, `new change`, `validate`, `list`) используют `camelCase`, за исключением встроенного объекта `root`, который всегда использует `store_id`.
- **Необязательные ключи опущены и не имеют значения NULL** в большинстве полезных данных (например, `root.store_id`, `member.path`). Исключения, использующие явный `null`, вызываются для каждой фигуры (проверка хранилища `git.*`, полезные данные об ошибках).

<a id="2-the-diagnostic-envelope"></a>
## 2. Диагностический конверт.

каждая машиночитаемая диагностика (`StoreDiagnostic`) использует одну форму конверта:

```json
{
  "severity": "error" | "warning" | "info",
  "code": "snake_case_string",
  "message": "human sentence",
  "target": "dotted.surface (optional)",
  "fix": "one actionable sentence/command (optional)"
}
```

Диагностика отображается в двух позициях: **массивы состояния** (`status: StoreDiagnostic[]` на верхнем уровне или для каждой записи) для результатов работоспособности и **выданные ошибки**, преобразуемые в одноэлементный массив `status` при сбое команды.

<a id="3-root-selection-and-rootoutput"></a>
## 3. Выбор корня и `RootOutput`

все команды разрешения корней (`list`, `show`, `validate`, `status`, `instructions`, `instructions apply`, `instructions archive`, `new change`, `archive`, `doctor`, `context`, `schemas`) разрешают один корень OpenSpec с помощью один приоритет:

1. `--store <id>` → зарегистрированный корень хранилища (`source: "store"`).
2. В противном случае ближайший предок с `openspec/`: форма планирования → `source: "nearest"` (указатель `store:` игнорируется с предупреждением stderr); Каталог только для конфигурации с действительным указателем `store:` → это хранилище, `source: "declared"`.
3. нет ближайшего корня + глобальный набор `defaultStore` (`openspec config set defaultStore <id>`) → это хранилище, `source: "global_default"`; устаревший идентификатор не работает из-за основной ошибки хранилища и `fix` с именем `openspec config unset defaultStore`.
4. нет ближайшего корня, нет зарегистрированных хранилищ по умолчанию и не существует → ошибка `no_root_with_registered_stores`.
5. нет root, нет значений по умолчанию, нет хранилищ: команды могут обрабатывать cwd как `source: "implicit"`; `doctor`, `context`, `list` и массовый `validate` вместо этого терпят неудачу с `no_openspec_root`. `list` сохраняет неявный резерв для устаревших проектов с `openspec/project.md`.

Успешные полезные данные JSON обычно встраивают корень; успешный
`schemas --json` намеренно остается пустым массивом совместимости, описанным в §4.13:

```json
"root": { "path": "/abs/path", "source": "store" | "declared" | "global_default" | "nearest" | "implicit", "store_id": "id (only when store-selected)" }
```

**Контракт сбоя root**: в режиме JSON при ошибке разрешения выводится `{ ...commandNullShape, "status": [diagnostic] }` на стандартный вывод и происходит выход 1.

<a id="4-command-json-shapes"></a>
## 4. Командные формы JSON.

### 4.1 `list --json`
`{ "changes": [ { "name", "completedTasks", "totalTasks", "lastModified", "status": "no-tasks"|"complete"|"in-progress", "nested"?: ["<area>/<name>", ...] } ], "warnings"?: [ { "code", "name", "nested", "message" } ], "root": RootOutput }` — обратите внимание, что `status` для каждого изменения здесь представляет собой строковое перечисление. `--specs`: `{ "specs": [ { "id", "requirementCount" } ], "root" }`.

`warnings` (опускается, если пусто) сообщает о каталогах под `changes/`, которые не были изменены. Сегодня единственным кодом является `nested_change_directory`: папка пространства имен, содержащая каталоги изменений, к которым OpenSpec не может обращаться, поскольку изменение всегда находится в каталоге непосредственно под `changes/`. В той же записи содержится `nested` в указанном изменении, тогда `status` которого не имеет смысла. Не рассматривайте такую ​​запись как изменение; сообщите о сообщении и оставьте каталоги в покое.

### 4.2 `show <item> --json`
Изменение: `{ "id", "title", "deltaCount", "deltas": [...], "root" }`. Спецификация: `{ "id", "title", "overview", "requirementCount", "requirements": [...], "metadata": { "version", "format", "sourcePath"? }, "root" }`. Требованием в спецификации или в изменениях `requirement`/`requirements` является `{ "name", "text", "scenarios": [ { "name", "rawText" } ] }`. Требование `name` - его заголовок без `Requirement:` и без закрывающего прогона `#`, точное имя архива соответствует записям MODIFIED/REMOVED/RENAMED. Сценарий `name` — это заголовок уровня 4 без `Scenario:` и без закрывающего прогона `#` — имя, которое сравнивает проверка потерь сценария MODIFIED.

### 4.3 `validate --json`
`{ "items": [ { "id", "type": "change"|"spec", "valid", "issues": [ { "level", "path", "message", "line"?, "column"? } ], "durationMs" } ], "summary": { "totals": {items,passed,failed}, "byType": {...} }, "version": "1.0", "root" }`. Выход 1, если какой-либо элемент не работает.

### 4.4 `status --json`
`{ "changeName", "schemaName", "planningHome"?: { "kind", "root", "changesDir", "defaultSchema" }, "changeRoot", "artifactPaths": { "<id>": {outputPath, resolvedOutputPath, existingOutputPaths} }, "nextSteps": ["..."], "actionContext": { "mode": "repo-local", "sourceOfTruth": "repo", "planningArtifacts", "linkedContext", "allowedEditRoots", "requiresAffectedAreaSelection", "constraints" }, "isPlanningComplete", "isComplete", "applyRequires", "artifacts": [ {id, outputPath, status: "done"|"skipped"|"ready"|"blocked", requires, missingDeps?} ], "root" }`. Для корня, выбранного для хранения, `allowedEditRoots` — это `[<declaring project>, <store>]`, если ближайший проект на текущем пути является корнем, предназначенным только для конфигурации, чьи имена указателей `store:`, которые сохраняют, и `[<store>]` в противном случае (включая глобальный `defaultStore`), с ограничением, сообщающим агенту спрашивать, какой репозиторий редактировать. OpenSpec не направляет задачи хранилища в репозитории, поэтому объявляющий проект является текущим, а не каждым репозиторием, которого касается изменение. `isPlanningComplete` означает, что существует каждый непропущенный артефакт планирования; пропущенные артефакты считаются удовлетворенными, но не были созданы. Это не означает, что задачи по реализации выполнены. `isComplete` сохраняется как псевдоним совместимости с тем же значением. `requires` каждого артефакта — это его идентификаторы прямой зависимости (присутствуют для каждого статуса, поэтому транзитивный требуемый набор вычислим, даже если артефакт — `done`); `missingDeps` появляется только при `blocked`. Массив `artifacts` расположен в порядке зависимости, при этом порядок объявления схемы `artifacts:` разрывает связи между артефактами, которые становятся готовыми одновременно (никогда не в алфавитном порядке), поэтому первая запись `ready` является артефактом для записи следующим; `missingDeps` использует тот же порядок. `"skipped"` отмечает артефакт, путь `generates` которого находится под `specs/`, в изменении, `.openspec.yaml` которого объявляет `skip_specs: true`; он удовлетворяет зависимостям, но не должен создаваться. Нет активных изменений: `{ "changes": [], "message", "root" }`, выход 0.

`--all` (пакетный, взаимоисключающий с `--change` — их объединение приводит к ошибке с нулевой формой `{ "changes": [], "root": null, "status": [d] }`): `{ "changes": [ <per-change status object, no per-change root>, ... ], "root" }`, отсортировано по имени изменения. Изменение, которое не удалось загрузить, добавляет `{ "changeName", "status": [d] }` на место; развертка продолжается, сохраняет всю оболочку и выходит из 1 как в текстовом режиме, так и в режиме JSON. Недопустимый `--schema` завершает весь вызов с нулевой формой, даже если никаких изменений не существует.

### 4,5 `instructions <artifact> --json`
`{ "changeName", "artifactId", "schemaName", "changeDir", "planningHome"?, "outputPath", "resolvedOutputPath", "existingOutputPaths", "description", "instruction"?, "context"?, "rules"?, "references"?: ReferenceIndexEntry[], "skipped"?, "warning"?, "template", "dependencies": [{id,done,path,description,skipped?}], "unlocks", "root" }`. `unlocks` перечисляет готовые артефакты в порядке объявления схемы (в том же порядке, в котором их рекомендует `status`). `"skipped": true` (с `"warning"`) появляется, когда изменение объявляет `skip_specs: true` и этот артефакт пропускается — не создавайте его файлы. Запись зависимости с `skipped: true` выполняется без файлов — не пытайтесь прочитать ее пути.

`ReferenceIndexEntry`: `{ "store_id", "root"?, "specs"?: [{id,summary}], "fetch"?, "status": [] }` — разрешенные записи содержат root/specs/fetch; неразрешенный перенос store_id + статус предупреждения. Индекс ограничен 50 КБ (`reference_index_truncated`).

### 4.6 `instructions apply --json`
`{ "changeName", "changeDir", "schemaName", "contextFiles": { "<artifactId>": ["/abs", ...] }, "progress": {total,complete,remaining}, "tasks": [{id,description,done}], "state": "blocked"|"all_done"|"ready", "missingArtifacts"?, "missingPrerequisites"?, "warnings"?, "instruction", "references"?, "context"?, "operationGuidance"?, "root" }`. `missingArtifacts` — это то, к чему применяются блоки (схема `apply.requires`); `missingPrerequisites` - это все, что еще нужно собрать перед запуском Apply, в порядке сборки - требуется транзитивное закрытие, поэтому это может быть более длинный список. `warnings` перечисляет неблокирующие проблемы с самим изменением - сегодня изменение, которое готово к реализации без дельта-спецификаций и без `skip_specs: true`, отклоняется в состоянии `openspec validate`. Оба необязательных корневых поля (`context`, `operationGuidance`) считываются из выбранного корня при каждом вызове. `context` — это обязательный ввод на уровне подсказки, к которому должны быть применены соответствующие факты, соглашения и ограничения проекта; `operationGuidance` — это рекомендательный ввод, записи которого отслеживаются только тогда, когда это применимо и совместимо со встроенным рабочим процессом. Оба остаются отдельными от состояния, задач, хода выполнения, файлов контекста и встроенных инструкций.

### 4.7 `instructions archive --json`
`{ "changeName", "context"?, "operationGuidance"?, "root" }`. Требуется действительный `--change` в разрешенном корне репозитория/хранилища и используется та же семантика требуемого контекста/рекомендательного руководства, что и применяется. Это доступная только для чтения поверхность ввода во время выполнения: она не возвращает рабочий процесс статического архива, не проверяет и не объединяет дельта-спецификации, не записывает основные спецификации и не перемещает изменения.

### 4.8 `new change <name> --json`
Успех: `{ "change": { "id", "path", "metadataPath", "schema" }, "root" }`. Ошибка: `{ "change": null, "status": [d] }`, выход 1.

### 4.9 `archive <name> --json`
Успех: `{ "archive": { "change", "archivedAs": "YYYY-MM-DD-name", "path", "specsUpdated", "totals"?, "warnings"? }, "root" }`. Ошибка: `{ "archive": null, "root"?, "status": [d] }`, выход 1. `specsUpdated` истинен только тогда, когда хотя бы один файл спецификации был записан или удален (возможность, последнее требование которой было удалено изменением, приводит к удалению ее спецификации, для чего требуется `retire_capabilities: true` в `.openspec.yaml` изменения; каждое удаление именуется в `warnings`, с вставляемой командой восстановления Git только тогда, когда спецификация находится в извлечении вызывающего объекта); уже синхронизированные архивы изменений с нулевыми итогами и пропусками, перечисленными в `warnings`. Режим JSON строго неинтерактивен: каждая точка подсказки становится кодом `archive_*`.

- **`archive: null`**: команда не выполнена. Это не гарантия того, что файлы не изменились.
- **`archive_retirement_cleanup_failed`**: изменение было заархивировано, но проверка или очистка устаревшей резервной копии не удалась. Указанный путь резервного копирования мог измениться или исчезнуть. В сообщении также может сообщаться о промежуточном источнике, оставшемся в результате неудачной очистки резервной копии. Перед очисткой проверьте текущий архив и все указанные пути восстановления. Сохраните любой необходимый контент. Повторная попытка архивирования не очищает эти пути.
- **`archive_error`**: резервная диагностика не определяет, были ли изменены файлы. Прежде чем повторить попытку, проверьте изменения, архив и затронутые спецификации.

### 4.10 `doctor --json`
`{ "root": { "path", "source", "store_id"?, "healthy", "status": [] }, "store": { "id", "metadata": {present,valid,remote?}, "origin_url"?, "drift"?: {ahead,behind}, "status": [] } | null, "references": [...], "status": [] }`. `drift` (присутствует только для оформления заказа в хранилище, поддерживаемого git и имеющего ссылку на отслеживание восходящего потока) опережает/отстает от последнего полученного восходящего потока, а не живого удаленного устройства. Признаки работоспособности любой степени серьезности, выход 0. Полезная нагрузка отказа: `{ "root": null, "store": null, "references": [], "status": [d] }`, выход 1.

### 4.11 `context --json`
`{ "root": { "path", "source", "store_id"?, "role": "openspec_root" }, "members": [ { "role": "referenced_store", "id", "path"?, "remote"?, "fetch"?, "status": [] } ], "status": [] }`. ДОСТУПЕН = путь присутствует, статус AND пуст. `--code-workspace <path>` записывает `{folders:[{name,path}]}` (только доступные хранилища, на которые имеются ссылки, префиксы `ref:`); в режиме JSON запись выполняется перед печатью, поэтому стандартный вывод содержит ровно один документ даже в случае сбоя записи. Сбой: `{ "root": null, "members": [], "status": [d] }`, выход 1.

### 4.12 `store ... --json`
настройка/регистрация: `{ "store": {id, root, metadata_path?}, "registry": {path, registered, already_registered}, "git": {is_repository, initialized, committed}, "created_files": [], "status": [] }`. отменить регистрацию/удалить: `{ "store", "registry": {path, removed}, "files": {deleted, deleted_path, left_on_disk}, "status": [] }`. список: `{ "stores": [{id, root}], "status": [] }`. врач: `{ "stores": [ { id, root, metadata_path?, openspec_root: {...healthy, status}, metadata: {present, valid, id?, remote}, git: {is_repository, has_commits, has_uncommitted_changes, has_remote, origin_url}, status } ], "status": [] }` (`null` = неизвестно/не исследовано). Заключения о состоянии здоровья, выход 0; отказы выходят из 1 с соответствующей нулевой формой. Оперативная отмена завершается 130.

<a id="413-schemas---json--templates---json"></a>
### 4.13 `schemas --json`/`templates --json`
`schemas`: успех остается пустым массивом `[ {name, description, artifacts, source} ]`; он разрешает канонический приоритет выбора корня и принимает `--store <id>`. Ошибка выбора корня: `{ "schemas": [], "root": null, "status": [d] }`, выход 1. `templates`: объект с ключом `{ "<artifactId>": {path, source} }`, все еще основанный на cwd, без ключей root/статуса.

<a id="5-exit-code-contract"></a>
## 5. Контракт кода выхода

|Ситуация|Выход|стандартный вывод|
|---|---|---|
|Успех, в т.ч. заключения о состоянии здоровья (врач/врач/врач хранилища)|0|полезная нагрузка|
|Ошибка команды в режиме `--json`.|1|один документ JSON с `status: [d]` и нулевой формой команды.|
|`validate` с неисправными элементами|1|полный отчет|
|быстрая отмена (группа `store`, человеческий режим)|130|только stderr|

<a id="6-diagnostic-code-catalog"></a>
## 6. Каталог диагностических кодов.

<a id="resolution"></a>
### Разрешение
`no_openspec_root`, `no_root_with_registered_stores`, `no_registered_stores`, `unknown_store`, `store_identity_mismatch`, `unhealthy_store_root`, `store_path_not_supported`, `invalid_store_pointer`, `initiative_option_removed`, `areas_option_removed`; проходные: `invalid_store_id`, `invalid_store_registry`, `invalid_store_metadata`.

<a id="openspec-root-health-error-no-fix"></a>
### здоровье корня OpenSpec (ошибка, исправления нет)
`openspec_store_root_missing`, `openspec_store_root_not_directory`, `openspec_root_missing`, `openspec_root_not_directory`, `openspec_config_missing`, `openspec_config_not_file`, `openspec_specs_not_directory`, `openspec_changes_not_directory`, `openspec_archive_not_directory`. Во время бета-тестирования хранилищ `openspec/specs/`, `openspec/changes/` и `openspec/changes/archive/` могут отсутствовать в работоспособном корне; если они присутствуют, это только ошибки работоспособности, но не каталоги.

<a id="store-registryidentitystate"></a>
### Хранить реестр/личность/состояние.
`invalid_store_id`, `invalid_store_registry`, `invalid_store_metadata`, `store_registry_busy`, `store_not_found`, `no_store_registry`, `store_registry_changed`, `store_metadata_missing`, `store_metadata_id_mismatch`, `store_metadata_invalid`, `store_id_conflict`, `store_path_conflict`, `store_already_registered` (информация).

<a id="store-setupregisterremove"></a>
### сохранить настройку/регистрацию/удаление.
`store_setup_id_required`, `store_setup_path_required`, `store_setup_path_not_directory`, `store_setup_inside_git_repo`, `store_setup_non_empty_directory`, `store_setup_cancelled`, `store_path_required`, `store_path_missing`, `store_path_not_directory`, `store_root_pointer_declared`, `store_register_root_unhealthy`, `store_register_identity_confirmation_required`, `store_register_cancelled`, `store_remote_empty`, `store_remote_requires_hand_edit`, `store_remove_confirmation_required`, `store_remove_cancelled`, `store_remove_path_not_directory`, `store_remove_metadata_missing`, `store_remove_contains_registered_store`, `store_root_missing` (предупреждение при удалении, ошибка в докторе), `store_root_not_directory`.

<a id="store-git"></a>
### сохранить git
`store_git_init_failed`, `store_git_identity_missing`, `store_git_commit_failed`, `store_git_no_commits` (предупреждение), `store_clone_fragile_directories` (предупреждение), `store_remote_divergence` (информация, врач), `store_checkout_drift` (информация, врач).

<a id="references-warning"></a>
### Ссылки (предупреждение)
`reference_invalid_id`, `reference_registry_unreadable`, `reference_unresolved`, `reference_root_unhealthy`, `reference_index_truncated`.

<a id="relationships-warning-doctor-context-keeps-only-the-registry-one"></a>
### Отношения (предупреждение; доктор; контекст сохраняет только реестр)
`relationship_registry_unreadable`, `root_pointer_ignored`, `root_pointer_invalid`, `pointer_declarations_inert`.

<a id="archive-json-mode"></a>
### Архив (режим JSON)
`archive_change_name_required`, `archive_change_not_found`, `archive_change_symlink`, `archive_validation_failed`, `archive_confirmation_required`, `archive_tasks_incomplete`, `archive_spec_update_failed`, `archive_spec_validation_failed`, `archive_target_exists`, `archive_retirement_cleanup_failed`, `archive_error`.

<a id="context-writes"></a>
### Контекст записывает
`context_file_exists`, `context_output_dir_missing`.

<a id="fallbacks"></a>
### Резервные варианты
`doctor_failed`, `context_failed`, `store_error`, `change_error`, `archive_error`.

<a id="known-inconsistencies"></a>
## Известные несоответствия

Записано в ходе основного аудита; переименования опубликованного ключа — это решения по продукту, отложенные после этого выпуска:

1. ~~В режиме `--json` несколько путей сбоя выводили stderr только без документа JSON.~~ Исправлено в завершающем раунде: `show`/`validate` неизвестные и неоднозначные элементы выдают `{status:[{code: unknown_item | ambiguous_item, ...}]}`; выдавались ошибки в маршруте `status`/`instructions`/`list`/`show`/`validate` через помощник по ошибкам, поддерживающий JSON (нулевая форма команды + `status`); `store <unknown subcommand> --json` излучает `{status:[{code: unknown_store_subcommand}]}`; `list` сохраняет нулевую форму `{changes|specs: [], root: null}` при сбоях разрешения.
2. `store_root_missing` генерируется с двумя уровнями серьезности (предупреждение при удалении, ошибка в докторе хранилища) — зависит от контекста, описано выше.
3. оболочка ключей Snake_case (семейство хранилищ) и CamelCase (семейство рабочих процессов); `root.store_id` везде использует Snake_case.
4. в src существуют четыре параллельных объявления типа конверта; Архив диагностики никогда не переносит `target`.
5. `list --json` повторно использует ключ `status` в качестве строкового перечисления при каждом изменении.
6. Только выход `validate` содержит поле `version`.
7. `templates` игнорирует выбор корня (на основе cwd, без `--store`).
8. устаревшие формы существительных (подкоманды `change`/`spec`) выдают незавернутые полезные данные без `root`/`status`.
