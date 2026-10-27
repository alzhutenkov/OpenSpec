<!-- translation-source: docs-lab/start/installation.md -->
> Оригинал: [docs-lab/start/installation.md (английский)](../../../../docs-lab/start/installation.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/start/installation.md).

<a id="installation"></a>
# Установка

> Установите CLI `openspec` на компьютер, обновите или удалите его.

<a id="install"></a>
## Установите OpenSpec

OpenSpec устанавливается одним файлом `openspec`. Node.js не требуется.

На macOS или Linux в терминале:

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.sh | sh
```

На Windows в PowerShell:

```powershell
irm https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.ps1 | iex
```

- **Куда устанавливается:** `~/.local/bin`; на Windows: `%LOCALAPPDATA%\Programs\openspec`. Эта папка добавляется в пользовательский PATH.
- **Что проверяется:** установщик выбирает файл для вашего компьютера и перед установкой сверяет его с `SHA256SUMS` релиза.
- **Какой релиз выбирается:** самый новый с полным комплектом файлов. Несколько минут после публикации, пока файлы загружаются, установщик выбирает предыдущий релиз и сообщает об этом.
- **Alpine Linux:** сначала выполните `apk add libstdc++ libgcc`.
- **Параметры:** задайте `OPENSPEC_INSTALL_DIR` для другого каталога или `OPENSPEC_VERSION=v1.15.0` для конкретной версии.

Если установщик сообщает, что папка отсутствует в PATH, добавьте её по выведенной инструкции. Затем [проверьте результат](#check-it-worked).

Сам рабочий процесс запускается внутри ИИ-инструмента для разработки: Claude Code, Cursor или другого инструмента из [списка поддерживаемых](../reference/supported-tools.md).

<a id="download-it-yourself"></a>
### Скачайте файл самостоятельно

Каждый [релиз](https://github.com/Fission-AI/OpenSpec/releases/latest) содержит файлы для разных платформ:

| Платформа | Файл |
|---|---|
| macOS 13+ (Apple silicon / Intel) | `openspec-darwin-arm64` / `openspec-darwin-x64` |
| Linux, glibc 2.17+ (arm64 / x64) | `openspec-linux-arm64` / `openspec-linux-x64` |
| Alpine 3.17+ (arm64 / x64) | `openspec-linux-arm64-musl` / `openspec-linux-x64-musl` |
| Windows 10+ (arm64 / x64) | `openspec-windows-arm64.exe` / `openspec-windows-x64.exe` |

Переименуйте файл в `openspec` (`openspec.exe` на Windows), выполните `chmod +x openspec` на macOS или Linux и поместите его в папку из PATH.

> [!NOTE]
> macOS блокирует файл, скачанный в браузере, пока вы не выполните `xattr -d com.apple.quarantine openspec`. При установке командой выше это не требуется.

<a id="verify-a-download"></a>
### Проверьте скачанный файл

У каждого бинарного файла релиза есть подписанная запись о запуске процесса сборки. С помощью [GitHub CLI](https://cli.github.com) в терминале:

```bash
gh attestation verify openspec-darwin-arm64 --repo Fission-AI/OpenSpec
```

Команда подтверждает, что файл собран процессом этого релиза, либо завершается ошибкой. Проверка необязательна: установщик уже сверяет каждую загрузку с `SHA256SUMS`.

<a id="install-with-your-ai-assistant"></a>
## Установите с помощью ИИ-помощника

Вставьте в чат ИИ-помощника:

```text
Загрузи https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md и выполни инструкции.
```

Или передайте документ CLI-агенту из терминала (пример для Claude Code):

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md | claude
```

