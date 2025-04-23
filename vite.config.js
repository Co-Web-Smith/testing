import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(),
    nodePolyfills({
      globals: {
        global: true,
        process: true,
        Buffer: true,
      },
    }),
    // NodeGlobalsPolyfillPlugin({
    //   buffer: true,
    //   process: true,
    // }),
  ],
 

  
});