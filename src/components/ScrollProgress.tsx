import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Hairline reading indicator pinned under the header. It fades out while the
 * mobile sheet is open, since the page it's reporting on isn't the thing being
 * looked at (`html[data-nav-open]` in `index.scss`).
 */
export const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 40, restDelta: 0.001 });

	return (
		<motion.div
			aria-hidden='true'
			className='scroll-progress fixed inset-x-0 top-0 z-[51] h-px origin-left bg-accent'
			style={{ scaleX }}
		/>
	);
};
