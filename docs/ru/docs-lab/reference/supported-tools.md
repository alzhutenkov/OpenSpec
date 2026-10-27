<!-- translation-source: docs-lab/reference/supported-tools.md -->
> Оригинал: [docs-lab/reference/supported-tools.md (английский)](../../../../docs-lab/reference/supported-tools.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/supported-tools.md).

<a id="supported-tools"></a>
# Поддерживаемые инструменты

> Какие инструменты ИИ-кодирования поддерживает OpenSpec, а также синтаксис команд каждого из них.

Каждый инструмент в матрице выполняет одни и те же рабочие процессы
OpenSpec. Навык и его команда — это одни и те же
инструкции рабочего процесса. Единственная разница в том, что вы вводите. Форма,
которую устанавливает init, является настройкой формы установки, описанной в разделе [Настройка проекта](../start/setup.md#the-workflow-files-skills-and-commands).

<a id="support-matrix"></a>
## Поддержка матрицы

отображаются вызовы для рабочего процесса применения. Каждый рабочий процесс имеет одну
и ту же форму. Идентификатор передается `openspec init --tools <id>` , чтобы пропустить сборщик ([CLI](cli.md)).

|Инструмент|идентификатор `--tools`|Навыки|вызов навыка|Команды|вызов команды|
|---|---|---|---|---|---|
| Amazon Q Developer |`amazon-q`|`.amazonq/skills/`|`/openspec-apply-change`|`.amazonq/prompts/`|`@opsx-apply`|
| Amp |`amp`|`.agents/skills/`|`/openspec-apply-change`|нет|нет|
| Antigravity |`antigravity`|`.agents/skills/`|`/openspec-apply-change`|`.agents/workflows/`|`/opsx-apply`|
| AtomCode |`atomcode`|`.atomcode/skills/`|`/openspec-apply-change`|`.atomcode/commands/`|`/opsx-apply`|
| Auggie (Augment CLI) |`auggie`|`.augment/skills/`|`/openspec-apply-change`|`.augment/commands/`|`/opsx-apply`|
| IBM Bob |`bob`|`.bob/skills/`|`/openspec-apply-change`|`.bob/commands/`|`/opsx-apply`|
| Claude Code |`claude`|`.claude/skills/`|`/openspec-apply-change`|`.claude/commands/opsx/`|`/opsx:apply`|
| Cline |`cline`|`.cline/skills/`|`/openspec-apply-change`|`.clinerules/workflows/`|`/opsx-apply`|
| CodeArts |`codeartsagent`|`.codeartsdoer/skills/`|`/openspec-apply-change`|нет|нет|
| CodeBuddy Code (CLI) |`codebuddy`|`.codebuddy/skills/`|`/openspec-apply-change`|`.codebuddy/commands/opsx/`|`/opsx:apply`|
| Code Studio |`codestudio`|`.codestudio/skills/`|`/openspec-apply-change`|`.codestudio/prompts/`|`/opsx-apply`|
| Codex |`codex`|`.agents/skills/`|`$openspec-apply-change`|нет|нет|
| Continue |`continue`|`.continue/skills/`|`/openspec-apply-change`|`.continue/prompts/`|`/opsx-apply`|
| CoStrict |`costrict`|`.cospec/skills/`|`/openspec-apply-change`|`.cospec/openspec/commands/`|`/opsx-apply`|
| Crush |`crush`|`.crush/skills/`|`/openspec-apply-change`|`.crush/commands/opsx/`|`/opsx:apply`|
| Cursor |`cursor`|`.cursor/skills/`|`/openspec-apply-change`|`.cursor/commands/`|`/opsx-apply`|
| DeepSeek Harness |`dsh`|`.dsh/skills/`|`/openspec-apply-change`|нет|нет|
| Devin Desktop (formerly Windsurf) |`devin`|`.devin/skills/`|`/openspec-apply-change`|`.devin/workflows/`|`/opsx-apply`|
| EasyCode |`easycode`|`.easycode/skills/`|`/openspec-apply-change`|`.easycode/commands/opsx/`|`/opsx:apply`|
| Factory Droid |`factory`|`.factory/skills/`|`/openspec-apply-change`|`.factory/commands/`|`/opsx-apply`|
| ForgeCode |`forgecode`|`.forge/skills/`|`/openspec-apply-change`|нет|нет|
| Gemini CLI |`gemini`|`.gemini/skills/`|`/openspec-apply-change`|`.gemini/commands/opsx/`|`/opsx:apply`|
| GigaCode |`gigacode`|`.gigacode/skills/`|`/openspec-apply-change`|`.gigacode/commands/`|`/opsx-apply`|
| GitHub Copilot |`github-copilot`|`.github/skills/`|`/openspec-apply-change`|`.github/prompts/`|`/opsx-apply`|
| Grok Build |`grok`|`.grok/skills/`|`/openspec-apply-change`|нет|нет|
| GSD |`gsd`|`.agents/skills/`|запросить `openspec-apply-change`|нет|нет|
| Hermes Agent |`hermes`|`.hermes/skills/`|`/openspec-apply-change`|нет|нет|
| iFlow |`iflow`|`.iflow/skills/`|`/openspec-apply-change`|`.iflow/commands/`|`/opsx-apply`|
| Junie |`junie`|`.junie/skills/`|`/openspec-apply-change`|`.junie/commands/`|`/opsx-apply`|
| Kilo Code |`kilocode`|`.kilocode/skills/`|`/openspec-apply-change`|`.kilo/command/`|`/opsx-apply`|
| Kimi Code |`kimi`|`.kimi-code/skills/`|`/skill:openspec-apply-change`|нет|нет|
| Kiro |`kiro`|`.kiro/skills/`|`/openspec-apply-change`|`.kiro/prompts/`|`/opsx-apply`|
| Lingma |`lingma`|`.lingma/skills/`|`/openspec-apply-change`|`.lingma/commands/opsx/`|`/opsx:apply`|
| MiniMax Code |`minimax-code`|`~/.minimax/skills/` (глобальный)|`/openspec-apply-change`|нет|нет|
| Mistral Vibe |`vibe`|`.vibe/skills/`|`/openspec-apply-change`|нет|нет|
| Oh My Pi |`oh-my-pi`|`.omp/skills/`|`/openspec-apply-change`|`.omp/commands/`|`/opsx-apply`|
| OpenCode |`opencode`|`.opencode/skills/`|`/openspec-apply-change`|`.opencode/commands/`|`/opsx-apply`|
| Pi |`pi`|`.pi/skills/`|`/openspec-apply-change`|`.pi/prompts/`|`/opsx-apply`|
| Qoder |`qoder`|`.qoder/skills/`|`/openspec-apply-change`|`.qoder/commands/opsx/`|`/opsx:apply`|
| Qwen Code |`qwen`|`.qwen/skills/`|`/openspec-apply-change`|`.qwen/commands/`|`/opsx-apply`|
| Trae |`trae`|`.trae/skills/`|`/openspec-apply-change`|`.trae/commands/`|`/opsx-apply`|
| [Veai (английский)](https://veai.ru/docs/veai/download) |`veai`|`.veai/skills/`|`/openspec-apply-change`|нет|нет|
| Warp |`warp`|`.warp/skills/`|`/openspec-apply-change`|нет|нет|
| ZCode |`zcode`|`.zcode/skills/`|`/openspec-apply-change`|`.zcode/commands/opsx/`|`/opsx:apply`|
| Zoo Code |`roocode`|`.roo/skills/`|`/openspec-apply-change`|`.roo/commands/`|`/opsx-apply`|
| Other / Universal |`agents`|`.agents/skills/`|`/openspec-apply-change`|нет|нет|

- **Вызов навыков**: вопрос о том, регистрирует ли инструмент навыки в виде введенных записей, зависит от инструмента.
  собственное поведение. В столбце показано написание, которое OpenSpec использует в сгенерированных файлах и в
  печатается подсказка init. Проверьте документацию вашего инструмента, если его ввод ничего не дает.
- **Форматы командных файлов**: большинство инструментов используют командные файлы `.md`. EasyCode и Близнецы
  CLI берет `.toml`, продолжает `.prompt` и Code Studio, Kiro и GitHub Copilot.
  `.prompt.md`. Написание, которое вы вводите, в любом случае одинаково.

<a id="per-tool-notes"></a>
## Примечания для каждого инструмента

Инструмент, не указанный здесь, ведет себя точно так, как написано в его строке.

<a id="amp"></a>
### Усилитель

- **Навыки проекта**: Усилитель считывает навыки OpenSpec из `.agents/skills/`.
- **Нет командных файлов**: Amp запускает навыки напрямую, поэтому init пропускает генерацию команд.
- **Общая папка**: Amp использует `.agents/skills/` совместно с Antigravity, Codex, Zed Agent,
  и цель `agents`. OpenSpec записывает дерево навыков один раз.

<a id="antigravity"></a>
### Антигравитация

- **Текущая папка**: Антигравитация v1.20.5 и более поздние версии, прочитайте навыки работы в рабочей области и
  рабочие процессы из `.agents/`.
- **Папка прежних версий**: после того, как OpenSpec записывает замены, он удаляет эквивалент
  сгенерированные файлы из `.agent/`. Пользовательские файлы и измененные сгенерированные файлы остаются
  `.agent/` для ознакомления.
- **Общие навыки**: Антигравитация разделяет `.agents/skills/` с Amp, Codex, Zed Agent,
  и цель `agents`. OpenSpec записывает это дерево навыков один раз, пока еще пишет.
  команды антигравитации для `.agents/workflows/`.

<a id="cline"></a>
### Клайн

Клайн читает команды из `.clinerules/workflows/` , а не
из папки `.cline/` . Навыки остаются в `.cline/skills/` .

### Codex

- **CLI и расширение IDE**: укажите `$openspec-propose` в своей идее или запустите
  `/skills` для выбора навыка. Codex не распознает `/openspec-propose`
  ([проблема исходного кода (английский)](https://github.com/openai/codex/issues/11817)).
- **Настольное приложение**: откройте «Навыки» на боковой панели и выберите `openspec-propose`.
  [Документация по навыкам OpenAI](https://learn.chatgpt.com/docs/build-skills)
  описывает оба интерфейса.
- **Нет командных файлов**: Codex запускает навыки напрямую, поэтому init пропускает команды, даже если
  они входят в комплект поставки и печатают `Commands skipped for: codex (uses skills)`.
- **Общая папка**: навыки Codex попадают в `.agents/skills/`, то же дерево Amp,
  Антигравитация, агент Zed и целевое использование `agents`. Выбор более одного сохраняет
  одно совместимое дерево, и его передачи обозначают как `$openspec-*`, так и `/openspec-*`.
  когда им владеет Codex.
- **Устаревший путь**: навыки, установленные в `.codex/skills/` более старыми версиями,
  перенесен на следующий `openspec update`.

<a id="deepseek-harness"></a>
### Ремень DeepSeek

- **Корень проекта**: DSH использует ближайшего предка `.git` или текущий каталог.
  вне Git. Запустите там `openspec init --tools dsh`. Для вложенного проекта OpenSpec:
  добавьте абсолютный путь к его каталогу `.dsh/skills/` в `customSkillDirs` DSH.
  навыки работы с Git-root по-прежнему выигрывают, если имена совпадают.
  ([правила обнаружения восходящего потока (английский)](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/skill/skill-filesystem)).
- **Приоритет**: `.dsh/skills/` имеет приоритет над одноименными навыками в
  `.agents/skills/`.
- **Форма установки**: используйте `skills` или `both`. С `commands` рабочие процессы DSH не
  установлено. Измените форму установки с помощью `openspec config profile`, затем запустите заново.
  `openspec init --tools dsh`.

<a id="devin-desktop-formerly-windsurf"></a>
### Devin Desktop (ранее Windsurf)

- **Два агента**: командные файлы в `.devin/workflows/` работают только в Devin Desktop.
  Devin Local использует только навыки, поэтому сгенерированные навыки относятся к `/openspec-<skill>`,
  работает в обоих случаях.
- **Переименовать**: `--tools windsurf` по-прежнему разрешается в `devin`. Проектный холдинг
  файлы OpenSpec в устаревшей папке `.windsurf/` предлагается перенести в следующую папку.
  `openspec update`.

### GitHub Copilot

- **Расширения IDE (форма установки команд)**: VS Code, JetBrains и загрузка Visual Studio.
  `.github/prompts/opsx-<id>.prompt.md` как `/opsx-<id>`. Если команда пропадает
  пока его файл существует, перезапустите IDE.
- **Второй пилот CLI (предоставление навыков)**: CLI игнорирует `.github/prompts/` и загружает
  Вместо этого `.github/skills/openspec-*/SKILL.md`. Вызвать навык как
  `/openspec-<skill>`. Если навык исчезает, а его файл все еще существует, запустите
  `/skills reload`, затем `/skills info openspec-propose` для подтверждения обнаружения.

### GSD

- **Навыки проекта**: GSD считывает рабочие процессы OpenSpec из
  [`.agents/skills/`](https://github.com/open-gsd/gsd-pi/blob/main/docs/user-docs/skills.md).
- **Призыв**: попросите GSD использовать навык `openspec-<workflow>`. GSD также может выбрать
  соответствующий навык через настройку открытия навыков.
- **Нет файлов субагента**: [`.gsd/agents/`](https://github.com/open-gsd/gsd-pi/blob/main/docs/user-docs/subagents.md)
  содержит определения субагента GSD. OpenSpec не записывает туда навыки документооборота.

<a id="hermes-agent"></a>
### Агент Гермеса

Гермес по умолчанию загружает навыки только из `~/.hermes/skills/`
. Добавьте папку проекта `.hermes/skills/` в `skills.external_dirs` в
`~/.hermes/config.yaml` ; init печатает это напоминание после установки.

<a id="minimax-code"></a>
### Код МиниМакса

- **Только глобально**: навыки передаются в `~/.minimax/skills/`. Внутри ничего не написано
  репозиторий.
- **Безопасно для всех проектов**: форма установки, состоящая только из команд, оставляет глобальные навыки в
  место, чтобы настройки одного проекта не могли удалить навыки, используемые в другом проекте.

<a id="warp"></a>
### Деформация

- **Навыки всегда**: навыки передаются в `.warp/skills/`, даже если форма установки — `commands`,
  потому что у Warp нет командных файлов и он напрямую вызывает навыки.
- **То, что утверждает OpenSpec**: только `.warp/skills/`. Настройки Warp и `WARP.md`
  не создан и не изменен.

<a id="other--universal-shared-agents-skills"></a>
### Другое/универсальное (общие навыки `.agents`)

- **Когда подходит**: любой инструмент, читающий общую папку `.agents/skills/`,
  включая инструменты без строк в матрице. Это запись, которую нужно выбрать, когда ваш
  помощника нет в списке. Поле поиска средства выбора инициализации находит его по `universal`,
  `other`, `generic`, `custom`, `proprietary`, `unlisted`, `unsupported`,
  `vendor-neutral` или `agents.md`.
- **Наряду с другими целями**: Amp, Антигравитация, Codex, Zed Agent и эта целевая доля.
  одно дерево физических навыков. OpenSpec записывает одного записывающего устройства в `.openspec-target` и
  записывает дерево один раз за запуск. Отдельные командные файлы каждого инструмента по-прежнему
  создано.
- **То, что заявляет OpenSpec**: только папки `openspec-*` и
  маркер `.openspec-target`. Все остальное под `.agents/` остается в покое.
- **`AGENTS.md`**: не создано и не изменено. Целью является папка `.agents/`, а не
  файл.
