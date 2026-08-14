import type { Transition, Variants } from 'framer-motion';

/**
 * One motion language for the whole site.
 *
 * Rules of thumb used here:
 * - everything decelerates on the same expo curve, so the site feels like one object
 * - nothing entrance-animates for longer than 0.8s
 * - travel distance stays small (16-28px); confidence reads as restraint
 */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const duration = {
	fast: 0.25,
	base: 0.45,
	slow: 0.7,
	page: 0.5
} as const;

export const transition: Record<'fast' | 'base' | 'slow', Transition> = {
	fast: { duration: duration.fast, ease },
	base: { duration: duration.base, ease },
	slow: { duration: duration.slow, ease }
};

/** Parent that releases its children one after another. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
	hidden: {},
	visible: {
		transition: { staggerChildren, delayChildren }
	}
});

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 18 },
	visible: { opacity: 1, y: 0, transition: transition.slow }
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: transition.slow }
};

/** Line-by-line mask reveal. The hero's signature move. */
export const lineReveal: Variants = {
	hidden: { y: '110%' },
	visible: { y: '0%', transition: { duration: 0.85, ease } }
};

export const pageTransition: Variants = {
	hidden: { opacity: 0, y: 8 },
	visible: { opacity: 1, y: 0, transition: { duration: duration.page, ease } },
	exit: { opacity: 0, y: -6, transition: { duration: 0.24, ease: easeInOut } }
};

/** Shared `whileInView` config so every section reveals with the same rhythm. */
export const inView = {
	initial: 'hidden',
	whileInView: 'visible',
	viewport: { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }
} as const;
