# Результаты проверки русской документации

Дата: 2026-10-27. Проверенная версия оригиналов: `6d04a1b58dedc95729d34e4f223d9d483aae210a`.

Переведён весь имеющийся текст 83 источников из [реестра](translation-manifest.json). 65 записей имеют статус `reviewed`, 18 имеют статус `source-incomplete`. Приёмка перевода выполнена по обновлённому SDD: незавершённость оригиналов явно отмечена и допускается как предупреждение.

Изменение [add-russian-documentation](../../openspec/changes/archive/2026-10-27-add-russian-documentation/tasks.md) архивировано 2026-10-27. Все 10 требований синхронизированы с [основной спецификацией](../../openspec/specs/russian-documentation/spec.md).

## Что проверено локально

Среда: macOS, Node.js `v25.1.0`.

| Проверка | Результат |
|---|---|
| Область источников, точные пары и версии Git | 83 записи; нет пропусков, дубликатов или отставания |
| Локальные ссылки, изображения, якоря, регистр и русские переходы | Ошибок нет |
| Inline-код, структура ограждённых блоков, `SHALL` и `MUST` | Сверены со всеми 83 оригиналами; потерь не найдено |
| Команды в блоках bash/sh/shell/npm/PowerShell/console | Сверены с оригиналами без поясняющих комментариев; различий нет |
| Реальные сообщения CLI | 36 блоков сохранены в исходном виде |
| Русские пояснения к выводу и схемам | 61 пояснение, ссылки рядом с 63 примерами |
| Сохранность английских документов | Только README отличается от HEAD; после исключения блока кнопки его текст совпадает с HEAD |
| SVG кнопки | Корректный XML; локальная ссылка на русский вход |
| `node --test scripts/check-russian-docs.test.mjs` | 12 тестов прошли |
| `openspec validate russian-documentation --type spec --strict` | Основная спецификация корректна |
| `openspec validate --specs` | 37 спецификаций прошли проверку, ошибок нет |
| `node scripts/check-russian-docs.mjs --strict` | Код 0: ошибок нет, 18 допустимых предупреждений о незавершённых оригиналах |
| Отдельный CI русской документации | Workflow удалён; команды проверки запускаются вручную |

Тесты выполняются во временных Git-репозиториях и проверяют новые и изменённые страницы, переименование, удаление, ошибочные SHA, дубликаты, отсутствующие переводы, регистр, ссылки, якоря, CRLF и путь с пробелами. Тест слияния создаёт две ветки, вызывает конфликт README, разрешает его с сохранением английского обновления и русского блока, затем проверяет обе истории и список затронутых переводов.

Дополнительные тесты подтверждают успешный строгий запуск для страницы со статусом `source-incomplete` и видимой пометкой. Пометка, спрятанная в HTML-комментарии или блоке кода, не засчитывается. Отсутствие пометки или статуса, битая ссылка, отставание и неверный SHA остаются блокирующими ошибками.

Первый проход большей части текста выполнен с помощью Google Translate по ранее согласованной области публичных Markdown-источников. Команды и разметка защищались; после прохода исправлены термины, имена файлов, технические примеры и навигация. Отдельные страницы переведены вручную. Машинная проверка не заменяет редакторскую оценку качества языка.

## Допустимые ограничения оригиналов

В оригиналах следующих страниц есть заглушки, частичные черновики или отложенный текст. Их имеющееся содержимое переведено, состояние явно обозначено:

- [docs-lab/customize/skills.md](docs-lab/customize/skills.md).
- [docs-lab/guides/apply.md](docs-lab/guides/apply.md).
- [docs-lab/guides/change-course.md](docs-lab/guides/change-course.md).
- [docs-lab/guides/concepts.md](docs-lab/guides/concepts.md).
- [docs-lab/guides/examples.md](docs-lab/guides/examples.md).
- [docs-lab/guides/existing-codebases.md](docs-lab/guides/existing-codebases.md).
- [docs-lab/guides/explore.md](docs-lab/guides/explore.md).
- [docs-lab/guides/review-the-plan.md](docs-lab/guides/review-the-plan.md).
- [docs-lab/guides/teams.md](docs-lab/guides/teams.md).
- [docs-lab/help/faq.md](docs-lab/help/faq.md).
- [docs-lab/help/legacy/migration.md](docs-lab/help/legacy/migration.md).
- [docs-lab/help/troubleshooting.md](docs-lab/help/troubleshooting.md).
- [docs-lab/reference/architecture/design-decisions.md](docs-lab/reference/architecture/design-decisions.md).
- [docs-lab/reference/architecture/index.md](docs-lab/reference/architecture/index.md).
- [docs-lab/reference/architecture/workflow-runs.md](docs-lab/reference/architecture/workflow-runs.md).
- [docs-lab/reference/configuration/environment-variables.md](docs-lab/reference/configuration/environment-variables.md).
- [docs-lab/reference/configuration/stores.md](docs-lab/reference/configuration/stores.md).
- [docs-lab/start/overview.md](docs-lab/start/overview.md).

Эти страницы допускаются при приёмке перевода всего доступного текста. В отчёте они сохраняются как `source-incomplete` с `severity: "warning"` и сами по себе не меняют успешный код строгой проверки. Отсутствующий текст не дописывался от имени исходного проекта. После появления нового текста в upstream обычная проверка версий выявит отставание перевода.

## Ручная проверка и ограничения

Приёмка выполняется локально из корня репозитория:

```bash
node scripts/check-russian-docs.mjs --strict
node --test scripts/check-russian-docs.test.mjs
```

Обе команды завершились с кодом 0. Отдельный workflow русской документации удалён. Настройка и прогоны CI не входят в согласованный критерий приёмки. Фактическая среда этого запуска: macOS и Node.js v25.1.0. Работа на Windows, Linux и Node.js 20.19.0 отдельным запуском не подтверждалась; CRLF и пути с пробелами проверены локальными тестами.

Внешние сетевые ссылки не проверялись на доступность. Команды установки, удаления и публикации из переводимых руководств не выполнялись: проверялось соответствие примеров исходным документам. Русская версия сайта не публиковалась. Ошибки или устаревшие утверждения оригиналов не исправлялись в английском дереве; например, расхождение README сайта с docs-lab помечено отдельным примечанием в переводе.

Повторяемые команды и порядок обновления: [UPSTREAM_SYNC.md](UPSTREAM_SYNC.md). Завершённые задачи: [tasks.md (архив)](../../openspec/changes/archive/2026-10-27-add-russian-documentation/tasks.md).
