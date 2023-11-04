## Template

`__todo__` replace this readme with a description of your project!

This isn't a project. It's a template for a project that uses TypeScript!

These files are adapted from the [official docs](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted#getting-started).

## Get started with project development

Do these steps once for your computer, that's it!

1. Install `NodeJS`, which comes with `npm`.
1. Optionally, install `VSCode` for easy development.

## Project initialization steps

Do these steps every time you want to create a new add-on:

1. Copy the contents of this folder into a new folder
1. Run `npm i`
1. Replace **`__todo__`** values:
   1. Folder named `behavior_packs/__todo__` should change to your add-on name, e.g. `behavior_packs/marble`
   1. [`launch.json`](./.vscode/launch.json) should match add-on name exactly
   1. [`gulpfile.js`](./gulpfile.js) should match add-on name exactly
   1. [`manifest.json`](./behavior_packs/__todo__/manifest.json)
      1. `name` is how the name appears in Minecraft, e.g. `Project Marble`
      1. `description` is additional information in Minecraft, e.g. `Mark's test project to learn`
      1. `uuid` is copied from [UUID generator](https://www.uuidgenerator.net/).
      1. Delete any comments in `manifest.json`
   1. [`main.ts`](./scripts/main.ts) can be anything, e.g. `my first project!!!`
1. In PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to [allow .ps1 scripts](https://stackoverflow.com/a/68505597/)
1. Run `npm run watch` to start compilation and auto-updates
1. Open Minecraft
1. Add this add-on to any world with `GameTest framework` experiment enabled

- Expected: Should say "Hello my first project!!!" (or whatever you replaced `__todo__` with)
