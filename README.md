## Minecraft Bedrock Edition projects

General repo for add-ons, mods, links, etc. for Minecraft Bedrock

- [Getting started with add-on development for Bedrock Edition](https://learn.microsoft.com/en-us/minecraft/creator/documents/gettingstarted)

### Current work

Using GameTest framework to add functionality, not just tests.

Blocked on Smelly API `npm run compile` command:

```
$  npm run compile "Chat Ranks","Chat Ranks" "Chat Ranks" 5.0.2

> smelly-api@3.0.0 compile
> node build/index.js Chat Ranks,Chat Ranks Chat Ranks 5.0.2

node:events:491
      throw er; // Unhandled 'error' event
      ^

Error: ENOENT: no such file or directory, open 'C:\Users\markw\repos\minecraft-bedrock\behavior-packs\smelly-pack\build\output\Chat Ranks v5.0.2.zip'
Emitted 'error' event on WriteStream instance at:
    at WriteStream.onerror (C:\Users\markw\repos\minecraft-bedrock\behavior-packs\smelly-pack\node_modules\readable-stream\lib\_stream_readable.js:640:52)
    at WriteStream.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\markw\\repos\\minecraft-bedrock\\behavior-packs\\smelly-pack\\build\\output\\Chat Ranks v5.0.2.zip'
}
```
