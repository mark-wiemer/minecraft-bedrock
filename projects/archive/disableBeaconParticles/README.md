## Disable beacon particles

Disables only beacon particles. These are the most annoying particles as they follow the player around. All other particles will appear as usual.

## Get started with project development

Do these steps once for your computer, that's it!

1. Install `NodeJS`, which comes with `npm`.
1. Optionally, install `VS Code` for easy development.

## Project initialization steps

Do these steps every time you want to create a new add-on:

1. Run `npm i`
1. In PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to [allow .ps1 scripts](https://stackoverflow.com/a/68505597/)
1. Run `npm run watch` to start compilation and auto-updates
1. Open Minecraft
1. Add this add-on to any world

- Expected: When enabling a beacon, no particles are emitted around the player.
