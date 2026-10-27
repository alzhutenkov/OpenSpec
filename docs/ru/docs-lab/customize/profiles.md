<!-- translation-source: docs-lab/customize/profiles.md -->
> Оригинал: [docs-lab/customize/profiles.md (английский)](../../../../docs-lab/customize/profiles.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/customize/profiles.md).

<a id="profiles"></a>
# Профили

> Выберите рабочие процессы и форму их установки: навыки, команды или обе формы.

Профиль определяет, какие процессы OpenSpec ([навыки и команды](../start/setup.md#the-workflow-files-skills-and-commands) в вашем ИИ-инструменте) устанавливаются на компьютере. По умолчанию используется `core`. Если изменить состав процессов, выбор сохраняется как профиль `custom`.

<a id="the-core-set"></a>
## Основной набор

Профиль `core` устанавливает шесть процессов для полного цикла от идеи до архива:

| Процесс | Назначение |
|---|---|
| [`explore`](../reference/skills.md#openspec-explore) | Обдумать идею перед подготовкой предложения |
| [`propose`](../reference/skills.md#openspec-propose) | Создать предложение и все артефакты планирования за один шаг |
| [`apply`](../reference/skills.md#openspec-apply-change) | Реализовать задачи предложения |
| [`update`](../reference/skills.md#openspec-update-change) | Пересмотреть существующие артефакты предложения |
| [`sync`](../reference/skills.md#openspec-sync-specs) | Перенести требования предложения в `specs/` без архивирования |
| [`archive`](../reference/skills.md#openspec-archive-change) | Переместить завершённое предложение в архив |

Ссылки ведут к полному контракту: аргументам, создаваемым файлам и ответу агента.

<a id="expanding-the-set-optional-workflows"></a>
## Расширьте набор: дополнительные процессы

Помимо основных доступны ещё шесть процессов. Три из них (`new`, `continue`, `ff`) готовят предложение по артефактам, а не целиком, как `propose`.

| Процесс | Назначение |
|---|---|
| [`new`](../reference/skills.md#openspec-new-change) | Создать пустую основу предложения |
| [`continue`](../reference/skills.md#openspec-continue-change) | Создать следующий артефакт планирования по одному |
| [`ff`](../reference/skills.md#openspec-ff-change) | Создать предложение со всеми артефактами, необходимыми для реализации, за один проход |
| [`verify`](../reference/skills.md#openspec-verify-change) | Проверить соответствие реализации артефактам предложения |
| [`bulk-archive`](../reference/skills.md#openspec-bulk-archive-change) | Архивировать несколько предложений |
| [`onboard`](../reference/skills.md#openspec-onboard) | Изучить процесс, выполнив одно реальное изменение от начала до конца |

Чтобы изменить набор, запустите интерактивный выбор:

```bash
openspec config profile
```

Диалог спросит, что настроить ([форму установки](#delivery-skills-commands-or-both), процессы или оба параметра), затем покажет все двенадцать процессов с отметками установленных. Любой набор, отличающийся от шести основных, сохраняется как `custom`. Можно отключать и ненужные основные процессы.

<a id="delivery-skills-commands-or-both"></a>
## Delivery: навыки, команды или обе формы

Delivery определяет форму установки: только навыки, только команды или обе формы. По умолчанию: `both`. На странице [настройки проекта](../start/setup.md#the-workflow-files-skills-and-commands) объяснены обе формы и причины их существования. Точный контракт поля: [настройки CLI (config.json)](../reference/configuration/config-json.md#delivery).

Два способа изменить настройку:

**Интерактивно:** выполните `openspec config profile` и выберите «Delivery only». Пример перехода только на навыки:

```
Current profile settings
  Delivery: both

? What do you want to configure? Delivery only
? Delivery mode (how workflows are installed): Skills only

Config changes:
  delivery: both -> skills
? Apply changes to this project now? (Y/n) y
```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-002).


**Напрямую:** одна команда без вопросов:

```bash
openspec config set delivery skills   # варианты: both, commands
```

Delivery не меняет имя профиля. `core` и `custom` описывают только набор процессов. Возврат к `core` сохраняет настройку delivery.

<a id="switching-profiles"></a>
## Переключите профиль

Переключение выполняется в два шага: измените настройку компьютера, затем примените её в каждом проекте.

1. Измените профиль:

   ```bash
   openspec config profile        # интерактивно
   openspec config profile core   # вернуть шесть основных процессов, сохранив delivery
   ```

2. Выполните обновление в каждом рабочем проекте:

   ```bash
   openspec update
   ```

Если текущая папка уже является проектом OpenSpec, интерактивный процесс предложит выполнить в ней шаг 2 сразу.
