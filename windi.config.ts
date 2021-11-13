import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  theme: {
    extend: {
      width: {
        'card-full': 'calc(100% - 20px)',
        'card-half': 'calc(50% - 20px)',
        'card-1/5': 'calc(20% - 16px)',
        'card-1/4': 'calc(25% - 16px)',
      },
      colors: {
        primary: {
          DEFAULT: '#FF1D6C'
        },
        yellow: {
          DEFAULT: '#FFB72C',
        },
        green: {
          DEFAULT: '#007350',
        },
        gray: {
          light: '#E5E5E5',
          DEFAULT: '#ACACAC',
        },
      },
    },
  },
})
