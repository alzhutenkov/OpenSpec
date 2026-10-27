<!-- translation-source: docs-lab/reference/configuration/stores.md -->
> Оригинал: [docs-lab/reference/configuration/stores.md (английский)](../../../../../docs-lab/reference/configuration/stores.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/reference/configuration/stores.md).

> [!NOTE]
> Оригинал этой страницы ещё не завершён. Ниже переведён весь имеющийся текст; недостающие разделы не дописывались.

<a id="stores"></a>
# Хранилища

> файлы, лежащие в основе хранилищ с несколькими репозиториями: registry.yaml и store.yaml, а также корень, который использует команда.

<!-- Заготовка: только заголовки. Beta, как и весь раздел нескольких репозиториев. Файлы обслуживаются программой, а не редактируются вручную; документация нужна для их проверки и восстановления. Понятие и рабочий процесс описаны в multi-repo/stores.md. Порядок выбора корня задаёт src/core/root-selection.ts: флаг --store, затем ближайший родительский openspec/, затем указатель store: из openspec/ с одной конфигурацией, затем глобальный defaultStore, иначе ошибка. Эта страница описывает всю последовательность, включая обычный случай ближайшего openspec/; обзор раздела только ссылается сюда. Расположение задано в store/foundation.ts: registry.yaml в <dataDir>/stores/ (~/.local/share/openspec/stores/); store.yaml в .openspec-store/store.yaml каждого рабочего каталога. Сюда ведёт термин «OpenSpec root» глоссария. -->

<a id="registryyaml"></a>
## registry.yaml

## store.yaml

<a id="locations"></a>
## Расположение

<a id="root-resolution"></a>
## Корневое разрешение
