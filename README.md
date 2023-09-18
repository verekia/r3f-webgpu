# r3f-webgpu

## Notes

### Set the clear color

`renderer.setClearColor(0x000000, 0)`

### Only works in develepoment mode

Blocking for production builds:

Nodes module uses class names to register nodes (addNodeClass) which crashes in production
https://github.com/mrdoob/three.js/issues/26518

### Performance

It seems like WebGPU struggles to render more than a dozen boxes. WebGL can render 10.000 on my M1 (at 20fps).
