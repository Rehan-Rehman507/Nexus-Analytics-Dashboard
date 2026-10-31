/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#0B0D12',
          sidebar: '#10131B',
          card: '#151923',
          cardHover: '#1B202D',
          border: '#252B38',
          borderLight: '#1F2532',
          accent: {
            purple: '#8B5CF6',
            blue: '#3B82F6',
            teal: '#06B6D4',
            emerald: '#10B981',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'dropdown-dark': '0 10px 30px -4px rgba(0, 0, 0, 0.65)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
