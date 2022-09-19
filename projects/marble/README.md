## Project Marble

Mastering the initalization process for new Minecraft add-ons. Specifically, this is for add-ons that use TypeScript along with molang, mcfunction, and JSON.

Once you set up a project using this process, you should have a very smooth time!

Note this guide is meant for beginners to Minecraft add-on development, but people familiar with TypeScript, npm, and Gulp.

## Project initialization steps

1. Copy and commit code from [template folder](https://github.com/mark-wiemer/minecraft-bedrock/tree/0ee386414eae9672a39dbcd1bfb973605614dd2b/projects/marble) (adapted from [official docs](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted#getting-started))
1. Run `npm i`
1. Replace **`__todo__`** values:
   1. Folder named `behavior_packs/__todo__` should change to your add-on name, e.g. `behavior_packs/marble`
   1. `launch.json` should match add-on name exactly
   1. `gulpfile.js` should match add-on name exactly
   1. `manifest.json`
      1. `name` is how the name appears in Minecraft, e.g. `Project Marble`
      1. `description` is additional information in Minecraft, e.g. `Mark's test project to learn`
      1. `uuid` is copied from [UUID generator](https://www.uuidgenerator.net/).
      1. Delete any comments in `manifest.json`
   1. `main.ts` can be anything, e.g. `my first project!!!`
1. In PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to [allow .ps1 scripts](https://stackoverflow.com/a/68505597/)
1. Run `npm run watch` to start compilation and auto-updates
1. Open Minecraft
1. Add this add-on to any world with `GameTest framework` experiment enabled

- Expected: Should say "Hello my first project!!!" (or whatever you replaced `__todo__` with)
