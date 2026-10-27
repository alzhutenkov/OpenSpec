<!-- translation-source: docs-lab/reference/schemas/index.md -->
> Оригинал: [docs-lab/reference/schemas/index.md (английский)](../../../../../docs-lab/reference/schemas/index.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/schemas/index.md).

<a id="overview"></a>
# Обзор

> все доступные схемы рабочего процесса и артефакты, которые они определяют.

<!-- В этой группе указаны форматы. Как схемы формируют артефакты и как их
изменить или написать один — это работа custom/schemas.md. -->

Схема определяет, какие артефакты создает предложение по изменению и в каком порядке. На диске это папка с файлом schema.yaml. Каждое поле этого файла находится на странице [schema.yaml](schema-yaml.md).

<a id="available-schemas"></a>
## Доступные схемы.

В комплект поставки CLI входит одна схема:

|Схема|Артефакты|
|---|---|
|[управляемый спецификацией](spec-driven/index.md) (по умолчанию)|`proposal`, `specs`, `design`, `tasks`|

проект может добавлять свои собственные схемы, а машина может переопределять их глобально. Где находятся эти папки и какая копия выиграет, находится в разделе [Location](schema-yaml.md#location) файла schema.yaml.

В вашем терминале [`openspec schemas`](../cli.md#openspec-schemas) печатает каждую схему, которую может видеть ваш проект.
