import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ease, followSpring } from '../lib/motion';

const INTERACTIVE = 'a, button, [data-cursor]';

/**
 * A ring that trails the pointer and opens up over anything actionable.
 *
 * It sits behind the real cursor rather than replacing it, so nothing about
 * pointing at things depends on this rendering. Position is written to motion
 * values, not React state, so following the pointer never re-renders the tree;
 * only the open/closed state does, and that changes a handful of times a minute.
 *
 * Off entirely without a fine pointer, and off when reduced motion is asked for.
 */
export const Cursor = () => {
	const prefersReducedMotion = useReducedMotion();
	const [enabled, setEnabled] = useState(false);
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, followSpring);
	const springY = useSpring(y, followSpring);

	useEffect(() => {
		if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

		setEnabled(true);

		const onMove = (event: PointerEvent) => {
			x.set(event.clientX);
			y.set(event.clientY);
			setVisible(true);

			const target = event.target as Element | null;
			setOpen(Boolean(target?.closest?.(INTERACTIVE)));
		};

		const onLeave = () => setVisible(false);

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
		};
	}, [prefersReducedMotion, x, y]);

	if (!enabled) return null;

	const restingOpacity = open ? 0.85 : 0.4;

	return (
		<motion.span
			animate={{
				opacity: visible ? restingOpacity : 0,
				scale: open ? 1.6 : 0.55
			}}
			aria-hidden='true'
			className='cursor-ring'
			initial={{ opacity: 0, scale: 0.55 }}
			style={{ x: springX, y: springY }}
			transition={{ duration: 0.4, ease }}
		/>
	);
};
