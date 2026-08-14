import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { fadeUp, inView, stagger } from '../lib/motion';

interface RevealProps extends PropsWithChildren {
	className?: string;
	delay?: number;
	as?: 'div' | 'li' | 'section';
}

/** Single element easing in as it enters the viewport. */
export const Reveal = ({ className, delay = 0, as = 'div', children }: RevealProps) => {
	const Component = motion[as];

	return (
		<Component
			className={className}
			initial={inView.initial}
			transition={{ delay }}
			variants={fadeUp}
			viewport={inView.viewport}
			whileInView={inView.whileInView}
		>
			{children}
		</Component>
	);
};

interface RevealGroupProps extends PropsWithChildren {
	className?: string;
	step?: number;
	delay?: number;
	as?: 'div' | 'ul' | 'ol';
}

/** Parent that releases `RevealItem` children one after another. */
export const RevealGroup = ({ className, step = 0.07, delay = 0, as = 'div', children }: RevealGroupProps) => {
	const Component = motion[as];

	return (
		<Component
			className={className}
			initial={inView.initial}
			variants={stagger(step, delay)}
			viewport={inView.viewport}
			whileInView={inView.whileInView}
		>
			{children}
		</Component>
	);
};

interface RevealItemProps extends PropsWithChildren {
	className?: string;
	as?: 'div' | 'li' | 'article';
}

export const RevealItem = ({ className, as = 'div', children }: RevealItemProps) => {
	const Component = motion[as];

	return (
		<Component className={className} variants={fadeUp}>
			{children}
		</Component>
	);
};
