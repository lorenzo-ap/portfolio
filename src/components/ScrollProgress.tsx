import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline reading indicator pinned under the header. */
export const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 40, restDelta: 0.001 });

	return (
		<motion.div
			aria-hidden='true'
			className='fixed inset-x-0 top-0 z-[51] h-px origin-left bg-accent'
			style={{ scaleX }}
		/>
	);
};
