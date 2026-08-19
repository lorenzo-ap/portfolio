import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { processStepKeys } from '../data/capabilities';
import { MarkerRow } from './MarkerRow';
import { RevealGroup } from './Reveal';

/**
 * The four steps, threaded onto a spine that fills as the section scrolls past.
 * It's the only progress indicator on the site, and it's here because this is
 * the one place the order of things is the point.
 */
export const ProcessLadder = () => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });
	const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

	return (
		<div className='relative pl-6 sm:pl-8' ref={ref}>
			<span aria-hidden='true' className='absolute top-0 left-0 h-full w-px bg-border' />
			<motion.span
				aria-hidden='true'
				className='absolute top-0 left-0 h-full w-px origin-top bg-accent'
				style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: fill }}
			/>

			<RevealGroup as='ol' step={0.06}>
				{processStepKeys.map((key, index) => (
					<MarkerRow
						className='first:border-t-0 first:pt-0'
						key={key}
						marker={String(index + 1).padStart(2, '0')}
						quiet
						title={t(`process.steps.${key}.title`)}
					>
						{t(`process.steps.${key}.body`)}
					</MarkerRow>
				))}
			</RevealGroup>
		</div>
	);
};
