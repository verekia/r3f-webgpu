# r3f-webgpu

## How to use

`npm i` or `yarn` or `bun i`

Then `npm run dev` or `yarn dev` or `bun dev`

## Bugs

- Casting shadows from a Directional Light crashes

https://github.com/mrdoob/three.js/blob/89e698f56604741244a2f7746edc0d876cec83ed/examples/jsm/nodes/accessors/TextureNode.js#L52

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

- Only works in development mode:

Nodes module uses class names to register nodes (addNodeClass) which crashes in production
https://github.com/mrdoob/three.js/issues/26518

### Drei helpers support

- ✅ OrbitControls
- ✅ useTexture
- ✅ Instances

### Performance

It seems like WebGPU struggles to initialize the content of the scene more than WebGL. On a M1 Macbook Pro:

- Rendering 100 boxes with WebGPU takes 40 seconds (freezes the tab).
- Rendering 10.000 boxes with WebGL takes 2 seconds (runs at 5fps).

## Notes

### Set the clear color

`renderer.setClearColor(0x000000, 0)`

### Other way to set up the canvas (from Cody)

```jsx
<Canvas
  onCreated={state => {
    if ('gpu' in navigator) {
      state.set({ frameloop: 'never' })
      import('three/addons/renderers/webgpu/WebGPURenderer.js').then(
        async ({ default: WebGPURenderer }) => {
          const canvas = state.gl.domElement
          const gl = await new WebGPURenderer(canvas).init()
          state.set({ frameloop: 'always', gl })
        }
      )
    }
  }}
/>
```
