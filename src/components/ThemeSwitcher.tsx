import { motion } from 'framer-motion';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks';
import { ease } from '../lib/motion';
import { Theme } from '../types';

interface ThemeSwitcherProps {
	className?: string;
}

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Sun and moon are the same shape. The disc grows, a second circle slides across
 * to bite a crescent out of it, and the rays retract, so the icon morphs in one
 * move instead of cross-fading between two drawings.
 */
const ThemeIcon = ({ isDark }: { isDark: boolean }) => {
	const maskId = useId();
	const transition = { duration: 0.5, ease };

	return (
		<svg aria-hidden='true' fill='none' height={18} viewBox='0 0 24 24' width={18}>
			<mask id={maskId}>
				<rect fill='white' height='24' width='24' x='0' y='0' />
				<motion.circle
					animate={{ cx: isDark ? 17 : 26, cy: isDark ? 7 : 0 }}
					cx={26}
					cy={0}
					fill='black'
					r={9}
					transition={transition}
				/>
			</mask>

			<motion.circle
				animate={{ r: isDark ? 9 : 5.25 }}
				cx={12}
				cy={12}
				fill='currentColor'
				mask={`url(#${maskId})`}
				r={5.25}
				transition={transition}
			/>

			<motion.g
				animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -45 : 0, scale: isDark ? 0.5 : 1 }}
				stroke='currentColor'
				strokeLinecap='round'
				strokeWidth={1.6}
				style={{ transformOrigin: '12px 12px' }}
				transition={transition}
			>
				{RAY_ANGLES.map((angle) => (
					<line key={angle} transform={`rotate(${angle} 12 12)`} x1={12} x2={12} y1={1.4} y2={3.6} />
				))}
			</motion.g>
		</svg>
	);
};

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();

	const isDark = theme === Theme.Dark;
	const nextTheme = isDark ? Theme.Light : Theme.Dark;
	// The icon shows the theme you're in and morphs into the other one on click,
	// so the label has to spell out the action rather than name a mode.
	const label = t(isDark ? 'actions.switchToLight' : 'actions.switchToDark');

	return (
		<button
			aria-label={label}
			className={`flex h-9 w-9 items-center justify-center rounded-full text-faded-text transition-colors duration-300 ease-expo hover:bg-faded-bg hover:text-text ${className}`}
			onClick={() => setTheme(nextTheme)}
			title={label}
			type='button'
		>
			<ThemeIcon isDark={isDark} />
		</button>
	);
};
