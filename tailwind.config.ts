import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#0A0A14',
        'bg-surface': '#12121F',
        'accent-cyan': '#5EE7FF',
        'accent-violet': '#8B5CF6',
        'accent-magenta': '#FF4FD8',
        'accent-lime': '#C6FF4F',
        'text-primary': '#F5F5FA',
        'text-muted': '#9A9AB0',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
