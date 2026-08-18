import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { processStepKeys } from '../data/capabilities';
import { RevealGroup, RevealItem } from './Reveal';

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
		<div className='relative pl-8' ref={ref}>
			<span aria-hidden='true' className='absolute top-0 left-0 h-full w-px bg-border' />
			<motion.span
				aria-hidden='true'
				className='absolute top-0 left-0 h-full w-px origin-top bg-accent'
				style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: fill }}
			/>

			<RevealGroup as='ol' step={0.06}>
				{processStepKeys.map((key, index) => (
					<RevealItem as='li' key={key}>
						<div className='group grid gap-x-8 gap-y-2 border-border border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-12'>
							<span className='font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-2'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<div className='sm:col-span-10'>
								<h3 className='font-medium text-text text-title'>{t(`process.steps.${key}.title`)}</h3>
								<p className='mt-3 max-w-prose text-body-sm text-faded-text'>{t(`process.steps.${key}.body`)}</p>
							</div>
						</div>
					</RevealItem>
				))}
			</RevealGroup>
		</div>
	);
};
