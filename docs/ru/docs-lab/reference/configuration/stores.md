<!-- translation-source: docs-lab/reference/configuration/stores.md -->
> Оригинал: [docs-lab/reference/configuration/stores.md (английский)](../../../../../docs-lab/reference/configuration/stores.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/configuration/stores.md).

> [!NOTE]
> Оригинал этой страницы ещё не завершён. Ниже переведён весь имеющийся текст; недостающие разделы не дописывались.

<a id="stores"></a>
# Хранилища

> файлы, лежащие в основе хранилищ с несколькими репозиториями: реестр.yaml и store.yaml, а также корень, который использует команда.

<!-- Скелет: только заголовки. Бета, как и группа с несколькими репозиториями. Машинное обслуживание
вместо редактирования вручную; задокументированы, чтобы читатели могли их проверять и ремонтировать.
концепция и рабочий процесс находятся в multi-repo/stores.md. Корневое разрешение – это
контракт из src/core/root-selection.ts: флаг --store, иначе ближайший предок
openspec/, иначе хранилище openspec/ только для конфигурации: указатель, иначе глобальное
defaultStore, иначе ошибка. Эта страница владеет всей лестницей, включая
повседневный случай (ближайший openspec/выигрыш); Ссылки только на обзор раздела
здесь. Расположение (store/foundation.ts): реестр.yaml по адресу <dataDir>/stores/.
(~/.local/share/openspec/stores/); store.yaml по адресу .openspec-store/store.yaml
внутри каждой кассы. Здесь находится ссылка на строку «корень OpenSpec» глоссария. -->

<a id="registryyaml"></a>
## реестр.yaml

## store.yaml

<a id="locations"></a>
## Расположение

<a id="root-resolution"></a>
## Корневое разрешение
