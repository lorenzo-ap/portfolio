import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { caseStudies } from '../data/projects';

/**
 * Three times through, translated by exactly one third. The line therefore
 * starts flush with the left edge and still has a full copy of itself to the
 * right when it reaches the end of its travel, so neither edge ever runs dry.
 */
const marquee = [...caseStudies, ...caseStudies, ...caseStudies].map((caseStudy, index) => ({
	id: `${index}-${caseStudy.key}`,
	name: caseStudy.name
}));

/**
 * The chapter break between the work and everything after it.
 *
 * It drifts sideways, but only while the page is being scrolled: tying the
 * movement to scroll position rather than to a clock means it can't run away
 * from the reader, never needs a pause control, and stops dead the moment they
 * stop. Decorative by construction, since every name in it is a link a few
 * hundred pixels further up.
 */
export const WorkTicker = () => {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const x = useTransform(scrollYProgress, [0, 1], ['0%', '-33.333%']);

	return (
		<div aria-hidden='true' className='relative overflow-hidden border-border border-t py-10 lg:py-14' ref={ref}>
			<motion.div
				className='flex w-max items-center gap-12 whitespace-nowrap opacity-50 lg:gap-20'
				style={prefersReducedMotion ? undefined : { x }}
			>
				{marquee.map((entry) => (
					<span className='flex items-center gap-12 lg:gap-20' key={entry.id}>
						<span className='statement text-faded-text text-headline'>{entry.name}</span>
						<span className='h-1 w-1 shrink-0 rounded-full bg-accent-line' />
					</span>
				))}
			</motion.div>
		</div>
	);
};
