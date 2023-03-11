import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx,js,ts}',
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "CryptiPics"
        },
      },
    }),
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      assets: resolve(__dirname, './src/assets'),
      stores: resolve(__dirname, './src/stores'),
      components: resolve(__dirname, './src/components'),
      screens: resolve(__dirname, './src/screens'),
      utils: resolve(__dirname, './src/utils'),
      services: resolve(__dirname, './src/services'),
      hooks: resolve(__dirname, './src/hooks'),
      routes: resolve(__dirname, './src/routes'),
      constants: resolve(__dirname, './src/constants'),
      containers: resolve(__dirname, './src/containers'),
      img: resolve(__dirname, './src/img'),
      types: resolve(__dirname, './src/types')
    }
  },
});