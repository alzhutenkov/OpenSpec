<!-- translation-source: skills/README.md -->
> Оригинал: [skills/README.md (английский)](../../../skills/README.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/skills/README.md).

<a id="openspec-skills-for-skillssh"></a>
# Навыки OpenSpec для skills.sh

Установите навыки рабочего процесса OpenSpec в любой [skills.sh (английский)](https://skills.sh)-совместимый агент:

```bash
npx skills add Fission-AI/OpenSpec
```

Каждый `openspec-*/SKILL.md` здесь представляет собой один и тот же навык, который
`openspec init` записывает в проект. Навыки управляют `openspec` CLI, поэтому для полной
настройки (CLI + структура проекта `openspec/` + команды со слешем) выполните:

```bash
npx openspec@latest init
```

> Эти файлы генерируются из шаблонов навыков. Не редактируйте их вручную. После изменения шаблона выполните
> `pnpm build && pnpm generate:skills`.
> Тест `skillssh-parity.test.ts` завершается ошибкой при расхождении файлов и шаблонов.
