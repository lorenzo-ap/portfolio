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
				'border-strong': 'var(--border-strong)',
				wordmark: 'var(--wordmark)'
			},
			fontFamily: {
				sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				serif: ['IBM Plex Serif', 'ui-serif', 'Georgia', 'serif'],
				mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
			},
			/**
			 * Two voices. `display`/`statement` are the serif editorial sizes and
			 * carry the argument; `title` down is the sans UI scale that supports it.
			 * The gap between them is deliberate: that jump is most of the hierarchy.
			 */
			fontSize: {
				display: ['clamp(2.625rem, min(6.4vw, 10.5vh), 6rem)', { lineHeight: '0.96', letterSpacing: '-0.026em' }],
				statement: ['clamp(2.25rem, 1.1rem + 4.6vw, 4.75rem)', { lineHeight: '0.98', letterSpacing: '-0.022em' }],
				'display-sm': ['clamp(2rem, 1.2rem + 3.2vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
				headline: ['clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
				title: ['clamp(1.3125rem, 1.05rem + 0.9vw, 1.75rem)', { lineHeight: '1.18', letterSpacing: '-0.012em' }],
				lede: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.58', letterSpacing: '-0.004em' }],
				body: ['1.0625rem', { lineHeight: '1.65' }],
				'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
				label: ['0.8125rem', { lineHeight: '1.45' }],
				eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }]
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				DEFAULT: 'var(--radius)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)'
			},
			maxWidth: {
				prose: '64ch'
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
