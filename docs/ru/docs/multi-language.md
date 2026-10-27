<!-- translation-source: docs/multi-language.md -->
> Оригинал: [docs/multi-language.md (английский)](../../multi-language.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs/multi-language.md).

> [!WARNING]
> Прежняя документация: материал может быть устаревшим. [Актуальный русский раздел](../README.md).

<a id="multi-language-guide"></a>
# Многоязычное руководство

настройте OpenSpec для создания артефактов на языках, отличных от английского.

<a id="quick-setup"></a>
## Быстрая настройка

Для нового проекта установите язык во время инициализации:

```bash
openspec init --language "Portuguese (pt-BR)"
```

записывает языковую инструкцию в `openspec/config.yaml` . Если
в проекте уже есть конфигурация, отредактируйте ее поле
`context` напрямую, чтобы сохранить существующие рекомендации по проекту.

Вы также можете настроить такое же поведение вручную:

Добавьте языковую инструкцию к вашему `openspec/config.yaml`:

```yaml
schema: spec-driven

context: |
  Language: Portuguese (pt-BR)
  Все артефакты должны быть написаны на бразильском португальском языке.
  сохраните структурные заголовки OpenSpec и ключевые слова SHALL/MUST на английском языке.

  # Контекст вашего другого проекта ниже...
  Tech stack: TypeScript, React, Node.js
```

Вот и все. Все сгенерированные артефакты теперь будут на португальском языке.

структура документа OpenSpec и нормативные ключевые слова `SHALL` /`MUST`
остаются на английском языке, поскольку от них зависит проверка. Окружающие
требования и сценарий могут быть написаны на выбранном вами языке.

<a id="language-examples"></a>
## Примеры языков

<a id="portuguese-brazil"></a>
### Португальский (Бразилия)

```yaml
context: |
  Language: Portuguese (pt-BR)
  Все артефакты должны быть написаны на бразильском португальском языке.
```

<a id="spanish"></a>
### Испанский

```yaml
context: |
  Idioma: Español
  Все артефакты написаны на испанском языке.
```

<a id="chinese-simplified"></a>
### Китайский (упрощенный)

```yaml
context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。
```

<a id="japanese"></a>
### Японский

```yaml
context: |
  言語：日本語
  すべての成果物は日本語で作成してください。
```

<a id="french"></a>
### Французский

```yaml
context: |
  Langue : Français
  Все артефакты сделаны на французском языке.
```

<a id="german"></a>
### Немецкий

```yaml
context: |
  Sprache: Deutsch
  Alle Artefakte müssen auf Deutsch verfasst werden.
```

<a id="tips"></a>
## Советы

<a id="handle-technical-terms"></a>
### Обработка технических терминов

Решите, как обращаться с технической терминологией:

```yaml
context: |
  Language: Japanese
  Write in Japanese, but:
  - сохраняйте технические термины, такие как «API», «REST», «GraphQL», на английском языке.
  - примеры кода и пути к файлам остаются на английском языке.
```

<a id="combine-with-other-context"></a>
### Объединить с другим контекстом

Настройки языка работают вместе с другим контекстом вашего проекта:

```yaml
schema: spec-driven

context: |
  Language: Portuguese (pt-BR)
  Все артефакты должны быть написаны на бразильском португальском языке.

  Tech stack: TypeScript, React 18, Node.js 20
  Database: PostgreSQL with Prisma ORM
```

<a id="verification"></a>
## Проверка

Чтобы убедиться, что ваша языковая конфигурация работает:

```bash
# проверьте инструкции — должен отображаться контекст вашего языка.
openspec instructions proposal --change my-change

# выходные данные будут включать ваш языковой контекст.
```

<a id="related-documentation"></a>
## Сопутствующая документация

- [Руководство по настройке](customization.md) — Параметры конфигурации проекта
- [Руководство по рабочим процессам](workflows.md) — полная документация по рабочим процессам.
