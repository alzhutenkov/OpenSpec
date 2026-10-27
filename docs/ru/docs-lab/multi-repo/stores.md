<!-- translation-source: docs-lab/multi-repo/stores.md -->
> Оригинал: [docs-lab/multi-repo/stores.md (английский)](../../../../docs-lab/multi-repo/stores.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs-lab/multi-repo/stores.md).

<a id="stores-beta"></a>
# Хранилища (beta)

> Планируйте изменения между репозиториями: одно хранилище, много репозиториев.

Обычно OpenSpec находится внутри одного репозитория: папка `openspec/` лежит рядом с кодом, который описывают планы. Хранилище выносит эту папку в отдельный репозиторий, общий для нескольких репозиториев кода.

После однократной настройки на каждом компьютере команды `status`, `new change`, `archive` и другие могут работать с хранилищем из любого каталога.

```
         team-plans  (хранилище: OpenSpec в отдельном репозитории)
         ├── .openspec-store/store.yaml   the store's name
         └── openspec/
             ├── specs/
             └── changes/
                   ▲
                   │ настройка один раз на компьютере,
                   │ совместная работа через push и clone
     ┌─────────────┼─────────────┐
     │             │             │
 web-app       api-server     mobile-app
(репозиторий кода)   (репозиторий кода)    (репозиторий кода)
```

Хранилище передаётся через Git так же, как код: вы сами создаёте коммиты, отправляете и получаете изменения, проверяете их. Для спецификаций и изменений используются те же ветки и запросы на слияние, что и для кода.

<a id="when-you-need-one"></a>
## Когда нужно хранилище

Два частых случая:

- **Frontend и backend в отдельных репозиториях:** одна возможность затрагивает оба, а плану нужно единое место вместо двух отдельных частей.

  ```
        shop-plans  (хранилище)
        └── openspec/changes/add-discounts/    one plan for the feature
                  ▲
        ┌─────────┴─────────┐
        │                   │
    storefront             api
  (репозиторий frontend)     (репозиторий backend)
  ```

- **Один продукт, несколько клиентских репозиториев:** Android, iOS и веб-версия выпускаются из своих репозиториев, но должны вести себя одинаково. Спецификация описывает поведение, поэтому одна подходит всем трём реализациям.

  ```
          product-specs  (хранилище)
          └── openspec/specs/checkout/spec.md    the expected behavior
                    ▲
      ┌─────────────┼─────────────┐
      │             │             │
  android-app    ios-app       web-app
  (репозиторий кода)   (репозиторий кода)   (репозиторий кода)
  ```

Можно использовать несколько хранилищ, но рекомендуется сохранять их количество небольшим.

<a id="set-up-a-store"></a>
## Настройте хранилище

Один участник создаёт хранилище, остальные подключаются к нему.

1. **Создайте хранилище** один раз на команду. Выполните `openspec store setup` и ответьте на вопросы:

   ```bash
   # запускать откуда угодно; он спрашивает, что создавать и где
   openspec store setup
   ```

   Команда задаёт три вопроса:

   - **Имя хранилища:** `team-plans`.
   - **Где разместить хранилище?** Предложено `~/openspec/<name>`. Нажмите Enter или введите другой путь.
   - **Создать хранилище?** Проверьте предлагаемые действия и ответьте `Yes`.

   Затем команда сообщит, что создала:

   ```yaml
   Store ready: team-plans
   Location: ~/openspec/team-plans
   OpenSpec root: ready
   Registry: registered

   Next: run normal OpenSpec commands against this store, for example:
     openspec new change <change-id> --store team-plans
   Share this store by committing and pushing it like any Git repo.
   ```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-004).


2. **Отправьте хранилище на свой Git-хостинг.** Сначала создайте там пустой репозиторий `team-plans`. Setup не добавляет remote: свяжите хранилище с этим репозиторием и выполните push:

   ```bash
   # подключите хранилище к пустому репозиторию на вашем хосте git.
   cd ~/openspec/team-plans
   git remote add origin git@github.com:acme/team-plans.git

   # опубликовать
   git push -u origin main
   ```

