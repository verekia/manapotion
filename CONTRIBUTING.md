# Contributing

## Getting started

To get the repository up and running, install the dependencies from the root directory:

```bash
npm i
```

Then build all the packages:

```bash
npm run build
```

You can start the examples by running:

```bash
npm run dev
# or
npm run dev-vue
```

If you want to work on a specific package, open a new terminal, go to the package directory and run this command to watch for file changes:

```bash
npm run dev
```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to format your commit messages. The available scopes are listed in [commitlint.config.js](https://github.com/verekia/manapotion/blob/main/commitlint.config.js).

## Formatting

This project uses [Prettier](https://prettier.io/) to format the code. It is recommended to install the Prettier extension in your code editor. You can also run the formatter manually with:

```bash
npm run format
```

And check for formatting issues with:

```bash
npm run format:check
```
