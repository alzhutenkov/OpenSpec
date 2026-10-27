<!-- translation-source: README_OLD.md -->
> Оригинал: [README_OLD.md (английский)](../../../README_OLD.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/README_OLD.md).

> [!WARNING]
> Прежняя документация: материал может быть устаревшим. [Актуальный русский раздел](../README.md).

<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="../../../assets/openspec_pixel_dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="../../../assets/openspec_pixel_light.svg" media="(prefers-color-scheme: light)">
      <img src="../../../assets/openspec_pixel_light.svg" alt="Логотип OpenSpec" height="64">
    </picture>
  </a>

</p>
<p align="center">Spec-разработка для помощников по кодированию с использованием искусственного интеллекта. </p>
<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="npm version" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="https://nodejs.org/"><img alt="node version" src="https://img.shields.io/node/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="../../../LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join%20the%20community-5865F2?logo=discord&logoColor=white&style=flat-square" /></a>
</p>

<p align="center">
  <img src="../../../assets/openspec_dashboard.png" alt="Предварительный вид панели OpenSpec" width="90%">
</p>

Снимок панели OpenSpec показывает состояние проекта. В разделе Summary («Сводка») указаны 10 спецификаций и 64 требования, 3 активных и 4 завершённых изменения. Для задач показано 30 из 41, то есть 73%. Active Changes («Активные изменения») перечисляет изменения в работе, Completed Changes («Завершённые изменения») показывает законченные, Specifications («Спецификации») перечисляет спецификации и количество требований. Идентификаторы изменений и спецификаций сохранены на английском для сопоставления с CLI.


<p align="center">
  Следуйте <a href="https://x.com/0xTab">@0xTab на X</a> для получения обновлений. · Присоединяйтесь к <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a>, чтобы получать помощь и вопросы.
</p>

<p align="center">
  <sub>🧪 <strong>Новое: </strong> <a href="../docs/opsx.md">OPSX Рабочий процесс</a> — управляемый схемой, взломанный, гибкий. Выполняйте итерации рабочих процессов без изменения кода. </sub>
</p>

# OpenSpec

OpenSpec объединяет людей и ИИ-помощников по программированию с разработкой на основе спецификаций, поэтому вы договариваетесь о том, что создавать, прежде чем писать какой-либо код. **Ключи API не требуются.**

<a id="why-openspec"></a>
## Почему OpenSpec?

Помощники по кодированию на базе искусственного интеллекта — мощные, но непредсказуемые инструменты, когда требования хранятся в истории чата. OpenSpec добавляет упрощенный рабочий процесс спецификации, который фиксирует намерение перед реализацией, предоставляя вам детерминированные и проверяемые результаты.

Ключевые результаты:
- Заинтересованные стороны, связанные с людьми и искусственным интеллектом, согласовывают спецификации до начала работы.
- Структурированные папки изменений (предложения, задачи и обновления спецификаций) обеспечивают четкое определение объема и возможность аудита.
- общий доступ к тому, что предлагается, активно или заархивировано.
- работает с инструментами искусственного интеллекта, которые вы уже используете: пользовательские команды с косой чертой, где они поддерживаются, контекстные правила повсюду.

<a id="how-openspec-compares-at-a-glance"></a>
## Сравнение OpenSpec (краткий обзор)

- **Легкость**: простой рабочий процесс, отсутствие ключей API, минимальная настройка.
- **Браунфилд-сначала**: отлично работает за пределами 0→1. OpenSpec отделяет источник истины от предложений: `openspec/specs/` (текущая правда) и `openspec/changes/` (предлагаемые обновления). Это позволяет сохранять явные и управляемые различия между функциями.
- **Отслеживание изменений**: предложения, задачи и изменения спецификаций работают вместе; архивирование объединяет утвержденные обновления обратно в спецификации.
- **По сравнению со спецкомплектом и Kiro**: они отличаются совершенно новыми функциями (0→1). OpenSpec также отлично справляется с изменением существующего поведения (1 → n), особенно когда обновления охватывают несколько спецификаций.

