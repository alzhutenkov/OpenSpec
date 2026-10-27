<!-- translation-source: README.md; sourceCommit: 6d04a1b58dedc95729d34e4f223d9d483aae210a -->
<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="../../assets/openspec_bg.png">
      <img src="../../assets/openspec_bg.png" alt="Логотип OpenSpec">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="Проверки CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="Версия npm" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="../../LICENSE"><img alt="Лицензия: MIT (английский)" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/discord/1411657095639601154?style=flat-square&logo=discord&logoColor=white&label=Discord&suffix=%20online" /></a>
</p>

<details>
<summary><strong>Самый любимый фреймворк для работы со спецификациями.</strong></summary>

[![Звёзды (английский)](https://img.shields.io/github/stars/Fission-AI/OpenSpec?style=flat-square&label=Stars)](https://github.com/Fission-AI/OpenSpec/stargazers)
[![Загрузок в месяц (английский)](https://img.shields.io/npm/dm/@fission-ai/openspec?style=flat-square&label=Downloads/mo)](https://www.npmjs.com/package/@fission-ai/openspec)
[![Участники (английский)](https://img.shields.io/github/contributors/Fission-AI/OpenSpec?style=flat-square&label=Contributors)](https://github.com/Fission-AI/OpenSpec/graphs/contributors)

</details>
<p></p>
Наша философия:

```text
→ гибкость вместо жёстких рамок
→ итерации вместо каскадного процесса
→ простота вместо сложности
→ работа с существующими проектами, а не только с новыми
→ масштабирование от личных проектов до крупных компаний
```

<p align="center">
  Следите за обновлениями <a href="https://x.com/0xTab">@0xTab в X (английский)</a> · Присоединяйтесь к <a href="https://discord.gg/YctCnvvshC">OpenSpec в Discord (английский)</a>, чтобы получить помощь и задать вопросы.
</p>

<!-- TODO: Добавить GIF с демонстрацией процесса /opsx:propose → /opsx:archive -->

<a id="see-it-in-action"></a>
## Посмотрите, как это работает

```text
Вы: /opsx:explore
ИИ: Что вы хотите исследовать?
Вы: Хочу добавить тёмную тему, но пока не знаю, как лучше это сделать.
ИИ: Посмотрю, как у вас устроены стили...
    Подходящий вариант: переменные CSS и небольшой контекст темы
    с определением системных настроек. Без новых зависимостей. Уточним объём работы?
Вы: Да, приступим.

Вы: /opsx:propose add-dark-mode
ИИ: Создан каталог openspec/changes/add-dark-mode/
    ✓ proposal.md — зачем нужно изменение и что меняется
    ✓ specs/       — требования и сценарии
    ✓ design.md    — технический подход
    ✓ tasks.md     — список задач реализации
    Всё готово к реализации!

Вы: /opsx:apply
ИИ: Выполняю задачи...
    ✓ 1.1 Добавить поставщик контекста темы
    ✓ 1.2 Создать компонент переключателя
    ✓ 2.1 Добавить переменные CSS
    ✓ 2.2 Подключить localStorage
    Все задачи выполнены!

Вы: /opsx:archive
ИИ: Изменение перемещено в openspec/changes/archive/2025-01-23-add-dark-mode/
    Спецификации обновлены. Можно переходить к следующей возможности.
```

<details>
<summary><strong>Как выглядят сами спецификации?</strong></summary>

Обычный Markdown с требованиями и конкретными сценариями. Специальный синтаксис изучать не нужно. Вот содержимое каталога `specs/`, созданного выше:

```markdown
## ADDED Requirements

### Requirement: Выбор темы
Приложение SHALL позволять пользователям переключаться между светлой и тёмной темами,
по умолчанию следуя системным настройкам.

#### Scenario: Пользователь включает тёмную тему
- **WHEN** пользователь нажимает переключатель темы
- **THEN** приложение включает тёмную тему и сохраняет выбор
```

ИИ пишет эти документы, а вы проверяете план до написания кода.

OpenSpec разрабатывается с помощью OpenSpec. В этом репозитории можно посмотреть действующие [спецификации (английский)](../../openspec/specs) и [изменения в работе (английский)](../../openspec/changes), чтобы увидеть реальные примеры большого масштаба.

</details>

<details>
<summary><strong>Панель OpenSpec</strong></summary>

<p align="center">
  <img src="../../assets/openspec_dashboard.png" alt="Предварительный вид панели OpenSpec" width="90%">
</p>

Пояснение снимка: Summary означает «Сводка», Active Changes — «Активные изменения», Completed Changes — «Завершённые изменения», Specifications — «Спецификации». Показаны 10 спецификаций, 64 требования, 3 активных и 4 завершённых изменения; выполнено 30 из 41 задачи, то есть 73%. Идентификаторы изменений и спецификаций сохранены для сопоставления с CLI.

</details>

<a id="why-teams-adopt-openspec"></a>
## Почему команды выбирают OpenSpec

При самостоятельной работе OpenSpec помогает вам и ИИ придерживаться согласованного плана в одном репозитории. В команде сложность меняется: одна возможность затрагивает API-сервер, веб-приложение и общую библиотеку; требования принадлежат одной команде, а используют их другие; планирование начинается ещё до появления кода.

Решение — **[хранилища](docs-lab/multi-repo/stores.md)**: планирование в отдельном репозитории. В нём та же знакомая структура `openspec/` со спецификациями и изменениями, а совместная работа идёт через обычный `git push`. Единый источник требований доступен всей команде и каждому ИИ-агенту во всех репозиториях.

- **Возможности в нескольких репозиториях** — одно изменение и один план, даже если код попадает в три репозитория.
- **Общие требования** — платформенная команда ведёт спецификации, а продуктовые команды ссылаются на них без права изменения там, где их читает ИИ-агент. Не нужно поддерживать отдельную расходящуюся wiki.
- **Планирование до кода** — зафиксируйте план в хранилище сейчас; репозитории с кодом можно создать позже.

> Хранилища находятся в **beta**. Начните с [руководства по хранилищам](docs-lab/multi-repo/stores.md).

<a id="quick-start"></a>
## Быстрый старт

Установите OpenSpec. Программа состоит из одного файла и не требует Node.js. На Alpine Linux сначала выполните `apk add libstdc++ libgcc`.

macOS и Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.ps1 | iex
```

Предпочитаете менеджер пакетов? Используйте `npm install -g @fission-ai/openspec@latest` (требуется Node.js 20.19.0 или новее) либо официальную [формулу Homebrew (английский)](https://formulae.brew.sh/formula/openspec) и команду `brew install openspec`.

Затем перейдите в каталог проекта и выполните инициализацию:

```bash
cd your-project
openspec init
```

> **Хотите поручить установку ИИ?** Передайте [запрос для установки](docs-lab/start/installation.md#install-with-your-ai-assistant) своему помощнику по разработке. Он установит CLI, выполнит `openspec init` и проверит результат.

Теперь обратитесь к ИИ:

- **Пока не знаете, что хотите создать?** Начните с `/opsx:explore`: помощник изучит код, сравнит варианты и поможет составить план до написания кода, без обязательства сразу переходить к реализации. ([Быстрый старт](docs-lab/start/quickstart.md))
- **Уже знаете, что нужно?** Сразу переходите к `/opsx:propose <what-you-want-to-build>`.

Оба процесса входят в профиль по умолчанию. Если нужен расширенный набор (`/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:bulk-archive`, `/opsx:onboard`), выберите его через `openspec config profile` и примените командой `openspec update`.

`/opsx:propose` — каноническое имя. В вашем инструменте оно может записываться как `/opsx-propose` (Cursor, GitHub Copilot), `@opsx-propose` (Amazon Q) или `$openspec-propose` (Codex). `openspec init` выводит форму для выбранных инструментов. См. [поддерживаемые инструменты](docs-lab/reference/supported-tools.md).

> [!NOTE]
> Не уверены, поддерживается ли ваш инструмент? [Посмотрите полный список](docs-lab/reference/supported-tools.md): уже поддерживается более 30 инструментов, и список растёт.
>
> Также поддерживаются npm, Homebrew, pnpm, yarn, bun и Nix. [Варианты установки](docs-lab/start/installation.md).

<a id="docs"></a>
## Документация

Полная документация: **[документация OpenSpec](docs-lab/start/installation.md)**.

→ **[Быстрый старт](docs-lab/start/quickstart.md)**: первое изменение от начала до конца<br>
→ **[Настройка проекта](docs-lab/start/setup.md)**: что устанавливает `openspec init`<br>
→ **[CLI](docs-lab/reference/cli.md)**: справочник терминальных команд<br>
→ **[Поддерживаемые инструменты](docs-lab/reference/supported-tools.md)**: интеграции с инструментами и пути установки<br>
→ **[Настройка](docs-lab/customize/overview.md)**: профили, конфигурация проекта и схемы<br>
→ **[Хранилища](docs-lab/multi-repo/stores.md)**: планирование в отдельном общем репозитории команды (beta)<br>
→ **[Презентация сообщества](docs/community.md)**: проекты и материалы, созданные с помощью OpenSpec и для него

<a id="community-schemas"></a>
## Схемы сообщества

Сторонние наборы схем распространяются в отдельных репозиториях. Они предлагают готовые рабочие процессы для интеграции OpenSpec с другими инструментами, подобно [каталогу расширений сообщества github/spec-kit (английский)](https://github.com/github/spec-kit/tree/main/extensions).

→ **[Откройте каталог](docs/customization.md#community-schemas)** в документации по настройке.


<a id="why-openspec"></a>
## Зачем нужен OpenSpec?

ИИ-помощники для разработки многое умеют, но результат непредсказуем, когда требования остаются только в истории чата. OpenSpec добавляет небольшой слой спецификаций: вы согласовываете, что нужно создать, прежде чем будет написан код.

- **Согласуйте перед реализацией** — человек и ИИ договариваются о требованиях до написания кода.
- **Поддерживайте порядок** — у каждого изменения свой каталог с предложением, спецификациями, техническим решением и задачами.
- **Работайте гибко** — любой артефакт можно обновить в любой момент, без жёстких переходов между фазами.
- **Используйте свои инструменты** — OpenSpec работает более чем с 30 ИИ-помощниками через команды со слешем.

<a id="how-we-compare"></a>
### Сравнение с другими подходами

**[Spec Kit](https://github.com/github/spec-kit) (GitHub, английский)** — подробный, но тяжеловесный подход: жёсткие переходы между фазами, много Markdown и настройка Python. OpenSpec легче и допускает свободные итерации.

**[Kiro](https://kiro.dev) (AWS, английский)** — широкие возможности, но вы привязаны к их IDE и ограничены моделями Claude. OpenSpec работает с уже используемыми инструментами.

**Без спецификаций** — разработка с ИИ означает расплывчатые запросы и непредсказуемые результаты. OpenSpec добавляет предсказуемость без лишних формальностей.

<a id="updating-openspec"></a>
## Обновление OpenSpec

**Обновите CLI**

При автономной установке выполните `openspec install`. Если устанавливали через npm:

```bash
npm install -g @fission-ai/openspec@latest
```

Если устанавливали OpenSpec через Homebrew:

```bash
brew upgrade openspec
```

**Обновите инструкции агента**

Выполните в каждом проекте, чтобы заново создать инструкции для ИИ и включить актуальные команды со слешем:

```bash
openspec update
```

<a id="usage-notes"></a>
## Рекомендации по использованию

**Выбор модели**: OpenSpec лучше работает с моделями, способными к глубокому рассуждению. Для планирования и реализации рекомендуются Codex 5.5 и Opus 4.7.

**Работа с контекстом**: OpenSpec полезен чистый контекст. Очищайте контекст перед началом реализации и поддерживайте его в порядке в течение сеанса.

<a id="contributing"></a>
## Участие в разработке

Каждое изменение начинается с issue. Команда обсуждает его там. Если решено продолжать работу, сопровождающий реализует изменение или приглашает вас сделать это вместе.

→ **[CONTRIBUTING.md](CONTRIBUTING.md)**: весь процесс от первого issue до слияния PR

<a id="other"></a>
## Прочее

<details>
<summary><strong>Телеметрия</strong></summary>

OpenSpec собирает анонимную статистику использования.

Собираются только имена команд и версия, чтобы понимать, как используется программа. Аргументы, пути, содержимое и персональные данные не собираются. В CI телеметрия автоматически отключается.

**Отключение (достаточно одного способа):**
- `openspec config set telemetry.enabled false` (глобальная настройка; отсутствие значения означает, что сбор включён)
- `export OPENSPEC_TELEMETRY=0` или `export DO_NOT_TRACK=1` (переменные окружения имеют приоритет над конфигурацией)

</details>

<details>
<summary><strong>Сопровождающие и советники</strong></summary>

Список основных сопровождающих и советников, определяющих развитие проекта: [MAINTAINERS.md](MAINTAINERS.md).

</details>



<a id="license"></a>
## Лицензия

MIT

[Правила русификации документации (SDD)](../../openspec/specs/russian-documentation/spec.md)
