# React Three Fiber + WebGPU

## How to use

`npm i` or `yarn` or `bun i`

Then `npm run dev` or `yarn dev` or `bun dev`

## Performance

On an M3 Macbook Air:

- Rendering 2000 boxes with WebGL runs at ~30fps.
- Rendering 2000 boxes with WebGPU runs at ~12fps (and shadows have artifacts).
