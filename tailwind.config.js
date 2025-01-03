import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/ts/**/*.tsx',
    './resources/js/**/*.{jsx,tsx}',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {
      colors: {
        'background-primary': '#080807',
        'background-secondary': '#110F0E',
        'background-tertiary': '#1C1917',
        'background-blur': '#0B0A09',
        'content-primary': '#FFFFFF',
        'content-secondary': '#A3A3A3',
        'content-tertiary': '#696663',
        'content-inverse': '#0A0908',
        'accent-orange': '#ED712E',
        'accent-red': '#EB4B5B',
        'accent-blue': '#55A1F2',
        'accent-green': '#44CB93',
        'accent-purple': '#9D8AFE',
        'border-primary': '#161412'
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'heading-medium': '24px',
        'heading-small': '20px',
        'paragraph-large': '16px',
        'paragraph-medium': '14px',
        'paragraph-small': '12px',
        'label-large': '16px',
        'label-medium': '14px',
        'label-small': '12px'
      }
    }
  },
  plugins: [forms, require('daisyui')],
  daisyui: {
    themes: ['dracula', 'light', 'dark']
  }
};