3. **Подключитесь к хранилищу** один раз на компьютер каждого участника:

   ```bash
   # установите магазин на свою машину.
   git clone git@github.com:acme/team-plans.git ~/openspec/team-plans

   # сообщить OpenSpec, где он живет.
   openspec store register ~/openspec/team-plans
   ```

   ```yaml
   Store registered: team-plans
   Location: /Users/you/openspec/team-plans
   OpenSpec root: ready
   Registry: registered
   ```

   Регистрация сообщает компьютеру расположение хранилища. Его имя уже сохранено в `.openspec-store/store.yaml` и включено в Git. Setup зарегистрировал копию создателя; этот шаг нужен только для клонированных копий.

4. **Проверьте результат** из любого каталога:

   ```bash
   # любая команда OpenSpec достигает хранилища по имени.
   openspec status --store team-plans
   ```

   ```yaml
   Using OpenSpec root: team-plans (/Users/you/openspec/team-plans)
   No active changes. Create one with: openspec new change <name> --store team-plans
   ```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-005).


<a id="types-of-setups"></a>
## Варианты настройки

OpenSpec поддерживает три варианта. Далее используются эти имена:

- **repo-local:** OpenSpec внутри репозитория без хранилища. Вариант по умолчанию.
- **store-only:** в репозитории нет собственных спецификаций и изменений; всё находится в хранилище.
- **store-optional:** у проекта есть собственная папка `openspec/`, а к хранилищу он обращается по запросу.

<a id="the-default-openspec-inside-your-repo-repo-local"></a>
### По умолчанию: OpenSpec внутри репозитория (`repo-local`)

`openspec init` создаёт `openspec/` рядом с кодом. Спецификации и изменения репозитория находятся там; хранилище не участвует. Этот вариант описан в [настройке проекта](../start/setup.md). Большинству проектов другого не требуется.

```
web-app  (репозиторий кода)
└── openspec/
    ├── specs/
    └── changes/
```

<a id="openspec-outside-your-repo-in-a-store-store-only"></a>
### OpenSpec вне репозитория, в хранилище (`store-only`)

Репозиторий не хранит собственных спецификаций и изменений. Все планы находятся в хранилище; одна строка конфигурации связывает их с репозиторием.

