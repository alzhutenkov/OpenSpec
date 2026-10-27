<!-- translation-source: docs-lab/reference/configuration/index.md -->
> Оригинал: [docs-lab/reference/configuration/index.md (английский)](../../../../../docs-lab/reference/configuration/index.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/configuration/index.md).

<a id="overview"></a>
# Обзор

> каждый файл и настройка, которые меняют поведение OpenSpec и местонахождение каждого из них.

|Файл|Живет в|Элементы управления|
| --- | --- | --- |
|[Конфигурация проекта (config.yaml)](config-yaml.md)|`openspec/config.yaml`|Схема, контекст и правила, которые планирует этот проект.|
|[Изменить метаданные (.openspec.yaml)](change-metadata.md)|`openspec/changes/<name>/.openspec.yaml`|исключения схемы рабочего процесса, цели, области действия и спецификации для одного изменения.|
|[Настройки CLI (config.json)](config-json.md)|`~/.config/openspec/config.json` (Windows различается)|Как openspec CLI ведет себя на вашем компьютере|
|переменные среды.|ваша оболочка или среда CI.|отказ от телеметрии и местонахождение каталогов конфигурации и данных.|
|Хранилища|`~/.local/share/openspec/stores/` (Windows различается)|реестр и метаданные, лежащие в основе хранилищ с несколькими репозиториями.|
