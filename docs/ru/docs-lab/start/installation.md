<!-- translation-source: docs-lab/start/installation.md -->
> Оригинал: [docs-lab/start/installation.md (английский)](../../../../docs-lab/start/installation.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/start/installation.md).

<a id="installation"></a>
# Установка

> Установите CLI `openspec` на компьютер. Здесь также описаны обновление и удаление.


<a id="install"></a>
## Установите OpenSpec

OpenSpec устанавливается одним файлом `openspec`. Для него не нужен Node.js.

В терминале macOS или Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.sh | sh
```

В PowerShell на Windows:

```powershell
irm https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.ps1 | iex
```

- **Каталог установки**: `~/.local/bin`; на Windows: `%LOCALAPPDATA%\Programs\openspec`. Установщик добавляет каталог Windows в пользовательский PATH.
- **Проверка файла**: установщик выбирает файл для вашей платформы и перед установкой сверяет его с `SHA256SUMS` выпуска.
- **Версия**: последний выпуск со всеми прикреплёнными файлами. В течение нескольких минут после публикации, пока файлы загружаются, устанавливается предыдущий выпуск с соответствующим сообщением.
- **Alpine Linux**: сначала выполните `apk add libstdc++ libgcc`.
- **Параметры**: задайте `OPENSPEC_INSTALL_DIR` для другого каталога или `OPENSPEC_VERSION=v1.15.0` для конкретного выпуска.

Если установщик сообщает, что каталог отсутствует в PATH, добавьте его по показанной инструкции. Затем [проверьте установку](#check-it-worked).

Рабочий процесс выполняется в ИИ-инструменте для разработки: Claude Code, Cursor или другом инструменте из [списка поддерживаемых](../reference/supported-tools.md).

<a id="download-it-yourself"></a>
### Скачайте файл вручную

В каждом [выпуске (английский)](https://github.com/Fission-AI/OpenSpec/releases/latest) есть файл для каждой платформы:

| Платформа | Файл |
|---|---|
| macOS 13+ (Apple silicon / Intel) | `openspec-darwin-arm64` / `openspec-darwin-x64` |
| Linux, glibc 2.17+ (arm64 / x64) | `openspec-linux-arm64` / `openspec-linux-x64` |
| Alpine 3.17+ (arm64 / x64) | `openspec-linux-arm64-musl` / `openspec-linux-x64-musl` |
| Windows 10+ (arm64 / x64) | `openspec-windows-arm64.exe` / `openspec-windows-x64.exe` |

Переименуйте файл в `openspec` (`openspec.exe` на Windows), выполните `chmod +x openspec` на macOS или Linux и поместите файл в каталог из PATH.

> [!NOTE]
> macOS блокирует файл, скачанный браузером, пока вы не выполните `xattr -d com.apple.quarantine openspec`. Для команды установки выше это не требуется.

<a id="verify-a-download"></a>
### Проверьте скачанный файл

У каждого двоичного файла выпуска есть подписанная запись рабочего процесса, который его собрал. С помощью [GitHub CLI (английский)](https://cli.github.com) выполните в терминале:

```bash
gh attestation verify openspec-darwin-arm64 --repo Fission-AI/OpenSpec
```

Команда подтверждает, что файл собран рабочим процессом этого выпуска, либо завершает проверку ошибкой. Этот шаг необязателен: установщик уже сверяет каждую загрузку с `SHA256SUMS`.

<a id="install-with-your-ai-assistant"></a>
## Установите с помощью ИИ-помощника

Вставьте в чат ИИ-помощника:

```text
Загрузите https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md и следуйте его инструкциям.
```

Или передайте текст CLI-агенту через терминал (пример для Claude Code):

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md | claude
```

Команда загружает [install.md из корня репозитория](../../project/install.md). Это запрос для агента, умеющего выполнять команды оболочки; некоторые интеграции IDE этого не умеют. Помощник должен:

