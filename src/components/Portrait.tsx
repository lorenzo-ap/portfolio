import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { inViewOnce, stagger, wipeUp } from '../lib/motion';

interface PortraitProps {
	className?: string;
}

/**
 * The photo on the about page, framed like one of the posters rather than an
 * avatar: same border and corners, the same wipe on arrival, the same slight
 * drift on scroll.
 *
 * Two elements for the motion, for the reasons written out above
 * `PosterFrame`: the observed element must keep its box, and the scroll `y`
 * and the entrance `y` can't share one element.
 */
export const Portrait = ({ className = '' }: PortraitProps) => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const y = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

	return (
		<div className={className} ref={ref}>
			<motion.div
				initial={inViewOnce.initial}
				style={prefersReducedMotion ? undefined : { y }}
				variants={stagger(0)}
				viewport={inViewOnce.viewport}
				whileInView={inViewOnce.whileInView}
			>
				<motion.div className='portrait' variants={wipeUp}>
					<img
						alt={t('about.portraitAlt')}
						className='portrait__photo'
						decoding='async'
						height={1375}
						loading='lazy'
						src='/portrait.webp'
						width={1100}
					/>
				</motion.div>
			</motion.div>
		</div>
	);
};
