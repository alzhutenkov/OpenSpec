<!-- translation-source: README.md -->
> Оригинал: [README.md (английский)](../../../README.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/README.md).

<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="../../../assets/openspec_bg.png">
      <img src="../../../assets/openspec_bg.png" alt="Логотип OpenSpec">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="npm version" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="../../../LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/discord/1411657095639601154?style=flat-square&logo=discord&logoColor=white&label=Discord&suffix=%20online" /></a>
</p>

<details>
<summary><strong>Самая любимая платформа спецификаций. </strong></summary>

[![Звезды (английский)](https://img.shields.io/github/stars/Fission-AI/OpenSpec?style=flat-square&label=Stars) ](https://github.com/Fission-AI/OpenSpec/stargazers)
[![Загрузки (английский)](https://img.shields.io/npm/dm/@fission-ai/openspec?style=flat-square&label=Downloads/mo) ](https://www.npmjs.com/package/@fission-ai/openspec)
[![Соавторы (английский)](https://img.shields.io/github/contributors/Fission-AI/OpenSpec?style=flat-square&label=Contributors) ](https://github.com/Fission-AI/OpenSpec/graphs/contributors)

</details>
<p></p>
Наша философия:

```text
→ жидкость не жесткая
→ итеративный, а не каскадный
→ просто, не сложно
→ создано для уже существующих предприятий, а не только для новых предприятий.
→ масштабируемость от личных проектов до корпоративных.
```

<p align="center">
  Следуйте <a href="https://x.com/0xTab">@0xTab на X</a> для получения обновлений. · Присоединяйтесь к <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a>, чтобы получать помощь и вопросы.
</p>

<!-- TODO: Добавить демоверсию GIF /opsx:propose → Рабочий процесс /opsx:archive -->

<a id="see-it-in-action"></a>
## Посмотрите в действии

```text
Вы: /opsx:explore
AI: Что бы вы хотели изучить?
Вы: Мне нужен темный режим, но я не знаю, как это сделать правильно.
AI: Дай-ка я посмотрю на твой стиль...
     Самый чистый путь здесь: переменные CSS + небольшой контекст темы,
     с определением системных предпочтений. Никаких новых зависимостей. Оценить это?
Вы: Да, давайте сделаем это.

Вы: /opsx:propose add-dark-mode
AI: Создано openspec/changes/add-dark-mode/
     ✓ Offer.md — почему мы это делаем, что меняется
     ✓ спецификации/ — требования и сценарии
     ✓ design.md — технический подход
     ✓ Tasks.md — контрольный список реализации
     Готово к внедрению!

Вы: /opsx:apply
ИИ: Реализация задач...
     ✓ 1.1 Добавление поставщика контекста темы
     ✓ 1.2 Создание компонента переключения
     ✓ 2.1 Добавление переменных CSS
     ✓ 2.2 Подключение localStorage
     Все задания выполнены!

Вы: /opsx:archive
AI: Архивировано в openspec/changes/archive/2025-01-23-add-dark-mode/.
     обновлены спецификации. Готов к следующей функции.
```

<details>
<summary><strong>Как на самом деле выглядят спецификации? </strong></summary>

Обычный Markdown — требования с конкретными сценариями, специального синтаксиса для изучения не требуется. Вот что находится в папке `specs/`, созданной выше:

```markdown
## ADDED Requirements

### Requirement: выбор темы.
Приложение SHALL позволяет пользователям переключаться между светлыми и темными темами.
по умолчанию используются системные настройки.

#### Scenario: пользователь переключает темный режим.
- **WHEN** пользователь нажимает на переключатель темы.
- **THEN** приложение переключается в темный режим и сохраняет выбор.
```

Это пишет ваш ИИ; вы просматриваете план перед написанием кода.

OpenSpec создан на основе OpenSpec — просмотрите действующие [спецификации] этого репозитория (openspec/specs) и текущие [изменения](../../../openspec/changes) для реальных примеров в масштабе.

</details>

<details>
<summary><strong>OpenSpec Панель управления</strong></summary>

<p align="center">
  <img src="../../../assets/openspec_dashboard.png" alt="Предварительный вид панели OpenSpec" width="90%">
</p>

На снимке показан результат `openspec view`. **Summary**: сводка, 10 спецификаций и 64 требования, 3 активных и 4 завершённых изменения; выполнено 30 из 41 задачи (73%). **Active Changes**: изменения в работе с полосами выполнения. **Completed Changes**: завершённые изменения. **Specifications**: спецификации; справа от каждой указано количество требований (`requirements`). Имена изменений и спецификаций являются техническими идентификаторами и сохраняют исходное написание.

</details>

<a id="why-teams-adopt-openspec"></a>
## Почему команды используют OpenSpec

Соло, OpenSpec обеспечивает честность вас и вашего ИИ в одном репозитории. В команде самая сложная часть движется: функция охватывает сервер API, веб-приложение и общую библиотеку; требования принадлежат одной команде и потребляются другими; планирование начинается до того, как появится какой-либо код.

**[Хранилища](../docs-lab/multi-repo/stores.md)** — это ответ — планирование в собственном репозитории. Та же самая форма `openspec/`, которую вы уже знаете (спецификации и изменения), разделяемая `git push`, как и все остальное. Один источник правды, который может прочитать вся ваша команда и каждый агент кодирования, в каждом репозитории.

- **Функции перекрестного репозитория** — одно изменение, один план, даже если код попадает в три репозитория.
- **Общие требования** — спецификации принадлежат команде платформы; команды разработчиков ссылаются на них только для чтения, там, где их может прочитать агент кодирования. Никакой дрейфующей вики.
- **План перед кодом** — сохраните план в хранилище прямо сейчас; репозитории кода появятся позже.

> Хранилища находятся в стадии **бета-тестирования**. Начните с [Справочника по хранилищам](https://openspec.dev/docs/stores).

<a id="quick-start"></a>
## Быстрый старт

Установите OpenSpec. Это один файл, и ему не нужен Node.js (в Alpine Linux сначала запустите `apk add libstdc++ libgcc`).

macOS и Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/scripts/binary/install.ps1 | iex
```

Предпочитаете менеджер пакетов? `npm install -g @fission-ai/openspec@latest` (требуется Node.js 20.19.0 или выше) или официальная [формула Homebrew](https://formulae.brew.sh/formula/openspec), `brew install openspec`.

Затем перейдите в каталог вашего проекта и инициализируйте:

```bash
cd your-project
openspec init
```

> **Хотите, чтобы это сделал ваш ИИ?** Вставьте [подсказку установки](../docs-lab/start/installation.md#install-with-your-ai-assistant) в помощник по кодированию — он установит CLI, запустит `openspec init` и проверит результат.

Теперь поговорите со своим ИИ:

- **Еще не знаете, что построить?** Начните с `/opsx:explore`, мыслящего партнера без каких-либо ставок, который читает ваш код, взвешивает варианты и формирует план еще до того, как код будет написан. ([Краткий старт](../docs-lab/start/quickstart.md))
- **Уже знаете, чего хотите?** Перейдите прямо к `/opsx:propose <what-you-want-to-build>`.

оба находятся в профиле по умолчанию. Если вам нужен расширенный рабочий процесс (`/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:bulk-archive`, `/opsx:onboard`), выберите его с помощью `openspec config profile` и примените с помощью `openspec update`.

`/opsx:propose` — каноническое имя; ваш инструмент может называться `/opsx-propose` (Cursor, GitHub Copilot), `@opsx-propose` (Amazon Q) или `$openspec-propose` (Codex). `openspec init` печатает правильную форму для выбранных вами инструментов — см. [Поддерживаемые инструменты](https://openspec.dev/docs/supported-tools).

> [!NOTE]
> Не уверены, поддерживается ли ваш инструмент? [Просмотреть полный список](../docs-lab/reference/supported-tools.md) – мы поддерживаем более 30 инструментов и продолжаем расти.
>
> также работает с npm, Homebrew, pnpm, Yarn, Bun и Nix. [См. варианты установки](../docs-lab/start/installation.md).

<a id="docs"></a>
## Документы

Полная документация находится по адресу **[openspec.dev/docs](../docs-lab/start/installation.md)**.

→ **[Краткий старт](../docs-lab/start/quickstart.md)**: первое изменение, от начала до
конца<br> → **[Настройте проект](../docs-lab/start/setup.md)**: что устанавливает `openspec init` <br> →
**[CLI](../docs-lab/reference/cli.md)**: ссылка на терминал<br> → **[Поддерживается Инструменты](../docs-lab/reference/supported-tools.md)**: интеграция инструментов
и пути установки<br> → **[Настройка](../docs-lab/customize/overview.md)**: профили, конфигурация проекта и
схемы<br> → **[Хранилища](../docs-lab/multi-repo/stores.md)**: планирование в отдельном репозитории, доступном для
всей вашей команды (бета) <br> → **[Сообщество Витрина](../docs/community.md)**: проекты
и ресурсы, созданные с использованием OpenSpec и для него.

<a id="community-schemas"></a>
## схемы сообщества.

сторонние пакеты схем, распространяемые через автономные репозитории. Они обеспечивают продуманные рабочие процессы, интегрирующие OpenSpec с другими инструментами, аналогично тому, как [каталог расширений сообщества github/spec-kit](https://github.com/github/spec-kit/tree/main/extensions) обрабатывает интеграцию инструментов.

→ **[Просмотреть каталог](../docs/customization.md#community-schemas)** в документации по настройке.


<a id="why-openspec"></a>
## Почему OpenSpec?

Помощники по программированию с использованием искусственного интеллекта эффективны, но непредсказуемы, когда требования сохраняются только в истории чата. OpenSpec добавляет упрощенный уровень спецификаций, поэтому вы можете договориться о том, что создавать, прежде чем писать какой-либо код.

- **Соглашайтесь, прежде чем создавать** — человек и ИИ согласовывают спецификации до того, как будет написан код.
- **Будьте организованы** — каждое изменение получает отдельную папку с предложением, спецификациями, дизайном и задачами.
- **Работайте плавно** — обновляйте любые артефакты в любое время, никаких жестких фазовых вентилей.
- **Используйте свои инструменты** — работает с более чем 30 AI-помощниками с помощью косой черты.

<a id="how-we-compare"></a>
### Как мы сравниваем

**по сравнению с. [Спецкомплект (английский)](https://github.com/github/spec-kit)** (GitHub) — Тщательный, но тяжелый. Жесткие фазовые вентили, множество Markdown, настройка Python. OpenSpec легче и позволяет свободно выполнять итерации.

**по сравнению с. [Kiro (английский)](https://kiro.dev)** (AWS) — мощный, но вы привязаны к их IDE и ограничены моделями Claude. OpenSpec работает с инструментами, которые вы уже используете.

**по сравнению с. ничего** — Программирование ИИ без спецификаций означает расплывчатые подсказки и непредсказуемые результаты. OpenSpec обеспечивает предсказуемость без церемоний.

<a id="updating-openspec"></a>
## Обновление OpenSpec

**Обновите CLI**

при автономной установке запустите `openspec install`. Если вы установили с помощью npm:

```bash
npm install -g @fission-ai/openspec@latest
```

Если вы установили OpenSpec с Homebrew:

```bash
brew upgrade openspec
```

**Обновить инструкции для агента**

Запустите это внутри каждого проекта, чтобы восстановить руководство ИИ и убедиться, что последние команды косой черты активны:

```bash
openspec update
```

<a id="usage-notes"></a>
## Замечания по использованию

**Выбор модели**: OpenSpec лучше всего работает с моделями, основанными на аргументах. Мы рекомендуем Codex 5.5 и Opus 4.7 как для планирования, так и для реализации.

**Гигиена контекста**: OpenSpec использует чистое контекстное окно. Очистите контекст перед началом реализации и поддерживайте хорошую гигиену контекста на протяжении всего сеанса.

<a id="contributing"></a>
## Содействие

Каждое изменение начинается с проблемы. Мы обсуждаем это там, и если мы согласны продолжить это, сопровождающий внесет изменение или пригласит вас создать его вместе с нами.

→ **[CONTRIBUTING.md](CONTRIBUTING.md)**: полный процесс, от первого выпуска до объединенного PR.

<a id="other"></a>
## Прочее

<details>
<summary><strong>Телеметрия</strong></summary>

OpenSpec собирает анонимную статистику использования.

Мы собираем только имена и версии команд, чтобы понять закономерности использования. Никаких аргументов, путей, контента или личных данных. Автоматически отключается в CI.

**Отказ (достаточно любого):**
- `openspec config set telemetry.enabled false` (глобальная конфигурация; не установлено — включено)
- `export OPENSPEC_TELEMETRY=0` или `export DO_NOT_TRACK=1` (конфигурация env переопределяет)

</details>

<details>
<summary><strong>Сопровождающие и консультанты</strong></summary>

См. [MAINTAINERS.md](MAINTAINERS.md) для списка основных сопровождающих и консультантов, которые помогают руководить проектом.

</details>



<a id="license"></a>
## Лицензия

Массачусетский технологический институт
