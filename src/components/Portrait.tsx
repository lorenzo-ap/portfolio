import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ease, inViewOnce, stagger, wipeUp } from '../lib/motion';

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
 *
 * Around the photo sits a second, offset hairline: the same gesture as the
 * section rules, drawn in once the photo has arrived, and afterwards a short
 * length of accent keeps travelling round it. The loop is CSS so the browser
 * can run it off the main thread, and the stylesheet drops it under reduced
 * motion.
 */
const frameDraw = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease, delay: 0.5 } }
};

const frameTrace = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.8, ease, delay: 1.9 } }
};

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
				<div className='group/portrait relative'>
					<svg aria-hidden='true' className='portrait__frame'>
						<motion.rect
							className='portrait__frame-line'
							height='100%'
							rx='var(--portrait-frame-radius)'
							variants={frameDraw}
							width='100%'
						/>
						<motion.rect
							className='portrait__frame-trace'
							height='100%'
							pathLength={1}
							rx='var(--portrait-frame-radius)'
							variants={frameTrace}
							width='100%'
						/>
					</svg>

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
				</div>
			</motion.div>
		</div>
	);
};
