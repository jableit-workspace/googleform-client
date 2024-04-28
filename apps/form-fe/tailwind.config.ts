import type { Config } from 'tailwindcss';

const config = {
  presets: [require('@repo/ui/tailwind.config')],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx,mdx}',
  ],
} satisfies Config;

export default config;
