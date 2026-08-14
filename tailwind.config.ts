/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'bg-color': 'var(--bg-color)',
				'bg-translucent': 'var(--bg-translucent)',
				text: 'var(--text)',
				'faded-text': 'var(--faded-text)',
				'faded-line': 'var(--faded-line)',
				'faded-bg': 'var(--faded-bg)',
				'subfaded-text': 'var(--subfaded-text)',
				accent: 'var(--accent)',
				'accent-solid': 'var(--accent-solid)',
				'accent-strong': 'var(--accent-strong)',
				'accent-contrast': 'var(--accent-contrast)',
				'accent-line': 'var(--accent-line)',
				'accent-soft': 'var(--accent-soft)',
				surface: 'var(--surface)',
				'surface-raised': 'var(--surface-raised)',
				border: 'var(--border)',
				'border-strong': 'var(--border-strong)'
			},
			fontFamily: {
				sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
			},
			fontSize: {
				display: ['clamp(2.375rem, 1.1rem + 5.4vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
				'display-sm': ['clamp(2rem, 1.25rem + 3vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
				headline: ['clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
				title: ['clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
				lede: ['clamp(1.0625rem, 1rem + 0.4vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
				eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }]
			},
			maxWidth: {
				prose: '68ch'
			},
			listStyleType: {
				square: 'square'
			},
			transitionTimingFunction: {
				expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
				'in-out-expo': 'cubic-bezier(0.76, 0, 0.24, 1)'
			}
		}
	},
	plugins: []
};
