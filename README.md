# Three + WebGPU issues

## How to use

`npm i` or `yarn` or `bun i`

Then `npm run dev` or `yarn dev` or `bun dev`

## Bugs

### Casting shadows from a Directional Light crashes

To reproduce:

Uncomment `castShadows` in `src/index.tsx`:

```jsx
<directionalLight intensity={1} position={[0, 0, 1]} /* castShadow */ />
```

It crashes on this [line of TextureNode.js](https://github.com/mrdoob/three.js/blob/89e698f56604741244a2f7746edc0d876cec83ed/examples/jsm/nodes/accessors/TextureNode.js#L52).

```
TextureNode.js:52 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'channel')
    at Proxy.getDefaultUV (TextureNode.js:52:12)
    at Proxy.construct (TextureNode.js:87:1)
```

```
    getDefaultUV() {

        return uv( this.value.channel ); ❌

    }
```

### Minified code crashes

Nodes module uses class names to register nodes (addNodeClass) which crashes in production: https://github.com/mrdoob/three.js/issues/26518