Подходит, когда одна команда разрабатывает все репозитории и планирует в одном месте. Так устроены [примеры выше](#when-you-need-one).

```
team-plans  (хранилище)
└── openspec/
    ├── specs/       the repo's specs live here
    └── changes/     its changes too
          ▲
          │ store: team-plans   (строка связи)
web-app  (репозиторий кода)
└── openspec/
    └── config.yaml    nothing else
```

<a id="openspec-in-your-repo-and-in-a-store-store-optional"></a>
### OpenSpec в репозитории и хранилище (`store-optional`)

Репозиторий использует repo-local для собственной работы, а хранилище содержит общие спецификации и изменения. Внутри репозитория OpenSpec выбирает локальную `openspec/` и обращается к хранилищу только с флагом `--store`.

Подходит, если OpenSpec использовался до появления хранилища или в основном независимый репозиторий лишь иногда участвует в общей работе.

```
team-plans  (хранилище)
└── openspec/          the shared specs and changes
          ▲
          │ только с флагом --store team-plans
web-app  (репозиторий кода)
└── openspec/          this repo's own
    ├── config.yaml
    ├── specs/
    └── changes/
```

Можно начать с repo-local, затем перенести спецификации и изменения в хранилище. См. [перенос спецификаций и изменений репозитория](#move-a-repos-specs-and-changes-into-the-store).

<a id="where-artifacts-get-created-when-using-stores"></a>
## Где создаются артефакты при использовании хранилищ

Место создания артефактов зависит от варианта настройки:

- **store-only:** проект записывает всё в хранилище. Это задаёт строка `store:` ниже.
- **store-optional:** артефакты создаются в проекте, если вы не назвали хранилище в запросе и не передали `--store` для этого изменения. При выборе хранилища агент сохраняет флаг для остальных шагов процесса.

OpenSpec записывает артефакты либо в `openspec/` проекта, либо в `openspec/` хранилища. Выбирается первый подходящий вариант в следующем порядке:

1. **Флаг команды `--store <id>`.** Всегда имеет приоритет из любого каталога.
2. **Папка `openspec/` проекта.** Если есть собственные `specs/` или `changes/`, OpenSpec использует их.
3. **Строка `store:` проекта.** Задаёт хранилище в варианте store-only.
4. **`defaultStore` компьютера.** Запасной вариант, если ничего выше не подошло.

При выборе хранилища OpenSpec печатает `Using OpenSpec root: ...` перед результатом команды.

<a id="the-store-line-store-only-projects"></a>
### Строка `store:` (проекты store-only)

Добавьте строку в `openspec/config.yaml` проекта:

```yaml
# веб-приложение/openspec/config.yaml
store: team-plans
```

Теперь все команды, запускаемые вами или агентом внутри проекта, используют хранилище без отдельного флага:

```bash
# внутри веб-приложения, подключено
openspec status
```

```yaml
Using OpenSpec root: team-plans (/Users/you/openspec/team-plans)
No active changes. Create one with: openspec new change <name> --store team-plans
```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-006).


- **Без строки:** обычная команда в проекте store-only остановится с ошибкой и списком зарегистрированных хранилищ.
- **Добавьте в Git:** участники получат строку при клонировании проекта. Им всё равно нужно зарегистрировать хранилище на своём компьютере ([шаг 3 настройки](#set-up-a-store)); иначе OpenSpec выдаст ошибку с указанием регистрации.
- **При наличии папок:** если в проекте также есть `specs/` или `changes/`, OpenSpec использует их и проигнорирует строку с предупреждением.

<a id="install-integrations-in-a-store-only-repo"></a>
### Установите интеграции в репозитории store-only

Запустите init в корне репозитория кода, чтобы установить файлы ИИ-инструментов, сохранив планирование в хранилище:

```bash
# внутри веб-приложения, в корне репозитория.
openspec init --tools claude
```

- **Файлы интеграции:** записываются в репозиторий кода.
- **`openspec/config.yaml`:** сохраняется побайтово, включая строку `store:`.
- **`openspec/specs/` и `openspec/changes/`:** в репозитории кода не создаются.

OpenSpec отклоняет запуск из вложенного каталога репозитория кода. Выполняйте команду в корне репозитория.

Здесь также отклоняется `--language`: язык задаётся конфигурацией внешнего хранилища. Выполните init в корне хранилища или отредактируйте его конфигурацию напрямую.

<a id="defaultstore-on-your-machine"></a>
### `defaultStore` компьютера

Задайте один раз, если все ваши проекты используют одно хранилище. OpenSpec обращается к нему при отсутствии флага, локальной `openspec/` и строки `store:`:

```bash
# use team-plans whenever других файлов нет names a store
openspec config set defaultStore team-plans

# отменить это
openspec config unset defaultStore
```

**Команды, работающие локально:** `init`, `update`, `templates`, `schemas` и подкоманды `openspec schema` используют только текущий каталог и не принимают `--store`.

<a id="move-a-repos-specs-and-changes-into-the-store"></a>
## Перенесите спецификации и изменения репозитория в хранилище

Чтобы перейти с repo-local на store-only:

1. Переместите содержимое `openspec/specs/` и `openspec/changes/` репозитория в соответствующие папки хранилища.
2. Удалите опустевшие папки, оставив в `openspec/` репозитория только `config.yaml`.
3. Добавьте строку `store:` в этот `config.yaml`.

Теперь `openspec status` внутри репозитория начинает вывод с `Using OpenSpec root: team-plans`.

<a id="work-in-the-store"></a>
## Работайте в хранилище

Процессы для вас и агента не меняются: propose, apply и archive работают как прежде. Отличается только место создания артефактов, описанное [выше](#where-artifacts-get-created-when-using-stores).

Созданное внутри репозитория store-only изменение попадает в хранилище:

```bash
# внутри веб-приложения; магазин: линия направляет это в планы команды
openspec new change add-login
```

```yaml
Using OpenSpec root: team-plans (/Users/you/openspec/team-plans)
Created change 'add-login' at /Users/you/openspec/team-plans/openspec/changes/add-login/
Schema: spec-driven
Next: openspec status --change add-login --store team-plans
```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-007).


- **Расположение:** в репозитории хранилища, отдельно от кода.
- **Совместная работа:** изменение существует только в вашей рабочей копии до коммита и push репозитория хранилища. Остальные увидят его после pull. То же относится ко всем создаваемым артефактам.
- **Пути в документации:** путь `openspec/` в настройке с хранилищем означает папку самого хранилища.

Если артефакты появились не там, где вы ожидали, `openspec doctor` проверит настройку без изменений файлов и предложит исправление для каждого замечания:

```bash
# проверить текущий корень и его хранилища
openspec doctor
```

```yaml
Doctor

Root
  Location: /Users/you/openspec/team-plans
  OpenSpec root: ok
  Store: team-plans (metadata ok)

References
  (none declared)
```

[Русское пояснение подписей и сообщений](../../../../openspec/specs/russian-documentation/support/EXAMPLE_NOTES.md#example-008).


`openspec context` перечисляет корень и хранилища текущего каталога, если нужна та же картина без проверок.

Чтобы открыть хранилище и репозиторий в одном окне редактора для доступа агента к обоим, см. [Рабочие наборы (beta)](worksets.md).

<a id="read-specs-from-another-store"></a>
## Читайте спецификации другого хранилища

Репозиторий может сохранять собственную `openspec/` и давать агенту читать спецификации другого хранилища. Укажите его в `references:` файла `openspec/config.yaml` репозитория:

```yaml
# api-server/openspec/config.yaml
references:
  - team-plans
```

Ссылочные хранилища доступны только для чтения. Работа остаётся в вашем репозитории; ссылка меняет лишь инструкции, получаемые агентом.

При создании артефакта инструкции получают индекс спецификаций ссылочного хранилища с краткими описаниями и точными командами получения:

```xml
<referenced_stores>
<!-- Read-only upstream context. Fetch what you need; cite what you use. -->
Store team-plans (/Users/you/openspec/team-plans):
  - payments: Rules for charging and refunding customers.
  Fetch: openspec show <spec-id> --type spec --store team-plans
</referenced_stores>
```

Ссылка также может содержать URL клонирования для компьютеров, на которых хранилища ещё нет:

```yaml
references:
  - team-plans
  - { id: design-system, remote: "git@github.com:acme/design-system.git" }
```

Если URL задан, `openspec doctor` предлагает готовую к копированию команду исправления для отсутствующего хранилища:

```yaml
# вывод упакован по размеру
References
  - team-plans: ok (/Users/you/openspec/team-plans)
  - design-system: Referenced store 'design-system' is not registered on this machine.
    Fix: git clone -- git@github.com:acme/design-system.git '/Users/you/openspec/design-system' &&
         openspec store register '/Users/you/openspec/design-system' --id design-system
```

<a id="beta-limits"></a>
## Ограничения beta

- **Формат может меняться:** имена команд, флаги и форматы файлов могут меняться между выпусками. Перечитайте страницу после обновления.
- **Синхронизация отсутствует намеренно:** OpenSpec не выполняет clone, pull или push. До pull устаревшая рабочая копия показывает старые спецификации; ссылки читают текущее содержимое диска.
- **Одна рабочая копия на имя хранилища:** регистрация второй папки под занятым именем завершается ошибкой с подсказкой сначала выполнить `openspec store unregister`.
