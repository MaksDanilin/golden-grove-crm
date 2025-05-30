// Instructions: Update tailwind config with Golden Grove brand colors

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Golden Grove brand colors
        golden: {
          50: '#fefaef',
          100: '#fdf2d1',
          200: '#fbe4a2',
          300: '#f6d172',
          400: '#ebcc68', // Primary golden yellow
          500: '#e3d084', // Secondary golden
          600: '#d4ba5a',
          700: '#b19a43',
          800: '#8d7a37',
          900: '#74652f',
        },
        grove: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#9cb2c2', // Brand blue-gray
          600: '#868e96',
          700: '#6c757d',
          800: '#565f69', // Primary gray
          900: '#343a40',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#e8dfd1',
          300: '#d7c8b0',
          400: '#cea49b', // Warm earth tone
          500: '#985540', // Rich earth
          600: '#8b4a36',
          700: '#74402e',
          800: '#5d3525',
          900: '#4a2a1e',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
