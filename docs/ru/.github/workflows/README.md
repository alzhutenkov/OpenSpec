<!-- translation-source: .github/workflows/README.md -->
> Оригинал: [.github/workflows/README.md (английский)](../../../../.github/workflows/README.md). Проверенная версия: [6d04a1b58ded](https://github.com/alzhutenkov/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/.github/workflows/README.md).

<a id="github-workflows"></a>
# Рабочие процессы GitHub

<a id="testing-ci-locally"></a>
## Локальное тестирование CI

протестируйте рабочие процессы действий GitHub локально с помощью [act (английский)](https://nektosact.com/):

```bash
# протестируйте все PR-проверки.
act pull_request

# проверить конкретное задание.
act pull_request -j nix-flake-validate

# Пробный прогон, чтобы посмотреть, что будет выполнено.
act pull_request --dryrun
```

файл `.actrc` настраивает действие для использования соответствующего образа Docker.
