<!-- translation-source: docs-lab/reference/configuration/config-json.md -->
> Оригинал: [docs-lab/reference/configuration/config-json.md (английский)](../../../../../docs-lab/reference/configuration/config-json.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/configuration/config-json.md).

<a id="cli-settings-configjson"></a>
# Настройки CLI (config.json)

> Все поля config.json: поведение CLI openspec на вашем компьютере.

<a id="location"></a>
## Расположение

CLI хранит настройки компьютера в `~/.config/openspec/config.json` на macOS и Linux и в `%APPDATA%\openspec\config.json` на Windows. Заданный `$XDG_CONFIG_HOME` имеет приоритет на любой платформе. Команда `openspec config` читает и редактирует файл.

<a id="fields"></a>
## Поля

| Ключ | Тип | Обязательно | Действие |
| --- | --- | --- | --- |
| `profile` | строка: `core` или `custom` | Нет | Набор процессов, устанавливаемый `openspec init` |
| `delivery` | строка: `both`, `skills` или `commands` | Нет | Установка навыков, команд или обеих форм |
| `workflows` | список строк | Нет | Процессы, устанавливаемые профилем `custom` |
| `featureFlags` | словарь: флаг → логическое значение | Нет | Логические переключатели возможностей |
| `defaultStore` | строка | Нет | Запасное хранилище компьютера при выборе корня |
| `openers` | словарь: ID инструмента → настройки | Нет | Инструменты открытия рабочих наборов и способ их запуска |
| `telemetry` | словарь | Нет | Отключение телеметрии, анонимный ID и отметка показа уведомления |

### profile

Набор процессов для `openspec init`. По умолчанию `core`: propose, explore, apply, update, sync и archive. При `custom` вместо этого устанавливается ровно список `workflows`.

### delivery

Форма установки процессов init: навыки, команды или обе формы. По умолчанию `both`.

### workflows

Процессы профиля `custom`; игнорируются при `core`. Допустимые ID: `propose`, `explore`, `new`, `continue`, `apply`, `update`, `ff`, `sync`, `archive`, `bulk-archive`, `verify`, `onboard`.

### featureFlags

Логические переключатели по имени флага. Задаются через `openspec config set featureFlags.<flag> true`. В настоящее время CLI не читает ни один флаг.

### defaultStore

Запасной идентификатор хранилища компьютера при выборе корня. Используется только если корень не определён флагом `--store`, локальной папкой `openspec/` или указателем `store:` проекта. Полный порядок: [выбор корня](../../multi-repo/stores.md#where-artifacts-get-created-when-using-stores).

### openers

Инструменты открытия рабочего набора по ID. Редактируйте `openers` в глобальном `config.json` через `openspec config edit` в терминале.

| Поле | Контракт |
| --- | --- |
| `style` | `workspace-file` или `attach-dirs`. Обязательно для нового инструмента; необязательно для встроенного. |
| `label` | Непустая строка в списке выбора. Для нового инструмента по умолчанию равна ID. |
| `command` | Непустое имя или путь исполняемого файла. Для нового инструмента по умолчанию равен ID. Аргументы передавайте в `args`, а не в этой строке. |
| `args` | Массив строк перед путём рабочего файла или флагами подключения папок. Для нового инструмента по умолчанию `[]`. |
| `attach_flag` | Непустая строка, передаваемая перед каждым путём участника для `attach-dirs`. Для нового инструмента по умолчанию `--add-dir`. Игнорируется при `workspace-file`. |

**Переопределение встроенных инструментов:** `code`, `cursor`, `claude` и `codex` сохраняют поля, которые вы не указали. `args` заменяет весь список аргументов; `[]` очищает его.

**Способы запуска:** `workspace-file` передаёт исполняемому файлу путь созданного `.code-workspace`. `attach-dirs` передаёт пару флаг/путь для каждого участника, включая основного.

**Доступность:** инструменты с `attach-dirs`, включая Claude Code и Codex, по умолчанию отключены. Их нельзя выбрать или сохранить через `--tool`; OpenSpec откажется открывать рабочий набор с уже указанным таким инструментом. Переопределение конфигурации не включает способ запуска `attach-dirs`.

**Проверка:** неизвестные поля, неверные типы и отсутствие `style` у нового инструмента вызывают ошибку при чтении таблицы запуска командой рабочего набора.

Этот пример добавляет VS Code Insiders и передаёт `--new-window` при каждом запуске встроенного VS Code:

```json
{
  "openers": {
    "code-insiders": {
      "style": "workspace-file",
      "label": "VS Code Insiders"
    },
    "code": {
      "args": ["--new-window"]
    }
  }
}
```

Исполняемый файл `code-insiders` или `code` должен быть установлен и доступен через `PATH`.

### telemetry

CLI хранит анонимный ID и отметку о показе первого уведомления. Задайте `telemetry.enabled` равным `false`, чтобы отключить телеметрию. Также подходят `OPENSPEC_TELEMETRY=0` и `DO_NOT_TRACK=1` в окружении.

<a id="example"></a>
## Пример

Заполненный config.json:

```json
{
  "profile": "core",
  "delivery": "both",
  "featureFlags": {},
  "telemetry": {
    "anonymousId": "5f8a2c1e-4b6d-4f9a-9c3d-7e1b2a8d4c6f",
    "noticeSeen": true
  }
}
```
