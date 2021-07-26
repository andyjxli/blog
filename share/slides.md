---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
background: none
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# some information about the slides, markdown enabled
aspectRatio: '16/9'
canvasWidth: 1280
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
---

# Vite 2.0 原理浅析

分享人：andyjxli
<!-- 
<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div> -->
<!-- 
<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div> -->


<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# What is Vite?

Vite (法语意为 "快速的"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- **开发服务器** 它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
- **一套构建指令** 它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

### 特性
- 极速的服务启动
- 轻量快速的热重载
- 按需编译


Read more about [what is Vite?](https://cn.vitejs.dev/)

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
}
</style>

---

# Why is Vite

<div grid="~ cols-2 gap-4">
  <div class="aaa">
    <h3>Webpack</h3>
    <ul style="list-style:none; padding: 0">
      <li style="margin-left: 0">1. 路由、依赖分析</li>
      <li style="margin-left: 0">2. 构建 JS bundle</li>
      <li style="margin-left: 0">3. 服务启动</li>
    </ul>
    <img style="margin-top: 20px" width="500" border="rounded" src="https://ask.qcloudimg.com/http-save/yehe-6282273/e99t6der6y.png?imageView2/2/w/1620">
  </div>
  <div class="aaa">
    <h3>Vite</h3>
    <ul style="list-style:none; padding: 0">
      <li style="margin-left: 0">1. 服务启动</li>
      <li style="margin-left: 0">2. 路由、依赖分析</li>
      <li style="margin-left: 0">3. 加载模块</li>
    </ul>
    <img style="margin-top: 20px" width="500" border="rounded" src="https://ask.qcloudimg.com/http-save/yehe-6282273/9662keq8h2.png?imageView2/2/w/1620">
  </div>
</div>

---

# 服务启动

<div grid="~ cols-2 gap-4">

<div>

```ts {2,6,10-17,24-28}
// 本地开发
yarn dev

import { cac } from 'cac'

const cli = cac('vite')

cli.action(async (root: string, options: ServerOptions & GlobalCLIOptions) => {
    const { createServer } = await import('./server')
    const server = await createServer({
      root,
      base: options.base,
      mode: options.mode,
      server: cleanOptions(options) as ServerOptions
      // ...more config
    })
    await server.listen()
})
```

```ts
1. 通过 cac 创建 vite 命令
2. create server
```

Read more about [Vite start](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/cli.ts#L82)
</div>
<div>


```ts {4|5|6|7|8|9|11-14}
export async function createServer(
  inlineConfig: InlineConfig = {}
): Promise<ViteDevServer> {
   const config = await resolveConfig(inlineConfig, 'serve', 'development')
   const httpServer = await resolveHttpServer(serverConfig, middlewares, httpsOptions)
   const ws = createWebSocketServer(httpServer, config, httpsOptions)
   const watcher = chokidar.watch(path.resolve(root))
   const container = await createPluginContainer(config, watcher)
   const moduleGraph = new ModuleGraph(container)

  httpServer.listen = (async (port: number, ...args: any[]) => {
        await container.buildStart({})
        await runOptimize()
    }) as any
}

```

```ts
1. resolveConfig 解析配置
2. 创建服务
3. 创建 websocket
4. 监听文件变化
5. 创建插件容器
6. 创建依赖关系

```
</div>
</div>

---

# 依赖预编译 runOptimize


<div grid="~ cols-2 gap-4">
<div>
<p>当首次启动 vite 项目时</p>
<img border="rounded" src="https://xmaterial.tu.qq.com/xmaterial/materials/622ae762-edbc-11eb-914b-127efa2986e6-WeChatcec7640ca4ad7e19b708bfdd06422b41.png">
<p>node_modules/.vite</p>
<img border="rounded" src="https://xmaterial.tu.qq.com/xmaterial/materials/be7a3706-edbd-11eb-9ae2-0eb6ff4e323c-22222.png">
</div>

<div>

rumOptimize 内部

```ts
let deps: Record<string, string>, missing: Record<string, string>
if (!newDeps) {
  ;({ deps, missing } = await scanImports(config))
}
```

scanImports 扫描所有需要预编译的文件
```ts
import {  build } from 'esbuild'

export async function scanImports(config: ResolvedConfig): Promise<{
  deps: Record<string, string>
  missing: Record<string, string>
}> {
  let entries = await globEntries('**/*.html', config)

  await Promise.all(
    entries.map((entry) =>
      build({
        entryPoints: [entry],
        bundle: true,
        plugins: [...plugins, plugin],
        ...esbuildOptions
      })
    )
  )
}
```

</div>

</div>

---

# 为什么要依赖预编译

<div grid="~ cols-2 gap-2" m="-t-2">

<div>

<p>1. CommonJS 和 UMD 兼容性:</p>

```js
import {
  require_react
} from "./chunk-KO7G7YGB.js";
import "./chunk-R6I3GLEQ.js";

// dep:react
var react_default = require_react();
export {
  react_default as default
};
```
将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。
</div>

<div>
<p>提升加载性能</p>


```ts
import { debounce } from 'lodash'
```

<br />

<img border="rounded" src="https://ask.qcloudimg.com/http-save/yehe-6282273/ppt18a19wd.png?imageView2/2/w/1620">

<p>lodash 有600多个内置模块</p>
</div>
</div>

---

# 插件机制

> 通过创建一个兼容 Rollup 插件的容器，并扩展属于 Vite 独有的插件机制.

<br />

<div style="display:flex;justify-content: center;margin-top: 40px">
<img width="800" border="rounded" src="https://xmaterial.tu.qq.com/xmaterial/materials/8af4167e-ede8-11eb-ab07-66a089ec5ac7-3333.png">
</div>

---

# 模块热更新

<div grid="~ cols-2 gap-4">

<div>

```ts
// createServer

const watcher = chokidar.watch(path.resolve(root))
const moduleGraph = new ModuleGraph(container)

const server: ViteDevServer = {
  ws,
  // ...
}

// 文件更新
watcher.on('change', async (file) => {
  file = normalizePath(file)
  moduleGraph.onFileChange(file)
  await handleHMRUpdate(file, server)
})
// 新增文件
watcher.on('add', (file) => handleFileAddUnlink(normalizePath(file), server))
// 移除文件
watcher.on('unlink', (file) => handleFileAddUnlink(normalizePath(file), server, true))

```

</div>

<div>

#### 
> 每个文件都有一个模块依赖集合来解释当前模块的依赖关系，例如 main.tsx:

<br />

<img border="rounded" src="https://xmaterial.tu.qq.com/xmaterial/materials/88eae7f8-edee-11eb-a127-924e10ba09ff-graph.png">
</div>

</div>

---

# 模块热更新

<div grid="~ cols-2 gap-4">

<div>

<p>当文件被修改、删除、添加时</p>

```ts {1-3,11-22,23-27}
moduleGraph.onFileChange(file)
updateModules(shortFile, hmrContext.modules, timestamp, server)

function updateModules(
  file: string,
  modules: ModuleNode[],
  timestamp: number,
  { config, ws }: ViteDevServer
) {
  const updates: Update[] = []

  for (const mod of modules) {
    const boundaries = new Set<{ boundary: ModuleNode; acceptedVia: ModuleNode}>()

    updates.push(
      ...[...boundaries].map(({ boundary, acceptedVia }) => ({
        type: `${boundary.type}-update` as Update['type'],
        timestamp,
        path: boundary.url,
        acceptedPath: acceptedVia.url
      }))
    )
  }

  ws.send({
    type: 'update',
    updates
  })
}
```
</div>

<div style="display:flex;align-items: center;justify-content: center;font-size:18px;color:rgb(184, 169, 101);">

1. 更新 moduleGraph 依赖关系
2. 通过变更文件找出更新数据
3. 通过 websocket 通知 client 进行更新，并将更新数据传送过去

</div>
</div>

---

# Vite 2.0 带来的特性

<div style="height: 100%;display:flex;align-items: center;justify-content: center;font-size:18px;color:rgb(184, 169, 101);">

1. 多框架支持 (通过插件支持)
2. 全新插件机制和 API
3. 基于 esbuild 的依赖预编译
4. 更好的 CSS 支持 (通过插件支持)
5. 服务端渲染 (SSR) 支持
</div>