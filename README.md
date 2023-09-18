# r3f-webgpu

## Notes

### Set the clear color

`renderer.setClearColor(0x000000, 0)`

### Only works in develepoment mode

Blocking for production builds:

Nodes module uses class names to register nodes (addNodeClass) which crashes in production
https://github.com/mrdoob/three.js/issues/26518

### Performance

It seems like WebGPU struggles to initialize the content of the scene more than WebGL. On a M1 Macbook Pro, the WebGPU renderer almost crashes the tab when selecting 50 boxes, and WebGL can quickly render 10.000 boxes (at 20fps).
