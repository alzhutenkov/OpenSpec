<!-- translation-source: docs/supported-tools.md -->
> Оригинал: [docs/supported-tools.md (английский)](../../supported-tools.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs/supported-tools.md).

> [!WARNING]
> Прежняя документация: материал может быть устаревшим. [Актуальный русский раздел](../README.md).

<a id="supported-tools"></a>
# Поддерживаемые инструменты

OpenSpec работает со многими помощниками по программированию на базе искусственного интеллекта. Когда вы запускаете `openspec init`, OpenSpec настраивает выбранные инструменты, используя выбранный вами активный профиль/рабочий процесс и форма установки.

<a id="how-it-works"></a>
## Как это работает

Для каждого выбранного инструмента OpenSpec может установить:

1. **Навыки** (если поставка включает навыки): `.../skills/openspec-*/SKILL.md`
2. **Команды** (если в комплект поставки входят команды): командные файлы `opsx-*` для конкретного инструмента.

Codex предназначен только для навыков: OpenSpec устанавливает `.agents/skills/openspec-*/SKILL.md` для Codex, даже если для формы установки установлено значение `commands`, и не создает файлы пользовательских подсказок Codex. Существующие навыки, управляемые OpenSpec по устаревшему пути `.codex/skills`, согласовываются после написания их замен; Пользовательские и отличающиеся файлы сохраняются.

По умолчанию OpenSpec использует профиль `core`, который включает в себя:
- `propose`
- `explore`
- `apply`
- `update`
- `sync`
- `archive`

вы можете включить расширенные рабочие процессы (`new`, `continue`, `ff`, `verify`, `bulk-archive`, `onboard`) через `openspec config profile`, а затем запустить `openspec update`.

<a id="how-to-invoke"></a>
## Как вызвать