полное сравнение см. в разделе [Как сравнивается OpenSpec](#how-openspec-compares).

<a id="how-it-works"></a>
## Как это работает

```
┌────────────────────┐
│ Draft Change       │
│ Proposal           │
└────────┬───────────┘
         │ share intent with your AI
         ▼
┌────────────────────┐
│ Review & Align     │
│ (edit specs/tasks) │◀──── feedback loop ──────┐
└────────┬───────────┘                          │
         │ approved plan                        │
         ▼                                      │
┌────────────────────┐                          │
│ Implement Tasks    │──────────────────────────┘
│ (AI writes code)   │
└────────┬───────────┘
         │ ship the change
         ▼
┌────────────────────┐
│ Archive & Update   │
│ Specs (source)     │
└────────────────────┘

1. Draft a change proposal that captures the spec updates you want.
2. Review the proposal with your AI assistant until everyone agrees.
3. Implement tasks that reference the agreed specs.
4. Archive the change to merge the approved updates back into the source-of-truth specs.
```

[Русское пояснение подписей и сообщений](../EXAMPLE_NOTES.md#example-001).


<a id="getting-started"></a>
## Начало работы

<a id="supported-ai-tools"></a>
### Поддерживаемые инструменты искусственного интеллекта

<details>
<summary><strong> Собственные команды слеша </strong> (нажмите, чтобы развернуть) </summary>

эти инструменты имеют встроенные команды OpenSpec. При появлении запроса выберите интеграцию OpenSpec.

|Инструмент|Команды|
|------|----------|
|**Разработчик Amazon Q**|`@openspec-proposal`, `@openspec-apply`, `@openspec-archive` (`.amazonq/prompts/`)|
|**Антигравитация**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.agent/workflows/`)|
|**Огги (дополнение CLI)**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.augment/commands/`)|
|**Claude Code**|`/openspec:proposal`, `/openspec:apply`, `/openspec:archive`|
|**Клайн**|Рабочие процессы в каталоге `.clinerules/workflows/` (`.clinerules/workflows/openspec-*.md`)|
|**Код CodeBuddy (CLI)**|`/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.codebuddy/commands/`) — см. [документацию (английский)](https://www.codebuddy.ai/cli)|
|**Codex**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (глобально: `~/.codex/prompts`, устанавливается автоматически)|
|**Продолжить**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.continue/prompts/`)|
|**CoStrict**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.cospec/openspec/commands/`) — см. [документацию (английский)](https://costrict.ai)|
|**Раздавить**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.crush/commands/openspec/`)|
|**Cursor**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive`|
|**Заводской дроид**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.factory/commands/`)|
|**Gemini CLI**|`/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.gemini/commands/openspec/`)|
|**GitHub Copilot**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.github/prompts/`)|
|**iFlow (iflow-cli)**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.iflow/commands/`)|
|**Код килограмма**|`/openspec-proposal.md`, `/openspec-apply.md`, `/openspec-archive.md` (`.kilocode/workflows/`)|
|**Открытый код**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive`|
|**Кодер**|`/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.qoder/commands/openspec/`) — см. [документацию (английский)](https://qoder.com)|
|**Код Квен**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.qwen/commands/`)|
|**RooCode**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.roo/commands/`)|
|**Виндсерфинг**|`/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.windsurf/workflows/`)|

Kilo Code автоматически обнаруживает рабочие процессы команды. Сохраните сгенерированные файлы в `.kilocode/workflows/` и запустите их из палитры команд с помощью `/openspec-proposal.md`, `/openspec-apply.md` или `/openspec-archive.md`.

</details>

<details>
<summary><strong>AGENTS.md Совместимый</strong> (нажмите, чтобы развернуть) </summary>

