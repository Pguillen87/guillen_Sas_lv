import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
        // Cores do tema universo
        universe: {
          "deep-black": "var(--universe-deep-black)",
          "dark-blue": "var(--universe-dark-blue)",
          "space-blue": "var(--universe-space-blue)",
        },
        gold: {
          DEFAULT: "var(--gold-primary)",
          bright: "var(--gold-bright)",
          dim: "var(--gold-dim)",
          glow: "var(--gold-glow)",
        },
        purple: {
          DEFAULT: "var(--purple-primary)",
          bright: "var(--purple-bright)",
          dim: "var(--purple-dim)",
          glow: "var(--purple-glow)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-mystic": "var(--gradient-mystic)",
        "gradient-card": "var(--gradient-card)",
      },
      boxShadow: {
        "glow": "var(--shadow-glow)",
        "card": "var(--shadow-card)",
        "elevated": "var(--shadow-elevated)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "starfield": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50%, -50%)" },
        },
        "gold-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px var(--gold-glow), 0 0 20px var(--gold-glow), 0 0 30px var(--gold-primary)",
          },
          "50%": {
            boxShadow: "0 0 20px var(--gold-glow), 0 0 40px var(--gold-glow), 0 0 60px var(--gold-primary)",
          },
        },
        "purple-pulse": {
          "0%, 100%": {
            opacity: "0.4",
            filter: "blur(2px)",
          },
          "50%": {
            opacity: "0.8",
            filter: "blur(4px)",
          },
        },
        "twinkle": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
        },
        "float-particles": {
          "0%": {
            transform: "translateY(0) translateX(0) scale(1)",
            opacity: "0.3",
          },
          "33%": {
            transform: "translateY(-30px) translateX(20px) scale(1.2)",
            opacity: "0.6",
          },
          "66%": {
            transform: "translateY(-60px) translateX(-20px) scale(0.8)",
            opacity: "0.4",
          },
          "100%": {
            transform: "translateY(-90px) translateX(0) scale(1)",
            opacity: "0.2",
          },
        },
        "nebula-drift": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(50px, -50px) scale(1.2)",
          },
          "66%": {
            transform: "translate(-50px, 50px) scale(0.8)",
          },
        },
        "gradient-shift": {
          "to": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "starfield": "starfield 200s linear infinite",
        "gold-glow": "gold-glow 3s ease-in-out infinite",
        "purple-pulse": "purple-pulse 2s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float-particles": "float-particles 8s ease-in-out infinite",
        "nebula-drift": "nebula-drift 30s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