1. Пропустить установку, если CLI уже установлен, и предложить обновить его тем же способом. Для npm или Homebrew один раз упомянуть, что `openspec install` переводит на автономную установку, без настойчивых предложений. Иначе показать команду установки выше и дождаться вашего подтверждения перед запуском.
2. Использовать npm только по вашей просьбе или при сбое установщика. Остановиться, если версия Node ниже 20.19.0.
3. Проверить наличие `openspec` в PATH.
4. Назвать предполагаемый каталог проекта, предложить текущий ИИ-инструмент, спросить о других используемых инструментах и выполнить там `openspec init` (этап [настройки проекта](setup.md)).
5. Сообщить, что создал init, и точное написание команды вызова OpenSpec в вашем инструменте.

Помощник останавливается перед действиями с повышенными правами и не редактирует файлы запуска оболочки. [Команда установки выше](#install) и [менеджеры пакетов ниже](#package-managers) задают порядок установки; запрос поручает помощнику выполнить его.

Этот способ новый. Результат зависит от модели. Используйте его, если готовы исправлять ошибки ИИ. Иначе следуйте стандартному способу ниже.

<a id="package-managers"></a>
## Менеджеры пакетов

Они устанавливают OpenSpec как пакет Node.js, поэтому требуется Node.js 20.19.0 или новее. Homebrew и Nix устанавливают свою зависимость Node.js. В терминале:

```bash
node --version
```

Если вы видите `v20.19.0` или более новую версию, установите через npm:

```npm
npm install -g @fission-ai/openspec@latest
```

Иначе установите новую версию Node с [nodejs.org (английский)](https://nodejs.org), через менеджер версий (nvm, fnm, asdf, volta) или выберите [автономную установку](#install).

### Homebrew

Homebrew устанавливает OpenSpec и зависимость Node.js на macOS или Linux. В терминале:

```bash
brew install openspec
```

Формула опубликована в [homebrew-core (английский)](https://formulae.brew.sh/formula/openspec), поэтому добавлять tap не нужно.

### Yarn

`yarn global add` доступна только в Yarn Classic (1.x). Современный Yarn не поддерживает глобальную установку; используйте npm, pnpm или bun. Глобальный CLI может устанавливаться другим менеджером пакетов, чем сам проект.

### Bun

Bun устанавливает OpenSpec, но не запускает его. На компьютере всё равно нужен Node (см. [Менеджеры пакетов](#package-managers)). Без него каждая команда завершается с `env: node: No such file or directory`. Так Bun обрабатывает [все CLI на Node (английский)](https://bun.com/docs/pm/bunx#shebangs).

### Deno

Deno устанавливает CLI из npm и требует явных флагов разрешений. В терминале:

```bash
deno install --global \
  --allow-read --allow-write --allow-env --allow-sys=cpus,homedir --allow-net=edge.openspec.dev \
  npm:@fission-ai/openspec@latest
```

Некоторые команды запускают другую программу: [`openspec config edit`](../reference/cli.md) открывает редактор. Deno каждый раз запрашивает разрешение на такие действия. Чтобы убрать запрос, добавьте в команду установки разрешение для конкретной программы: `--allow-run=<program>`.

> [!NOTE]
> Если Deno не может разрешить `@latest`, закрепите диапазон версий: `npm:@fission-ai/openspec@^1.7.0`.

### Nix

В репозитории OpenSpec есть Nix flake. Установите пакет в свой профиль. В терминале:

```bash
nix profile install github:Fission-AI/OpenSpec
```

Или сначала выполните разовую команду без установки:

```bash
nix run github:Fission-AI/OpenSpec -- --version
```

Она не оставляет программу в PATH, поэтому проверять установку после неё не нужно.

Чтобы добавить OpenSpec в оболочку разработки проекта, подключите flake как вход и используйте его пакет по умолчанию. Выходы перечислены в [flake.nix (английский)](https://github.com/Fission-AI/OpenSpec/blob/main/flake.nix).

Пакет Nix содержит сценарии автодополнения Bash, Fish и Zsh в стандартных
каталогах (`share/bash-completion/completions`, `share/fish/vendor_completions.d`,
`share/zsh/site-functions`). Они загружаются вместе с пакетом, поэтому запускать
`openspec completion install` не требуется.

<a id="check-it-worked"></a>
## Проверьте установку

При любом способе установки выполните в терминале:

```bash
openspec --version
```

Номер версии подтверждает, что CLI доступен в PATH. Программу устанавливают один раз на компьютер.

Далее [настройте проект](setup.md). Если помощник уже выполнил init, эта страница объяснит созданные файлы и их настройку.

<a id="switch-from-npm-to-the-standalone-install"></a>
## Перейдите с npm на автономную установку

Переход необязателен: npm продолжает работать. Настройки и проекты сохраняются, меняется только программа.

**1. Установите автономную копию.** В терминале:

```bash
openspec install
```

Команда устанавливает автономный `openspec` и выводит команду удаления копии, установленной через npm или Homebrew.

**2. Удалите прежнюю копию.** Обычно она находится раньше в PATH и продолжает запускаться, пока не будет удалена. Выполните команду из шага 1, например:

```npm
npm uninstall -g @fission-ai/openspec
```

**3. Проверьте запускаемую копию.** В новом терминале:

```bash
openspec version
```

Ожидается `OpenSpec <version> (standalone)`. Если указан менеджер пакетов, в PATH осталась другая копия. `which -a openspec` (Windows: `where.exe openspec`) показывает все копии; удалите лишние.

Повторная инициализация проектов не нужна. Для обратного перехода удалите файл и снова установите пакет npm.

<a id="updating"></a>
## Обновление

В терминале каждого проекта, где вы выполняли init:

```bash
openspec update
```

Когда выходит новая версия CLI, [`openspec update`](../reference/cli.md#openspec-update) сообщает о ней и может установить её. Программу обновляют один раз на компьютер. Каждый запуск обновляет сгенерированные навыки и команды проекта; сами они не обновляются. Для актуального проекта выводится `✓ All 2 tool(s) up to date (v1.7.0)`.


> [!WARNING]
> При автономной установке выполните `openspec install`, чтобы заменить копию программы. `openspec update` сообщает о новой версии. Для Homebrew используйте `brew upgrade openspec`. Для Deno повторите [установку Deno](#deno) с `-f`, иначе существующая команда не будет перезаписана. Для Nix: `nix profile upgrade openspec`.

> [!NOTE]
> Глобальная установка npm относится к конкретной установке Node. При переключении версий Node через nvm команда `openspec` не переносится. Установите её заново для новой версии.

<a id="uninstalling"></a>
## Удаление

Выполните следующие шаги; они не затрагивают исходный код проекта. Можно поручить удаление агенту, указав ему этот раздел.

**1. Удалите [автодополнение оболочки](../reference/cli.md#openspec-completion)**, если настраивали его, пока CLI ещё установлен. В терминале:

```bash
openspec completion uninstall
```

**2. Удалите CLI.** Для автономной установки удалите `~/.local/bin/openspec` (Windows: `%LOCALAPPDATA%\Programs\openspec`, а также этот каталог из пользовательского PATH). Для npm в терминале:

```npm
npm uninstall -g @fission-ai/openspec
```

Для Homebrew: `brew uninstall openspec`. Для Deno: `deno uninstall --global openspec`. Для Nix: `nix profile remove openspec`. Оболочка больше не должна находить `openspec`.

**3. Удалите оставшиеся файлы или сохраните их.**

- Сгенерированные файлы агента: навыки `openspec-*` и команды `opsx` в каталогах вроде `.claude/` или `.agents/` каждого проекта. Пути перечислены в [поддерживаемых инструментах](../reference/supported-tools.md). MiniMax Code хранит навыки в `~/.minimax/skills`.
- Следы старых версий: блоки маркеров в `CLAUDE.md` или `AGENTS.md` (удалите блок, сохраните файл) и запросы `opsx-*.md` в `~/.codex/prompts`.
- Каталог `openspec/`: сначала обдумайте удаление. `specs/` и `changes/archive/` хранят описание системы в обычном Markdown, доступном без OpenSpec.
- Данные компьютера: настройки и идентификатор телеметрии в `~/.config/openspec/`; переопределения схем, регистрации хранилищ и встроенные схемы автономной установки (`binary-schemas/`) в `~/.local/share/openspec/` (Windows: `%APPDATA%\openspec`, `%LOCALAPPDATA%\openspec`). Регистрации являются указателями; репозитории хранилищ сохраняются.
