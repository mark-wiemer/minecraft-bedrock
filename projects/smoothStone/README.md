## Project SmoothStone

Simple test to make sure I can smoothly update projects.

Starts with [Build a gameplay experience with TypeScript](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted), but stops before after finishing Chapter 2.

## Project steps

1. Copy files (except README.md) from [microsoft/minecraft-scripting-samples ts-starter](https://github.com/microsoft/minecraft-scripting-samples/tree/f73eb6c312e183a3f96623e8918c911294d1aafe/ts-starter) into the folder containing this file.
1. In any shell, navigate to this folder and run `npm i`
1. Ensure this file is in a folder named `smoothStone`
1. Update `launch.json` with `"remoteRoot": "${workspaceFolder}/build/behavior_packs/smoothStone",`
1. Update `gulpfile.js` with `const bpfoldername = "smoothStone";`
1. Update `manifest.json` with a unique UUID in the `headers` section. Leave rest of manifest.json the same.
1. In PowerShell, navigate to this folder and run these commands:
   1. `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
   1. `gulp`
1. Rename `behavior_packs/starterbp` to `behavior_packs/smoothStone`
1. Run `gulp` again
1. Create a new world with default settings except:
   1. Custom world name for easy reference
   1. Flat world
   1. Enable GameTest framework
   1. Add this add-on (ID matches manifest.json: `ef68d2e1-f0c7-4092-837c-fe02bb35b0c3`)
   - Expected: World loads, after 5 seconds message appears "[Script Engine]: Hello starter!"
     > Message "At least one of your resources or behavior packs failed to load." may appear. No impact at this point.
1. Add `.gitignore`
1. Commit
1. Update `main.ts` with new message
1. Run `gulp watch` in Bash
1. Leave and re-join world

- Expected: New message is shown, not old message

Status: working!