эти инструменты автоматически считывают инструкции рабочего процесса из `openspec/AGENTS.md`. Попросите их следовать рабочему процессу OpenSpec, если им понадобится напоминание. Узнайте больше о [соглашении AGENTS.md (английский)](https://agents.md/).

|Инструменты|
|-------|
|Усилитель • Джулс • Другие|

</details>

<a id="install--initialize"></a>
### Установка и инициализация

<a id="prerequisites"></a>
#### Предварительные требования
- **Node.js >= 20.19.0** – проверьте свою версию с помощью `node --version`.

<a id="step-1-install-the-cli-globally"></a>
#### Шаг 1. Установите CLI глобально.

**Вариант А: использование npm**

```bash
npm install -g @fission-ai/openspec@latest
```

Проверьте установку:
```bash
openspec --version
```

**Вариант Б: Использование Nix (NixOS и менеджер пакетов Nix)**

Запустите OpenSpec напрямую без установки:
```bash
nix run github:Fission-AI/OpenSpec -- init
```

Или установите в свой профиль:
```bash
nix profile install github:Fission-AI/OpenSpec
```

Или добавьте в свою среду разработки в `flake.nix`:
```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    openspec.url = "github:Fission-AI/OpenSpec";
  };

  outputs = { nixpkgs, openspec, ... }: {
    devShells.x86_64-linux.default = nixpkgs.legacyPackages.x86_64-linux.mkShell {
      buildInputs = [ openspec.packages.x86_64-linux.default ];
    };
  };
}
```

Проверьте установку:
```bash
openspec --version
```

<a id="step-2-initialize-openspec-in-your-project"></a>
#### Шаг 2. Инициализируйте OpenSpec в своем проекте.

Перейдите в каталог вашего проекта:
```bash
cd my-project
```

Запустите инициализацию:
```bash
openspec init
```

**Что происходит во время инициализации:**
- вам будет предложено выбрать любые встроенные инструменты искусственного интеллекта (Claude Code, CodeBuddy, Cursor, OpenCode, Qoder и т. д.); другие помощники всегда полагаются на общую заглушку `AGENTS.md`.
- OpenSpec автоматически настраивает косую черту для выбранных вами инструментов и всегда записывает управляемую передачу `AGENTS.md` в корень проекта.
- в вашем проекте создается новая структура каталогов `openspec/`.

**После установки:**
- основные инструменты искусственного интеллекта могут запускать рабочие процессы `/openspec` без дополнительной настройки.
- запустите `openspec list`, чтобы проверить настройку и просмотреть все активные изменения.
- Если ваш помощник по программированию не сразу отображает новые команды с косой чертой, перезапустите его. Слэш-команды загружаются при запуске,
  поэтому новый запуск гарантирует их появление

<a id="optional-populate-project-context"></a>
### Необязательно: Заполнение контекста проекта.

После завершения `openspec init` вы получите подсказку, которая поможет заполнить контекст вашего проекта:

```text
Заполните контекст проекта:
«Пожалуйста, прочитайте openspec/project.md и помогите мне заполнить его подробностями о моем проекте, техническом стеке и соглашениях»
```

используйте `openspec/project.md` для определения соглашений, стандартов, архитектурных шаблонов и других рекомендаций на уровне проекта, которые следует соблюдать при всех изменениях.

<a id="create-your-first-change"></a>
### Создайте свое первое изменение

Вот реальный пример, показывающий полный рабочий процесс OpenSpec. Это работает с любым инструментом искусственного интеллекта. Те, у кого есть встроенные команды слэша, автоматически распознают ярлыки.

<a id="1-draft-the-proposal"></a>
#### 1. Составьте проект предложения.
Начните с того, что попросите свой ИИ создать предложение по изменению:

```text
Вы: Создайте предложение по изменению OpenSpec для добавления фильтров поиска профиля по роли и команде.
     (Ярлык для инструментов с косой чертой: /openspec:proposal Добавить фильтры поиска профиля)

AI: Я создам предложение по изменению OpenSpec для фильтров профиля.
     *Скаффолды openspec/changes/add-profile-filters/ с proposal.md, tasks.md, Spec deltas.*
```

<a id="2-verify--review"></a>
#### 2. Проверка и просмотр
Убедитесь, что изменение было создано правильно, и просмотрите предложение:

```bash
$ openspec list                             # убедитесь, что папка изменений существует.
$ openspec validate add-profile-filters     # проверка форматирования спецификации.
$ openspec show add-profile-filters         # просмотрите предложение, задачи и разницу в спецификациях.
```

<a id="3-refine-the-specs"></a>
#### 3. Уточните спецификации.
Повторяйте спецификации, пока они не будут соответствовать вашим потребностям:

```text
Вы: Можете ли вы добавить критерии приемлемости для фильтров ролей и групп?

AI: Я обновлю дельту спецификации сценариями для фильтров ролей и групп.
     *Редактирует openspec/changes/add-profile-filters/specs/profile/spec.md и tasks.md.*
```

<a id="4-implement-the-change"></a>
#### 4. Внедрите изменение
Как только спецификации будут выглядеть хорошо, приступайте к реализации:

```text
Вы: Спецификации выглядят хорошо. Давайте реализуем это изменение.
     (Ярлык для инструментов с косой чертой: /openspec:apply add-profile-filters)

AI: Я поработаю над задачами по изменению add-profile-filters.
     *Реализует задачи из openspec/changes/add-profile-filters/tasks.md*
     *Отмечает задачи как выполненные: Задача 1.1 ✓, Задача 1.2 ✓, Задача 2.1 ✓...*
```

<a id="5-archive-the-completed-change"></a>
#### 5. Архивируйте выполненное изменение.
После завершения реализации заархивируйте изменение:

```text
ИИ: Все задания выполнены. Реализация готова.

Вы: Пожалуйста, заархивируйте изменение.
     (Ярлык для инструментов с косой чертой: /openspec:archive add-profile-filters)

AI: Я заархивирую изменение add-profile-filters.
    *Запускается: архив openspec add-profile-filters --yes*
     ✓ Изменение успешно заархивировано. Спецификации обновлены. Готовы к следующей функции!
```

Или запустите команду самостоятельно в терминале:
```bash
$ openspec archive add-profile-filters --yes  # архивировать выполненные изменения без подсказок.
```

**Примечание.** Инструменты со встроенными слэш-командами (Claude Code, CodeBuddy, Cursor, Codex, Qoder, RooCode) могут использовать показанные сочетания клавиш. Все остальные инструменты работают с запросами на естественном языке для «создания предложения OpenSpec», «применения изменения OpenSpec» или «архивирования изменения».

<a id="command-reference"></a>
## Справочник команд

```bash
openspec list               # просмотр папок активных изменений.
openspec view               # Интерактивная панель характеристик и изменений.
openspec show <change>      # отображение сведений об изменении (предложение, задачи, обновления спецификаций).
openspec validate <change>  # проверьте форматирование и структуру спецификации.
openspec archive <change> [--yes|-y]   # переместить завершенное изменение в архив/ (неинтерактивно с --yes)
```

<a id="example-how-ai-creates-openspec-files"></a>
## Пример: как ИИ создает файлы OpenSpec

Когда вы просите своего ИИ-помощника «добавить двухфакторную аутентификацию», он создает:

```
openspec/
├── specs/
│   └── авторизация/
│       └── spec.md # Текущая спецификация аутентификации (если существует)
└── changes/
    └── add-2fa/              # ИИ создаёт всю эту структуру
        ├── proposal.md       # Почему и что меняется
        ├── tasks.md          # Контрольный список реализации
        ├── design.md         # Технические решения (необязательно)
        └── specs/
            └── auth/
                └── spec.md   # Дельта, показывающая дополнения
```

<a id="ai-generated-spec-created-in-openspecspecsauthspecmd"></a>
### Спецификация, сгенерированная AI (созданная в `openspec/specs/auth/spec.md`):

```markdown
# Спецификация аутентификации

## Purpose
Аутентификация и управление сеансами.

## Requirements
### Requirement: Аутентификация пользователя.
Система SHALL выдает JWT при успешном входе в систему.

#### Scenario: действительные учетные данные.
- WHEN пользователь отправляет действительные учетные данные.
- THEN возвращается JWT.
```

<a id="ai-generated-change-delta-created-in-openspecchangesadd-2faspecsauthspecmd"></a>
### Дельта изменений, сгенерированных ИИ (созданных в `openspec/changes/add-2fa/specs/auth/spec.md`):

```markdown
# Дельта для аутентификации

## ADDED Requirements
### Requirement: двухфакторная аутентификация.
Система MUST требует второй фактор при входе в систему.

#### Scenario: требуется OTP.
- WHEN пользователь отправляет действительные учетные данные.
- THEN требуется запрос OTP
```

<a id="ai-generated-tasks-created-in-openspecchangesadd-2fatasksmd"></a>
### Задачи, сгенерированные ИИ (созданные в `openspec/changes/add-2fa/tasks.md`):

```markdown
## 1. Настройка базы данных.
- [ ] 1.1 Добавление секретного столбца OTP в таблицу пользователей.
- [ ] 1.2 Создание таблицы журналов проверки OTP.

## 2. Внутренняя реализация.
- [ ] 2.1 Добавление конечной точки генерации OTP
- [ ] 2.2 Измените процесс входа в систему, чтобы требовать OTP.
- [ ] 2.3 Добавить конечную точку проверки OTP

## 3. Обновления внешнего интерфейса.
- [ ] 3.1 Создание компонента ввода OTP
- [ ] 3.2 Обновление пользовательского интерфейса процесса входа в систему.
```

**Важно!** Эти файлы не создаются вручную. Ваш ИИ-помощник генерирует их на основе ваших требований и существующей кодовой базы.

<a id="understanding-openspec-files"></a>
## Понимание файлов OpenSpec

<a id="delta-format"></a>
### Дельта-формат

Дельты — это «патчи», показывающие, как изменяются спецификации:

- **`## ADDED Requirements`** — Новые возможности.
- **`## MODIFIED Requirements`** — измененное поведение (включая полностью обновленный текст)
- **`## REMOVED Requirements`** – устаревшие функции.

**Требования к формату:**
- используйте `### Requirement: <name>` для заголовков.
- для каждого требования требуется хотя бы один блок `#### Scenario:`.
- используйте SHALL/MUST в тексте требований.

<a id="how-openspec-compares"></a>
## Сравнение OpenSpec

<a id="vs-spec-kit"></a>
### По сравнению со спецкомплектом
модель OpenSpec с двумя папками (`openspec/specs/` для текущей истины, `openspec/changes/` для предлагаемых обновлений) хранит состояние и различия отдельно. Это масштабируется, когда вы изменяете существующие функции или затрагиваете несколько спецификаций. spec-kit хорош для «с нуля»/0→1, но обеспечивает меньшую структуру для межспецификационных обновлений и развивающихся функций.

<a id="vs-kirodev"></a>
### Против Kiro.dev
OpenSpec группирует все изменения для функции в одной папке (`openspec/changes/feature-name/`), что упрощает совместное отслеживание связанных спецификаций, задач и проектов. Киро распределяет обновления по нескольким папкам спецификаций, что может затруднить отслеживание функций.

<a id="vs-no-specs"></a>
### Против отсутствия спецификаций
Без спецификаций ИИ-помощники по кодированию генерируют код по расплывчатым подсказкам, часто пропуская требования или добавляя нежелательные функции. OpenSpec обеспечивает предсказуемость, согласовывая желаемое поведение до написания кода.

<a id="team-adoption"></a>
## Принятие команды

1. **Инициализируйте OpenSpec** — запустите `openspec init` в своем репозитории.
2. **Начните с новых функций**. Попросите свой ИИ фиксировать предстоящую работу в виде предложений по изменениям.
3. **Постепенный рост** — каждое изменение архивируется в действующие спецификации, документирующие вашу систему.
4. **Сохраняйте гибкость** — разные члены команды могут использовать Claude Code, CodeBuddy, Cursor или любой другой инструмент, совместимый с AGENTS.md, используя при этом одни и те же спецификации.

запускайте `openspec update` всякий раз, когда кто-то переключает инструменты, чтобы ваши агенты получали последние инструкции и привязки команд с косой чертой.

<a id="updating-openspec"></a>
## Обновление OpenSpec

1. **Обновить пакет**
   ```bash
   npm install -g @fission-ai/openspec@latest
   ```
2. **Обновить инструкции для агента**
   - Запустите `openspec update` внутри каждого проекта, чтобы восстановить рекомендации ИИ и убедиться, что последние команды косой черты активны.

<a id="experimental-features"></a>
## Экспериментальные функции

<details>
<summary><strong>🧪 OPSX: гибкий, итеративный рабочий процесс</strong> (только Claude Code) </summary>

**Почему это существует:**
- стандартный рабочий процесс заблокирован — вы не можете настраивать инструкции или настраивать их.
- Если выходные данные AI плохие, вы не можете улучшить подсказки самостоятельно.
- Один и тот же рабочий процесс для всех, нет возможности согласовать работу вашей команды.

**Что отличается:**
- **Возможен взлом** — редактируйте шаблоны и схемы самостоятельно, сразу тестируйте, без пересборки.
- **Детализированный** — каждый артефакт имеет свои инструкции, тестируйте и настраивайте индивидуально.
- **Настраиваемый** — определяйте свои собственные рабочие процессы, артефакты и зависимости.
- **Жидкость** — нет фазовых ворот, обновляйте любые артефакты в любое время.

```
You can always go back:

  proposal ──→ specs ──→ design ──→ tasks ──→ implement
     ▲           ▲          ▲                    │
     └───────────┴──────────┴────────────────────┘
```

|Команда|Что он делает|
|---------|--------------|
|`/opsx:new`|начать новое изменение.|
|`/opsx:continue`|Создать следующий артефакт (на основе того, что готово)|
|`/opsx:ff`|ускоренная перемотка вперед (все артефакты планирования одновременно).|
|`/opsx:apply`|реализация задач, обновление артефактов по мере необходимости.|
|`/opsx:archive`|Архивировать по завершении.|

**Настройка:** `openspec experimental`

[Полная документация →](../docs/opsx.md)

</details>

<details>
<summary><strong>Telemetry</strong> – OpenSpec собирает анонимную статистику использования (отказ: <code>OPENSPEC_TELEMETRY=0</code>)</summary>

Мы собираем только имена и версии команд, чтобы понять закономерности использования. Никаких аргументов, путей, контента или личных данных. Автоматически отключается в CI.

**Отказ:** `export OPENSPEC_TELEMETRY=0` или `export DO_NOT_TRACK=1`

</details>

<a id="contributing"></a>
## Содействие

- Установите зависимости: `pnpm install`.
- Сборка: `pnpm run build`
- Тест: `pnpm test`
- Разработайте CLI локально: `pnpm run dev` или `pnpm run dev:cli`.
- Обычные фиксации (однострочные): `type(scope): subject`.

<details>
<summary><strong>Сопровождающие и консультанты</strong></summary>

См. [MAINTAINERS.md](MAINTAINERS.md) для списка основных сопровождающих и консультантов, которые помогают руководить проектом.

</details>

<a id="license"></a>
## Лицензия

Массачусетский технологический институт
