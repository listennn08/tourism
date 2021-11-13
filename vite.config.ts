import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Component from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tourism',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    },
  },
  plugins: [
    Vue(),
    Pages(),
    Component({
      dts: true,
      resolvers: [
        IconsResolver({
          componentPrefix: '',
          customCollections: [
            'custom'
          ]
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: true,
    }),
    WindiCSS(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        'custom': {
          'circle-triangle': `
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" fill="#FF1D6C"/>
              <path d="M17 12.4706L11.5 21.5294H22.5L17 12.4706Z" fill="white"/>
              <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" stroke="#FF1D6C"/>
            </svg>
          `,
          'circle-square': `
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" rx="17" fill="#FFB72C"/>
              <rect x="12.5" y="12.5" width="9" height="9" fill="white"/>
            </svg>
          `,
          'circle-circle': `
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" rx="17" fill="#007350"/>
              <circle cx="17" cy="17" r="5.5" fill="white"/>
            </svg>
          `,
          triangle: `
            <svg width="20" height="16" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L0 16.1905H20L10 0Z" fill="#FF1D6C"/>
            </svg>
          `,
          square: `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#FFB72C"/>
            </svg>
          `,
          circle: `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="11" r="9" fill="#007350"/>
            </svg>
          `,
        }

      }
    })
  ],
  server: {
    proxy: {
      '/v2/Basic': {
        target: 'https://link.motc.gov.tw/',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/v2/Tourism': {
        target: 'https://ptx.transportdata.tw/MOTC/',
        secure: false,
        ws: true,
        changeOrigin: true,
      }
    }
  }
})
