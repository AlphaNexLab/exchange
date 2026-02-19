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
        // Deep space navy background system
        space: {
          900: '#0a0e1a',
          800: '#0f1420',
          700: '#141926',
          600: '#1a1f2e',
          500: '#202535'
        },
        // Electric blue system
        electric: {
          500: '#3b82f6',
          400: '#60a5fa',
          600: '#2563eb',
          300: '#93c5fd'
        },
        // Warm amber/gold system  
        amber: {
          500: '#f59e0b',
          400: '#fbbf24',
          600: '#d97706',
          300: '#fcd34d'
        },
        // Success emerald
        emerald: {
          500: '#10b981',
          400: '#34d399',
          600: '#059669'
        },
        // Text system
        slate: {
          50: '#f8fafc',
          400: '#94a3b8',
          300: '#cbd5e1',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b'
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)' }
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
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }
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
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace']
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