# Polished Quartz

Polished Quartz is a template project for creating new Minecraft: Bedrock Edition add-ons. It currently supports Minecraft 1.20.30+, and will likely need some changes to support 1.21+.

## Add-on development setup

Install the [prerequisites](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted#prerequisites) once for your computer, that's it!

## Installation

1. Copy this folder
1. Open a terminal and navigate to this folder
1. Replace **`__todo__`** values:
   1. Folder named `behavior_packs/__todo__` should change to your add-on name, e.g. `behavior_packs/marble`
   1. [`gulpfile.js`](./gulpfile.js) should match add-on name
   1. [`manifest.json`](./behavior_packs/__todo__/manifest.json)
      1. `name` is how the name appears in Minecraft, e.g. `Cotta Game`
      1. `description` is additional information in Minecraft, e.g. `Break the terracotta before you're killed by zombies!`
      1. `uuid` is copied from [UUID generator](https://www.uuidgenerator.net/).
      1. Delete any comments in `manifest.json`
1. Run `npm i`
1. Follow [chapter 2 of the official guide](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted#chapter-2-lets-test-the-parts-of-our-project):
   1. Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in PowerShell
   1. Run `npm run build`
   1. Open Minecraft (Bedrock Edition, not Java Edition)
   1. Add the new behavior pack to a superflat world!

When you load the world, you should teleport to a cobblestone box and be asked to break the terracotta!

## Features

Automated tests with [vitest](https://vitest.dev/). Note since we don't have the Minecraft source code, we must be creative with our imports. We're copying the imports that we need for utility functions into a local file and converting them to interfaces. This way, Vitest doesn't worry about missing implementation details.

## References

- [Build a gameplay experience with TypeScript - Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted)
