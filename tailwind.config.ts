import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep warm frontier background system
        space: {
          900: '#0d0a07',
          800: '#1a1510',
          700: '#2a2318',
          600: '#3a3028',
          500: '#4a4038'
        },
        // Warm amber/gold primary accent - lantern light, gold dust
        electric: {
          500: '#d4a052',
          400: '#c4882a',
          600: '#b8793a',
          300: '#e4b062'
        },
        // Copper/rust secondary - weathered metal
        copper: {
          500: '#b87333',
          400: '#8b4513',
          600: '#9f6329',
          300: '#c8843d'
        },
        // Electric teal highlight - futuristic holographic tech
        teal: {
          500: '#2dd4bf',
          400: '#4dd0c7',
          600: '#1db5a1',
          300: '#5de0d5'
        },
        // Warm amber/gold system (primary)
        amber: {
          500: '#d4a052',
          400: '#c4882a',
          600: '#b8793a',
          300: '#e4b062'
        },
        // Success - warm green
        emerald: {
          500: '#22c55e',
          400: '#4ade80',
          600: '#16a34a'
        },
        // Danger - deep red
        red: {
          500: '#dc2626',
          400: '#ef4444',
          600: '#b91c1c'
        },
        // Warm frontier text system
        slate: {
          50: '#faf5ef',  // warm white
          400: '#a39685',  // warm gray secondary
          300: '#b5a799',
          500: '#8a7969',
          600: '#6b5d4f',
          700: '#4c3f35',
          800: '#2d241c'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(ellipse 800px 600px at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(ellipse 600px 800px at 100% 100%, rgba(168, 85, 247, 0.1), transparent 50%)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out',
        'mesh-shift': 'meshShift 20s ease-in-out infinite',
        'judge-pulse': 'judgePulse 1.5s ease-in-out infinite',
        'judge-verify': 'judgeVerify 0.8s ease-out forwards',
        'network-pulse': 'networkPulse 3s ease-in-out infinite',
        'wallet-invite': 'walletInvite 2s ease-in-out infinite',
        'trust-glow': 'trustGlow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 82, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 82, 0.6), 0 0 60px rgba(212, 160, 82, 0.3)' }
        },
        meshShift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(2%, -1%) scale(1.02)' },
          '50%': { transform: 'translate(-1%, 2%) scale(0.98)' },
          '75%': { transform: 'translate(1%, 1%) scale(1.01)' }
        },
        judgePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' }
        },
        judgeVerify: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212, 160, 82, 0.7)' },
          '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(212, 160, 82, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(212, 160, 82, 0.4)' }
        },
        networkPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' }
        },
        walletInvite: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 0 8px rgba(59, 130, 246, 0)' }
        },
        trustGlow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.6), 0 0 30px rgba(245, 158, 11, 0.3)' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        frontier: ['Bebas Neue', 'Impact', 'Arial Black', 'sans-serif']
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em'
      }
    },
  },
  plugins: [],
}
export default config