Будет загружен [install.md из корня репозитория](https://github.com/Fission-AI/OpenSpec/blob/main/install.md): запрос для любого агента, способного выполнять команды оболочки. Некоторые интеграции IDE этого не умеют. Помощник должен:

1. Пропустить установку, если CLI уже установлен, и предложить обновить его исходным способом. Для npm и Homebrew один раз упомянуть, что `openspec install` переключает на отдельный исполняемый файл, не настаивая на этом. Если CLI отсутствует, показать команду установки выше и дождаться подтверждения перед запуском.
2. Использовать npm только по вашей просьбе или при ошибке установщика; остановиться, если версия Node ниже 20.19.0.
3. Убедиться, что `openspec` доступен через PATH.
4. Назвать предполагаемую папку проекта, предложить текущий ИИ-инструмент, спросить о других инструментах и выполнить там `openspec init` ([настройка проекта](setup.md)).
5. Сообщить, что создал init, и точный синтаксис вызова OpenSpec в вашем инструменте.

Помощник останавливается перед привилегированными действиями и не редактирует файлы запуска оболочки. Источник истины: [команда установки выше](#install) и [менеджеры пакетов ниже](#package-managers). Запрос поручает агенту выполнить эти действия.

Этот способ установки новый, и результат зависит от модели. Используйте его, если готовы исправлять ошибки ИИ. Иначе следуйте обычному способу ниже.

<a id="package-managers"></a>
## Менеджеры пакетов

Эти способы устанавливают OpenSpec как пакет Node.js, поэтому требуется Node.js 20.19.0 или новее. Homebrew и Nix устанавливают свою зависимость Node. В терминале:

```bash
node --version
```

Если выведено `v20.19.0` или выше, установите через npm:

```npm
npm install -g @fission-ai/openspec@latest
```

Иначе установите более новый Node с [nodejs.org](https://nodejs.org) или через менеджер версий (nvm, fnm, asdf, volta), либо используйте [отдельный исполняемый файл](#install).

### Homebrew

Homebrew устанавливает OpenSpec и зависимость Node.js на macOS или Linux. В терминале:

```bash
brew install openspec
```

Формула опубликована в [homebrew-core](https://formulae.brew.sh/formula/openspec). Добавлять отдельный tap не требуется.

### Yarn

`yarn global add` доступен только в Yarn Classic (1.x). Современный Yarn не поддерживает глобальную установку; используйте npm, pnpm или bun. Менеджер пакетов глобального CLI может отличаться от менеджера проекта.

### Bun

Bun устанавливает OpenSpec, но не выполняет его, поэтому Node всё равно должен быть установлен ([Менеджеры пакетов](#package-managers)). Без Node любая команда завершится ошибкой `env: node: No such file or directory`. Так Bun обрабатывает [любой CLI для Node](https://bun.com/docs/pm/bunx#shebangs).

### Deno

Deno устанавливает CLI из npm и требует явных флагов разрешений. В терминале:

```bash
deno install --global \
  --allow-read --allow-write --allow-env --allow-sys=cpus,homedir --allow-net=edge.openspec.dev \
  npm:@fission-ai/openspec@latest
```

Некоторые команды запускают другую программу: например, [`openspec config edit`](../reference/cli.md) открывает редактор. Deno запрашивает разрешение на каждом таком запуске. Чтобы убрать повторные запросы, добавьте в команду установки ограниченное разрешение `--allow-run=<program>`.

> [!NOTE]
> Если Deno не может разрешить `@latest`, задайте диапазон версий: `npm:@fission-ai/openspec@^1.7.0`.

### Nix

Репозиторий OpenSpec содержит Nix flake. Установите его в профиль. В терминале:

```bash
nix profile install github:Fission-AI/OpenSpec
```

Или сначала выполните разовую команду без установки:

```bash
nix run github:Fission-AI/OpenSpec -- --version
```

После этого в PATH ничего не остаётся, поэтому проверять установку не нужно.

Чтобы добавить OpenSpec в оболочку разработки проекта, включите flake как вход и используйте его пакет по умолчанию. Доступные выходы перечислены в [flake.nix](https://github.com/Fission-AI/OpenSpec/blob/main/flake.nix).

Пакет Nix содержит дополнения команд для Bash, Fish и Zsh в стандартных каталогах (`share/bash-completion/completions`, `share/fish/vendor_completions.d`, `share/zsh/site-functions`). Они загружаются вместе с пакетом; запускать `openspec completion install` не требуется.

<a id="check-it-worked"></a>
## Проверьте результат

Независимо от способа установки выполните в терминале:

```bash
openspec --version
```

Если команда выводит номер версии, CLI доступен через PATH. Его устанавливают один раз на компьютер.

Далее [настройте проект](setup.md). Если помощник уже выполнил init, на этой странице описаны созданные файлы и их настройка.

<a id="switch-from-npm-to-the-standalone-install"></a>
## Перейдите с npm на отдельный исполняемый файл

Переход необязателен: npm продолжает работать. Настройки и проекты сохраняются, меняется только программа.

**1. Установите отдельный исполняемый файл.** В терминале:

```bash
openspec install
```

Команда устанавливает отдельный `openspec` и выводит команду удаления копии из npm или Homebrew.

**2. Удалите прежнюю копию.** Обычно она стоит раньше в PATH, поэтому до удаления будет запускаться именно она. Выполните команду из шага 1, например:

```npm
npm uninstall -g @fission-ai/openspec
```

**3. Проверьте запускаемую копию.** Откройте новый терминал:

```bash
openspec version
```

Ожидаемый вывод: `OpenSpec <version> (standalone)`. Если указан менеджер пакетов, в PATH осталась другая копия. Команда `which -a openspec` (Windows: `where.exe openspec`) покажет все копии; удалите лишние.

Повторно инициализировать проекты не требуется. Чтобы вернуться, удалите исполняемый файл и снова установите пакет через npm.

<a id="updating"></a>
## Обновление

В терминале каждого проекта, где выполнялся init:

```bash
openspec update
```

Когда появляется новый CLI, [`openspec update`](../reference/cli.md#openspec-update) сообщает об этом и может установить его. CLI обновляется один раз на компьютер. Каждый запуск также обновляет сгенерированные навыки и команды проекта: сами они не обновляются. Для актуального проекта выводится `✓ All 2 tool(s) up to date (v1.7.0)`.

> [!WARNING]
> При установке отдельным файлом команда `openspec install` заменяет его на месте; `openspec update` сообщает о новой версии. Для Homebrew выполните `brew upgrade openspec`. Для Deno повторите [установку Deno](#deno) с `-f`: без него установленная команда не перезаписывается. Для Nix используйте `nix profile upgrade openspec`.

> [!NOTE]
> Глобальная установка npm относится к конкретной установке Node. При смене версии Node через nvm команда `openspec` не переносится: установите её заново для новой версии.

<a id="uninstalling"></a>
## Удаление

Чтобы удалить OpenSpec, выполните шаги ниже. Они не затрагивают исходный код. Можно также попросить агента выполнить удаление по этому разделу.

**1. Удалите [дополнения команд оболочки](../reference/cli.md#openspec-completion)**, если настраивали их, пока CLI ещё установлен. В терминале:

```bash
openspec completion uninstall
```

**2. Удалите CLI.** Для отдельного файла удалите `~/.local/bin/openspec` (Windows: `%LOCALAPPDATA%\Programs\openspec` и эту папку из пользовательского PATH). Для npm в терминале:

```npm
npm uninstall -g @fission-ai/openspec
```

Homebrew: `brew uninstall openspec`. Deno: `deno uninstall --global openspec`. Nix: `nix profile remove openspec`. Оболочка больше не должна находить `openspec`.

**3. Удалите оставшиеся файлы или сохраните их.**

- Сгенерированные файлы агентов: навыки `openspec-*` и команды `opsx` в папках `.claude/`, `.agents/` и подобных, отдельно в каждом проекте. Пути для каждого инструмента перечислены в [поддерживаемых инструментах](../reference/supported-tools.md); MiniMax Code хранит навыки в `~/.minimax/skills`.
- Остатки прежних версий: блоки маркеров в `CLAUDE.md` или `AGENTS.md` (удалите блок, сохранив файл) и запросы `opsx-*.md` в `~/.codex/prompts`.
- Папка `openspec/`: сначала оцените её содержимое. `specs/` и `changes/archive/` являются историей вашей системы в обычном Markdown, который читается и без OpenSpec.
- Состояние компьютера: настройки и идентификатор телеметрии в `~/.config/openspec/`; переопределения схем, регистрации хранилищ и встроенные схемы отдельного исполняемого файла (`binary-schemas/`) в `~/.local/share/openspec/` (Windows: `%APPDATA%\openspec`, `%LOCALAPPDATA%\openspec`). Регистрации являются указателями: сами репозитории хранилищ остаются нетронутыми.
