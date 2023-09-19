# r3f-webgpu

## Notes

### Set the clear color

`renderer.setClearColor(0x000000, 0)`

### Only works in development mode

Blocking for production builds:

Nodes module uses class names to register nodes (addNodeClass) which crashes in production
https://github.com/mrdoob/three.js/issues/26518

### Drei helpers support

- ✅ OrbitControls
- ❌ useTexture https://github.com/pmndrs/drei/issues/1653

### Performance

It seems like WebGPU struggles to initialize the content of the scene more than WebGL. On a M1 Macbook Pro:

- Rendering 100 boxes with WebGPU takes 40 seconds (freezes the tab).
- Rendering 10.000 boxes with WebGL takes 2 seconds (runs at 5fps).
