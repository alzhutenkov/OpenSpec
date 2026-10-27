<!-- translation-source: docs-lab/reference/configuration/index.md -->
> Оригинал: [docs-lab/reference/configuration/index.md (английский)](../../../../../docs-lab/reference/configuration/index.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/configuration/index.md).

<a id="overview"></a>
# Обзор

> Все файлы и настройки, влияющие на поведение OpenSpec, и их расположение.

| Файл | Расположение | Что определяет |
| --- | --- | --- |
| [Конфигурация проекта (config.yaml)](config-yaml.md) | `openspec/config.yaml` | Схема, контекст и правила планирования этого проекта. |
| [Метаданные изменения (.openspec.yaml)](change-metadata.md) | `openspec/changes/<name>/.openspec.yaml` | Схема рабочего процесса, цель, область действия и исключения спецификаций для одного изменения. |
| [Настройки CLI (config.json)](config-json.md) | `~/.config/openspec/config.json` (на Windows путь другой) | Поведение CLI openspec на компьютере. |
| Переменные окружения | Оболочка или среда CI | Отказ от телеметрии и расположение каталогов конфигурации и данных. |
| Хранилища | `~/.local/share/openspec/stores/` (на Windows путь другой) | Реестр и метаданные хранилищ для нескольких репозиториев. |
