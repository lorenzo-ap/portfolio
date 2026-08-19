import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactNode } from 'react';
import { inView, ruleReveal } from '../lib/motion';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { Statement } from './Statement';

interface SectionProps extends PropsWithChildren {
	id?: string;
	className?: string;
	/** Draws the hairline that separates one section from the next. */
	divider?: boolean;
}

export const Section = ({ id, className = '', divider = true, children }: SectionProps) => (
	<section className={`shell ${className}`} id={id}>
		{divider && (
			<motion.span
				aria-hidden='true'
				className='block h-px w-full origin-left bg-border'
				initial={inView.initial}
				variants={ruleReveal}
				viewport={inView.viewport}
				whileInView={inView.whileInView}
			/>
		)}
		<div className='py-[var(--section-gap)]'>{children}</div>
	</section>
);

interface SectionHeaderProps {
	eyebrow: string;
	title: string;
	lede?: ReactNode;
	aside?: ReactNode;
	className?: string;
}

/**
 * Editorial two-column header: the statement on the left in the serif, the
 * supporting sentence on the right in the sans. The size gap between the two is
 * the hierarchy, so neither column needs a rule or a box to be readable.
 */
export const SectionHeader = ({ eyebrow, title, lede, aside, className = '' }: SectionHeaderProps) => (
	<div className={`grid gap-x-16 gap-y-7 lg:grid-cols-12 ${className}`}>
		<div className='lg:col-span-7'>
			<Reveal>
				<Eyebrow className='mb-6 sm:mb-8'>{eyebrow}</Eyebrow>
			</Reveal>

			<Statement className='max-w-[15ch] text-statement' delay={0.06}>
				{title}
			</Statement>
		</div>

		{(lede || aside) && (
			<div className='flex flex-col justify-end gap-7 lg:col-span-5 lg:col-start-8'>
				{lede && (
					<Reveal delay={0.12}>
						<p className='max-w-prose text-body-sm text-faded-text'>{lede}</p>
					</Reveal>
				)}
				{aside}
			</div>
		)}
	</div>
);