В этих документах в качестве канонического имени используется `/opsx:propose` , но каждый инструмент
пишет его так, как он загружает файл, написанный OpenSpec. Найдите путь к команде вашего
инструмента в [Справочнике по каталогу инструментов](#tool-directory-reference) ниже, а затем сопоставьте его форму здесь.

| Command file OpenSpec writes |Вы вводите|Инструменты|
|------------------------------|----------|-------|
| `.../commands/opsx/<id>.*` — an `opsx/` folder namespaces it |`/opsx:<id>`|Claude Code, CodeBuddy, Crush, Gemini CLI, Лингма, Кодер, ZCode|
| `.../opsx-<id>.*` — the filename is the command |`/opsx-<id>`|любой другой инструмент с сгенерированными командными файлами, кроме Amazon Q и Devin.|
| `.devin/workflows/opsx-<id>.md` — read by only one of Devin's two agents |`/opsx-<id>` на Devin Desktop, `/openspec-<skill>` на Devin Local|Рабочий стол Devin\*\*\*\*|
| `.amazonq/prompts/opsx-<id>.md` — a prompt, not a command |`@opsx-<id>`|Разработчик Amazon Q|
| none — skills only |`/openspec-<skill>`|CodeArts, ForgeCode, Hermes, MiniMax Code, Mistral Vibe, Zed Agent, общий `.agents`|
| none — Kimi Code |`/skill:openspec-<skill>`|Код Кими|
| none — Codex CLI |`$openspec-<skill>`|Codex ([`/openspec-<skill>` не распознан](https://github.com/openai/codex/issues/11817))|

Итак, `/opsx:propose` — это `/opsx-propose` в Cursor,
`@opsx-propose` в Amazon Q и `$openspec-propose` в Codex.

Две вещи различаются независимо, поэтому строки не сворачиваются:

- **Имя.** Строки 1–2 отличаются только тем, как файл называет команду, и
  Шток `opsx-<id>`/`opsx:<id>` одинаков для каждого инструмента с созданным
  командные файлы.
- **Оболочка.** Amazon Q загружает свои файлы в библиотеку приглашений, вызываемую с помощью
  `@`. Инструменты, предназначенные только для навыков, вообще не генерируют командных файлов, поэтому их последние три
  в строках используются имена *навыков* — перечислены в разделе
  [Сгенерированные имена навыков](#generated-skill-names) — которые не сопоставляются один к одному.
  на идентификаторы команд (`/opsx:apply` — это навык `openspec-apply-change`).

Приведенные выше шаблоны путей команд не зависят от расширения (`.*`):
расширение принадлежит инструменту (`.toml` для Gemini CLI, `.prompt` для продолжения, `.prompt.md`
для Kiro и GitHub Copilot), а некоторые инструменты отображают имя с
его расширением в средстве выбора. Соответствуйте форме каталога, а не расширению.

файлы, генерируемые OpenSpec, и подсказка «Начало работы», распечатанная
после установки, уже используют правильную форму для выбранных
вами инструментов, поэтому самый быстрый ответ — прочитать подсказку.

<a id="tool-directory-reference"></a>
## Справочник по каталогу инструментов

|Инструмент (ID)|Шаблон пути к навыкам|шаблон пути к команде.|
|-----------|---------------------|----------------------|
| Amazon Q Developer (`amazon-q`) |`.amazonq/skills/openspec-*/SKILL.md`|`.amazonq/prompts/opsx-<id>.md`|
| Antigravity (`antigravity`) |`.agent/skills/openspec-*/SKILL.md`|`.agent/workflows/opsx-<id>.md`|
| Auggie (`auggie`) |`.augment/skills/openspec-*/SKILL.md`|`.augment/commands/opsx-<id>.md`|
| IBM Bob Shell (`bob`) |`.bob/skills/openspec-*/SKILL.md`|`.bob/commands/opsx-<id>.md`|
| Claude Code (`claude`) |`.claude/skills/openspec-*/SKILL.md`|`.claude/commands/opsx/<id>.md`|
| Cline (`cline`) |`.cline/skills/openspec-*/SKILL.md`|`.clinerules/workflows/opsx-<id>.md`|
| Command Code (`command-code`) |`.commandcode/skills/openspec-*/SKILL.md`|`.commandcode/commands/opsx-<id>.md`|
| CodeArts (`codeartsagent`) |`.codeartsdoer/skills/openspec-*/SKILL.md`|не создано (нет адаптера команд; используйте вызовы `/openspec-*` на основе навыков)|
| CodeBuddy (`codebuddy`) |`.codebuddy/skills/openspec-*/SKILL.md`|`.codebuddy/commands/opsx/<id>.md`|
| Codex (`codex`) |`.agents/skills/openspec-*/SKILL.md`|не создано (только для навыков; используйте `$openspec-*`)|
| Devin Desktop, formerly Windsurf (`devin`) |`.devin/skills/openspec-*/SKILL.md`|`.devin/workflows/opsx-<id>.md`\*\*\*\*|
| ForgeCode (`forgecode`) |`.forge/skills/openspec-*/SKILL.md`|не создано (нет адаптера команд; используйте вызовы `/openspec-*` на основе навыков)|
| Continue (`continue`) |`.continue/skills/openspec-*/SKILL.md`|`.continue/prompts/opsx-<id>.prompt`|
| CoStrict (`costrict`) |`.cospec/skills/openspec-*/SKILL.md`|`.cospec/openspec/commands/opsx-<id>.md`|
| Crush (`crush`) |`.crush/skills/openspec-*/SKILL.md`|`.crush/commands/opsx/<id>.md`|
| Cursor (`cursor`) |`.cursor/skills/openspec-*/SKILL.md`|`.cursor/commands/opsx-<id>.md`|
| Factory Droid (`factory`) |`.factory/skills/openspec-*/SKILL.md`|`.factory/commands/opsx-<id>.md`|
| Gemini CLI (`gemini`) |`.gemini/skills/openspec-*/SKILL.md`|`.gemini/commands/opsx/<id>.toml`|
| GitHub Copilot (`github-copilot`) |`.github/skills/openspec-*/SKILL.md`|`.github/prompts/opsx-<id>.prompt.md`\*\*|
| Hermes Agent (`hermes`) |`.hermes/skills/openspec-*/SKILL.md`\*\*\*|не создано (нет адаптера команд; используйте вызовы `/openspec-*` на основе навыков)|
| iFlow (`iflow`) |`.iflow/skills/openspec-*/SKILL.md`|`.iflow/commands/opsx-<id>.md`|
| Junie (`junie`) |`.junie/skills/openspec-*/SKILL.md`|`.junie/commands/opsx-<id>.md`|
| Kilo Code (`kilocode`) |`.kilocode/skills/openspec-*/SKILL.md`|`.kilo/command/opsx-<id>.md`|
| Kimi Code (`kimi`) |`.kimi-code/skills/openspec-*/SKILL.md`|не создано (нет адаптера команд; используйте вызовы `/skill:openspec-*` на основе навыков)|
| Kiro (`kiro`) |`.kiro/skills/openspec-*/SKILL.md`|`.kiro/prompts/opsx-<id>.prompt.md`|
| Lingma (`lingma`) |`.lingma/skills/openspec-*/SKILL.md`|`.lingma/commands/opsx/<id>.md`|
| MiniMax Code (`minimax-code`) |`~/.minimax/skills/openspec-*/SKILL.md`|не создано (нет командного адаптера; используйте навыки работы с кодом MiniMax).|
| Mistral Vibe (`vibe`) |`.vibe/skills/openspec-*/SKILL.md`|не создано (нет адаптера команд; используйте вызовы `/openspec-*` на основе навыков)|
| Oh My Pi (`oh-my-pi`) |`.omp/skills/openspec-*/SKILL.md`|`.omp/commands/opsx-<id>.md`|
| OpenCode (`opencode`) |`.opencode/skills/openspec-*/SKILL.md`|`.opencode/commands/opsx-<id>.md`|
| Pi (`pi`) |`.pi/skills/openspec-*/SKILL.md`|`.pi/prompts/opsx-<id>.md`|
| SourceCraft Code Assistant for VS Code (`codeassistant`) |`.codeassistant/skills/openspec-*/SKILL.md`|`.codeassistant/commands/opsx-<id>.md`|
| Qoder (`qoder`) |`.qoder/skills/openspec-*/SKILL.md`|`.qoder/commands/opsx/<id>.md`|
| Qwen Code (`qwen`) |`.qwen/skills/openspec-*/SKILL.md`|`.qwen/commands/opsx-<id>.md`|
| [Rovo Dev CLI (английский)](https://support.atlassian.com/rovo/docs/use-rovo-dev-cli/) (`rovodev`) |`.rovodev/skills/openspec-*/SKILL.md`|Не создано. У Rovo нет панели с косой чертой — он сопоставляет навыки автоматически или по подсказке (например, «использовать навык openspec-propose»); `/skills` управляет только ими. Создаваемый контент ссылается на навыки по имени, а не как команды `/openspec-*`.|
| [Zoo Code (английский)](https://github.com/Zoo-Code-Org/Zoo-Code) (`roocode`) |`.roo/skills/openspec-*/SKILL.md`|`.roo/commands/opsx-<id>.md`|
| Trae (`trae`) |`.trae/skills/openspec-*/SKILL.md`|`.trae/commands/opsx-<id>.md`|
| [Zed Agent (английский)](https://zed.dev/docs/ai/skills) (`zed`) |`.agents/skills/openspec-*/SKILL.md`|не создано (только для навыков; используйте `/openspec-*` или `@openspec-*`)|
| ZCode (`zcode`) |`.zcode/skills/openspec-*/SKILL.md`|`.zcode/commands/opsx/<id>.md`|
| Shared `.agents` skills (`agents`) |`.agents/skills/openspec-*/SKILL.md`|не создано (нет адаптера команд; используйте вызовы `/openspec-*` на основе навыков)|

\*\* Файлы подсказок GitHub Copilot распознаются как пользовательские команды с косой чертой в расширениях IDE (VS Code, JetBrains, Visual Studio). Copilot CLI в настоящее время не использует `.github/prompts/*.prompt.md` напрямую. При выборе `github-copilot` также можно настроить размещенный на GitHub **агент облачного кодирования** — см. [Агент облачного кодирования GitHub Copilot](#github-copilot-cloud-coding-agent) ниже.

\*\*\* Гермес по умолчанию загружает навыки из `~/.hermes/skills/`. Чтобы использовать локальные навыки OpenSpec проекта, добавьте каталог проекта `.hermes/skills/` в `skills.external_dirs` в `~/.hermes/config.yaml`; Затем Гермес демонстрирует навыки с помощью обращенных к пользователю косых вызовов, таких как `/openspec-propose`.

\*\*\*\* Windsurf был [переименован в Devin Desktop (английский)](https://docs.devin.ai/desktop/devin-desktop-faq) 2 июня 2026 г., и его каталог конфигурации был перемещен: `.devin/` — предпочтительное место для чтения и записи, `.windsurf/` — устаревший резервный вариант только для чтения. OpenSpec следует за переименованием — идентификатор инструмента — `devin`, а `--tools windsurf` по-прежнему разрешается в него, поэтому существующие сценарии установки продолжают работать. Проекту, все еще содержащему файлы OpenSpec в `.windsurf/`, предлагается перейти на следующий `openspec update`; при отклонении они остаются на месте, а файлы, которые вы написали самостоятельно, никогда не затрагиваются. Рабочие процессы вызываются по имени файла, поэтому `.devin/workflows/opsx-apply.md` — это `/opsx-apply`. [Локальный агент Devin не поддерживает рабочие процессы](https://docs.devin.ai/desktop/devin-local) — только навыки, и он вообще не читает `.windsurf/` — поэтому всякий раз, когда OpenSpec записывает навыки Devin, он сохраняет их тела и подсказку о начале работы при вызовах навыков `/openspec-*`, которые работают на обоих агентах. При форме установки только команд навыки не записываются, и оба возвращаются к `/opsx-*`.

Поддержка SourceCraft Code Assistant предназначена для расширения VS Code. Его [пользовательские команды (английский)](https://sourcecraft.dev/portal/docs/en/code-assistant/operations/agent/slash-commands) и [навыки (английский)](https://sourcecraft.dev/portal/docs/ru/code-assistant/operations/agent/skills) доступны только в VS Code. Эта интеграция не настраивает SourceCraft Web или JetBrains.

при форме установки только навыков попросите Code Assistant использовать навык `openspec-propose` для вашей идеи. Навыки активируются посредством сопоставления запросов; OpenSpec не генерирует команды `/openspec-*` для этого инструмента.

MiniMax Code — это глобальная интеграция, предназначенная только для навыков.
OpenSpec записывает только свои каталоги `openspec-*` в `~/.minimax/skills/` ; он
не создает локальные репо-каталоги `.minimax` или `.mavis` . Форма установки только с
помощью команд оставляет существующие глобальные навыки кода MiniMax нетронутыми, поэтому
настройки формы установки одного проекта не могут удалить навыки, используемые другим проектом.

<a id="github-copilot-cloud-coding-agent"></a>
### облачный агент кодирования GitHub Copilot.

[Агент кодирования Copilot](https://docs.github.com/en/copilot/using-github-copilot/coding-agent) GitHub работает на GitHub в среде действий GitHub — отдельно от Copilot в вашем редакторе. OpenSpec может настроить его для использования OpenSpec CLI, создав два файла:

- `.github/workflows/copilot-setup-steps.yml` — устанавливает `@fission-ai/openspec` в среду агента.
- `.github/agents/openspec.agent.md` — сообщает агенту, как управлять OpenSpec.

Поскольку при этом рабочий процесс GitHub Actions записывается в ваш репозиторий, его **согласно**:

| How |Поведение|
|-----|----------|
| `openspec init` (interactive) |спрашивает, нужно ли настраивать облачные файлы. По умолчанию — **Нет**.|
| `openspec init --copilot-cloud` |устанавливает их без запроса (для скриптов/CI).|
| `openspec init --no-copilot-cloud` |пропускает их без запроса и удаляет все ранее созданные.|
| `openspec update` |Никогда не запрашивает. Обновляет файлы, только если вы разрешили (или они уже есть в проекте). Если вы отказались, облачные файлы, управляемые OpenSpec, будут удалены.|

Ваш выбор сохраняется в `openspec/config.yaml` как `githubCopilot.cloudAgent: true|false`, поэтому неинтерактивные обновления учитывают его. OpenSpec записывает или удаляет только файлы, содержимое которых он сгенерировал — если вы настраиваете `copilot-setup-steps.yml` или `openspec.agent.md` или уже имеете свой собственный, он остается нетронутым (и `init`/`update` вам об этом сообщает).

<a id="when-to-pick-the-shared-agents-target"></a>
### Когда выбирать общую цель `.agents`

`agents` — это независимый от поставщика вариант: он записывает навыки в `.agents/skills/` ,
общий корень, который читают многие инструменты агента, а не в каталог, специфичный для инструмента.

| Situation |Выбрать|
|-----------|------|
| Your tool has its own row above |собственный идентификатор — вы получаете интеграцию с этим инструментом, включая команды слэша там, где он их поддерживает.|
| Several agents on one repo, all reading `.agents/skills` |`agents` — одно дерево навыков вместо одного на инструмент.|
| Your tool isn't listed yet but reads `.agents/skills` |`agents`|

можно выбрать его вместе с идентификатором конкретного инструмента; каждый обычно пишет
в свой корень. Codex и Zed Agent являются исключениями, поскольку они
используют один и тот же канонический корень `.agents` . Если Codex
выбран с помощью Zed или `agents` , OpenSpec сохраняет одно дерево под
управлением Codex. Его передачи называют `$openspec-*` для Codex и `/openspec-*` для
других агентов, поэтому `--tools all` и существующие мультиагентные установки продолжают работать без
двух средств записи, перезаписывающих одни и те же файлы. OpenSpec также предлагает
его автоматически, если в проекте есть каталог `.agents/skills/` — простого `.agents/`
недостаточно, поскольку инструменты также используют этот корень для правил и определений
субагентов. Примечание. `.agents` — это не `.agent` : единственный каталог принадлежит Antigravity.

Следует знать две вещи:

- **Только навыки.** Командный адаптер не существует, поэтому командные файлы `opsx-*` отсутствуют.
  написано; с режимом формы установки, включающим команды, `openspec init` перечисляет `agents`
  среди инструментов, которые указаны под `Commands skipped for: … (no adapter)`.
  вызов рабочих процессов по имени навыка —
  большинство помощников, читающих `.agents/skills`, пишут `/openspec-propose`, форма
  печатается подсказка по настройке OpenSpec. Цель не зависит от поставщика, поэтому проверьте
  собственные документы помощника, если он использует другую форму.
- **Ни один `AGENTS.md` не создается и не редактируется.** Целью является каталог `.agents/`.
  Если ваш корневой `AGENTS.md` все еще содержит блоки маркеров OpenSpec из более старого
  версия, `openspec update` удаляет их — см. [Руководство по миграции](migration-guide.md).

Здесь поддерживается Zed для встроенного агента Zed.
Внешние агенты Zed и терминальные потоки используют
собственные интеграции. Для навыков агента требуется [Zed v1.4.2 (английский)](https://github.com/zed-industries/zed/releases/tag/v1.4.2) или
новее. Локальные навыки проекта недоступны в ненадежном
рабочем дереве, пока вы не [предоставите доверие](https://zed.dev/docs/worktree-trust).

поскольку `.agents/skills/` является общим для Codex, Zed Agent и независимой
от поставщика цели, стоит знать, что там утверждает OpenSpec: он записывает,
обновляет и удаляет только каталоги навыков `openspec-*` для выбранных вами
рабочих процессов, а также маркер `.openspec-target` , который записывает, отрисовывается ли
Codex, Zed Agent или независимая от поставщика цель. общее дерево.
Все остальное в этом каталоге остается в покое. Считайте имена и
маркер `openspec-*` как OpenSpec — правки внутри них заменяются на
следующий `openspec update` , так же, как и для любого другого инструмента.

Для проектов до маркировки OpenSpec предполагает владение на основе ссылок на
управляемые навыки: `$openspec-*` означает Codex, а `/openspec-*` означает независимую от поставщика
цель. Общее каноническое дерево наряду с устаревшим `.codex/skills` рассматривается как более
старая установка с двумя целями и объединяется в совместимое общее дерево.

`openspec update` также чтит это право собственности. Если проект использует `.agents`
в качестве независимого от поставщика целевого объекта, а оставшаяся установка
Codex обнаруживается только из случайных файлов подсказок, обновление оставляет установленное
дерево `agents` на месте вместо того, чтобы перезаписывать его с
помощью синтаксиса Codex, и сохраняет эти устаревшие файлы подсказок, а
не удаляет их. Чтобы передать общее дерево Codex, запустите `openspec init --tools codex` явно.

<a id="non-interactive-setup"></a>
## Неинтерактивная настройка

для установки CI/CD или по сценарию используйте `--tools` (и дополнительно `--profile`):

```bash
# Настройка определенных инструментов.
openspec init --tools claude,cursor

# настройка всех поддерживаемых инструментов.
openspec init --tools all

# Пропустить настройку инструмента.
openspec init --tools none

# переопределить профиль для этого запуска.
openspec init --profile core
```

**Доступные идентификаторы инструментов (`--tools`)** — `windsurf` также принимается в качестве псевдонима для `devin`: `amazon-q`, `antigravity`, `auggie`, `bob`, `claude`, `cline`, `command-code`, `codeartsagent`, `codex`, `devin`, `forgecode`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`, `github-copilot`, `hermes`, `iflow`, `junie`, `kilocode`, `kimi`, `kiro`, `lingma`, `minimax-code`, `vibe`, `oh-my-pi`, `opencode`, `pi`, `qoder`, `qwen`, `roocode`, `codeassistant`, `trae`, `zed`, `zcode`, `agents`

<a id="workflow-dependent-installation"></a>
## Установка в зависимости от рабочего процесса

OpenSpec устанавливает артефакты рабочего процесса на основе выбранных рабочих процессов:

- **Основной профиль (по умолчанию):** `propose`, `explore`, `apply`, `update`, `sync`, `archive`
- **Пользовательский выбор:** любое подмножество всех идентификаторов рабочих процессов:
  `propose`, `explore`, `new`, `continue`, `apply`, `update`, `ff`, `sync`, `archive`, `bulk-archive`, `verify`, `onboard`

Другими словами, количество навыков/команд зависит от профиля и формы установки, а не фиксировано.

<a id="generated-skill-names"></a>
## Сгенерированные имена навыков

При выборе в конфигурации профиля/рабочего процесса OpenSpec генерирует следующие навыки:

- `openspec-propose`
- `openspec-explore`
- `openspec-new-change`
- `openspec-continue-change`
- `openspec-apply-change`
- `openspec-update-change`
- `openspec-ff-change`
- `openspec-sync-specs`
- `openspec-archive-change`
- `openspec-bulk-archive-change`
- `openspec-verify-change`
- `openspec-onboard`

см. [Команды](commands.md) для описания поведения команд и [CLI](cli.md) для опций `init`/`update`.

<a id="related"></a>
## Связанное

- [Справочник CLI](cli.md) — Команды терминала
- [Команды](commands.md) — Слэш-команды и навыки.
- [Начало работы](getting-started.md) — Первоначальная настройка
