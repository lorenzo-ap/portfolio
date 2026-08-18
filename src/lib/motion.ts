import type { SpringOptions, Transition, Variants } from 'framer-motion';

/**
 * One motion language for the whole site.
 *
 * Rules of thumb used here:
 * - everything decelerates on the same expo curve, so the site feels like one object
 * - type arrives by being uncovered, never by fading in from nowhere
 * - travel stays small (16-28px) and entrances stay under ~0.9s
 * - exits run at roughly 60% of the matching entrance, so the site feels responsive
 */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const duration = {
	fast: 0.25,
	base: 0.45,
	slow: 0.7,
	page: 0.55
} as const;

export const transition: Record<'fast' | 'base' | 'slow', Transition> = {
	fast: { duration: duration.fast, ease },
	base: { duration: duration.base, ease },
	slow: { duration: duration.slow, ease }
};

/** Tight, non-overshooting spring. Used for anything that tracks the pointer. */
export const followSpring: SpringOptions = { stiffness: 520, damping: 38, mass: 0.5 };

/** Parent that releases its children one after another. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
	hidden: {},
	visible: {
		transition: { staggerChildren, delayChildren }
	}
});

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: transition.slow }
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: transition.slow }
};

/**
 * The site's signature move: type slides up from behind its own edge.
 * Only ever used inside an `overflow: hidden` wrapper sized to one word or line.
 */
export const uncover: Variants = {
	hidden: { y: '112%' },
	visible: { y: '0%', transition: { duration: 0.9, ease } }
};

/** Word-level cadence for a heading. Slow enough to read as deliberate. */
export const wordStagger = (delay = 0): Variants => ({
	hidden: {},
	visible: { transition: { staggerChildren: 0.055, delayChildren: delay } }
});

/**
 * Hairline that draws itself in from the left. Used for every rule that marks
 * the start of a block, so section edges arrive rather than appear.
 */
export const ruleReveal: Variants = {
	hidden: { scaleX: 0 },
	visible: { scaleX: 1, transition: { duration: 0.9, ease } }
};

/**
 * Wipe used by the project posters. Revealing the field from the bottom edge
 * reads as the image arriving, where a plain fade reads as a loading state.
 */
export const wipeUp: Variants = {
	hidden: { clipPath: 'inset(100% 0 0 0)', y: 16 },
	visible: {
		clipPath: 'inset(0% 0 0 0)',
		y: 0,
		transition: { duration: 1, ease }
	}
};

export const pageTransition: Variants = {
	hidden: { opacity: 0, y: 18 },
	visible: { opacity: 1, y: 0, transition: { duration: duration.page, ease } },
	exit: { opacity: 0, y: -12, transition: { duration: 0.28, ease: easeInOut } }
};

/** Shared `whileInView` config so every section reveals with the same rhythm. */
export const inView = {
	initial: 'hidden',
	whileInView: 'visible',
	viewport: { once: true, amount: 0.2, margin: '0px 0px -12% 0px' }
} as const;

/** Same rhythm, for tall blocks where 20% of the element is most of the screen. */
export const inViewOnce = {
	initial: 'hidden',
	whileInView: 'visible',
	viewport: { once: true, amount: 0.12, margin: '0px 0px -8% 0px' }
} as const;
