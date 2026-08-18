import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import { ease, fadeUp, inView, uncover, wordStagger } from '../lib/motion';

type StatementTag = 'h1' | 'h2' | 'h3' | 'p';

interface StatementProps {
	children: string;
	as?: StatementTag;
	className?: string;
	/** Runs on mount rather than on scroll. The hero is the only place that wants this. */
	immediate?: boolean;
	delay?: number;
}

/**
 * Every headline on the site.
 *
 * The words are uncovered one after another from behind their own baseline,
 * which is the one move the whole site is built around: nothing important fades
 * in, it arrives. Each word sits in its own clipping box, so the effect
 * survives wrapping at any width and in any of the three languages.
 *
 * The clipping box carries padding for descenders and cancels it again with a
 * negative margin, so adding the effect doesn't change line spacing.
 */
export const Statement = ({ children, as = 'h2', className = '', immediate = false, delay = 0 }: StatementProps) => {
	const prefersReducedMotion = useReducedMotion();
	const Component = motion[as];
	const gate = immediate
		? ({ animate: 'visible', initial: 'hidden' } as const)
		: ({ initial: inView.initial, whileInView: inView.whileInView, viewport: inView.viewport } as const);

	// A reveal made only of movement has nothing left once movement is off.
	if (prefersReducedMotion) {
		return (
			<Component className={`statement ${className}`} variants={fadeUp} {...gate}>
				{children}
			</Component>
		);
	}

	const words = children.split(' ').map((word, index) => ({ id: `${index}-${word}`, word }));
	const lastIndex = words.length - 1;

	return (
		<Component className={`statement ${className}`} variants={wordStagger(delay)} {...gate}>
			{words.map((entry, index) => (
				<Fragment key={entry.id}>
					<span className='statement__mask'>
						<motion.span className='inline-block' variants={uncover}>
							{entry.word}
						</motion.span>
					</span>
					{index < lastIndex ? ' ' : null}
				</Fragment>
			))}
		</Component>
	);
};

interface LineProps {
	children: string;
	className?: string;
	delay?: number;
}

/**
 * A headline line that must not rewrap, uncovered as one piece. The hero sets
 * its own line breaks in the locale files, so it uses this rather than
 * `Statement`.
 */
export const StatementLine = ({ children, className = '', delay = 0 }: LineProps) => {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) {
		return (
			<motion.span
				animate={{ opacity: 1 }}
				className={`block ${className}`}
				initial={{ opacity: 0 }}
				transition={{ duration: 0.6, ease, delay }}
			>
				{children}
			</motion.span>
		);
	}

	return (
		<span className='statement__mask block'>
			<motion.span
				animate={{ y: '0%' }}
				className='block'
				initial={{ y: '112%' }}
				transition={{ duration: 0.95, ease, delay }}
			>
				{children}
			</motion.span>
		</span>
	);
};
