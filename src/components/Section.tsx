import type { PropsWithChildren, ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface SectionProps extends PropsWithChildren {
	id?: string;
	className?: string;
	/** Draws the hairline that separates one section from the next. */
	divider?: boolean;
}

export const Section = ({ id, className = '', divider = true, children }: SectionProps) => (
	<section className={`shell ${className}`} id={id}>
		{divider && <span aria-hidden='true' className='block h-px w-full bg-border' />}
		<div className='py-[var(--section-gap)]'>{children}</div>
	</section>
);

interface SectionHeaderProps {
	eyebrow: string;
	title: ReactNode;
	lede?: ReactNode;
	aside?: ReactNode;
	className?: string;
}

/**
 * Editorial two-column header: statement on the left, supporting text on the
 * right. Keeps every section on the same grid instead of stacked centre-aligned
 * blocks, which is what makes a page read as designed.
 */
export const SectionHeader = ({ eyebrow, title, lede, aside, className = '' }: SectionHeaderProps) => (
	<div className={`grid gap-x-16 gap-y-6 lg:grid-cols-12 ${className}`}>
		<div className='lg:col-span-7'>
			<Reveal>
				<Eyebrow className='mb-6'>{eyebrow}</Eyebrow>
			</Reveal>

			<Reveal delay={0.06}>
				<h2 className='max-w-[16ch] text-balance font-semibold text-headline text-text'>{title}</h2>
			</Reveal>
		</div>

		{(lede || aside) && (
			<div className='flex flex-col justify-end gap-5 lg:col-span-5'>
				{lede && (
					<Reveal delay={0.12}>
						<p className='max-w-prose text-[1.0625rem] text-faded-text leading-[1.65]'>{lede}</p>
					</Reveal>
				)}
				{aside}
			</div>
		)}
	</div>
);
