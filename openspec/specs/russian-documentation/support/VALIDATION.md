# Сверка русского комплекта

Дата: 2026-10-27. Сверка проведена агентом по [актуальной SDD](../spec.md).

В комплекте 83 исходных документа. Для каждого действует соответствие `docs/ru/<source>`: 65 полных оригиналов имеют статус `reviewed`, 18 незавершённых оригиналов имеют статус `source-incomplete`. Сверенная версия источников: `6d04a1b58dedc95729d34e4f223d9d483aae210a`. Изменение изображения в блоке русского входа английского README исключается из сравнения его основного содержания.

## Результат

| Объект сверки | Результат |
|---|---|
| Полнота набора | Все 83 источника имеют отдельный перевод; пропусков и дубликатов нет |
| Дерево файлов | Исходные имена, регистр и вложенность сохранены; все 8 корневых документов находятся непосредственно в `docs/ru/` |
| Русский README | Полный перевод корневого README с исходными разделами, примерами, раскрывающимися блоками и навигацией; служебное дополнение — отдельная ссылка на SDD |
| Структура всех 83 страниц | Совпали уровни и порядок заголовков, элементы списков, строки и столбцы таблиц, раскрывающиеся блоки и ограждения примеров |
| Ссылки и изображения | Переходы перенаправлены на новые пути; локальных битых ссылок, неверных якорей и ошибок регистра нет |
| Технические обозначения | Inline-код и нормативные слова сохранены; восстановлены имена и отступы каталогов в примерах |
| Команды | Сверены с исходными блоками без поясняющих комментариев; исполняемый текст сохранён |
| Английские оригиналы | Содержимое исходных страниц сохранено; правка английского README ограничена ресурсом кнопки в отмеченном блоке |
| Правила и сведения о переводе | Реестр, глоссарий, пояснения и этот отчёт находятся вне пересоздаваемого `docs/ru/` |
| Проверка навигации и версий | 0 ошибок; 18 допустимых предупреждений о незавершённых оригиналах |
| Служебная проверка путей | 13 сценариев вспомогательного инструмента прошли, включая путь с пробелами, CRLF и зеркальные пути корневых файлов |

Исходный README переведён и сверен заново. Остальные переводы сохранены с исправлениями путей, ссылок и технических обозначений. Первый проход большинства текстов ранее выполнялся с Google Translate по согласованной области публичных Markdown-источников. Машинная проверка структуры не заменяет редакторскую оценку языка.

## Ограничения оригиналов

Следующие страницы не завершены в исходном проекте. Весь доступный текст переведён; пометки сохранены на страницах и в реестре:

- [docs-lab/customize/skills.md](../../../../docs/ru/docs-lab/customize/skills.md).
- [docs-lab/guides/apply.md](../../../../docs/ru/docs-lab/guides/apply.md).
- [docs-lab/guides/change-course.md](../../../../docs/ru/docs-lab/guides/change-course.md).
- [docs-lab/guides/concepts.md](../../../../docs/ru/docs-lab/guides/concepts.md).
- [docs-lab/guides/examples.md](../../../../docs/ru/docs-lab/guides/examples.md).
- [docs-lab/guides/existing-codebases.md](../../../../docs/ru/docs-lab/guides/existing-codebases.md).
- [docs-lab/guides/explore.md](../../../../docs/ru/docs-lab/guides/explore.md).
- [docs-lab/guides/review-the-plan.md](../../../../docs/ru/docs-lab/guides/review-the-plan.md).
- [docs-lab/guides/teams.md](../../../../docs/ru/docs-lab/guides/teams.md).
- [docs-lab/help/faq.md](../../../../docs/ru/docs-lab/help/faq.md).
- [docs-lab/help/legacy/migration.md](../../../../docs/ru/docs-lab/help/legacy/migration.md).
- [docs-lab/help/troubleshooting.md](../../../../docs/ru/docs-lab/help/troubleshooting.md).
- [docs-lab/reference/architecture/design-decisions.md](../../../../docs/ru/docs-lab/reference/architecture/design-decisions.md).
- [docs-lab/reference/architecture/index.md](../../../../docs/ru/docs-lab/reference/architecture/index.md).
- [docs-lab/reference/architecture/workflow-runs.md](../../../../docs/ru/docs-lab/reference/architecture/workflow-runs.md).
- [docs-lab/reference/configuration/environment-variables.md](../../../../docs/ru/docs-lab/reference/configuration/environment-variables.md).
- [docs-lab/reference/configuration/stores.md](../../../../docs/ru/docs-lab/reference/configuration/stores.md).
- [docs-lab/start/overview.md](../../../../docs/ru/docs-lab/start/overview.md).

Эти ограничения не препятствуют приёмке перевода доступного текста. После обновления оригиналов агент повторно сверяет затронутые страницы. Пропуски перевода, отставание, неверные версии и битые ссылки остаются ошибками при любом статусе оригинала.

## Границы сверки

Фактическая среда: macOS, Node.js v25.1.0. Работа на Windows и Linux отдельным запуском не подтверждалась; точный регистр, CRLF и пути с пробелами проверены локально. Команды установки, удаления и публикации из примеров не выполнялись. Внешние сетевые ресурсы не проверялись на доступность. Сайт не публиковался.

Архив [первоначального изменения](../../../changes/archive/2026-10-27-add-russian-documentation/tasks.md) отражает прежнюю структуру. Для повторного создания комплекта действуют [текущие требования](../spec.md) и [правила перевода](TRANSLATION_RULES.md). Порядок получения исходных изменений: [UPSTREAM_SYNC.md](UPSTREAM_SYNC.md).
