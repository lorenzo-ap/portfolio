import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface PageHeaderProps {
	eyebrow: string;
	title: string;
	lede?: ReactNode;
}

/** Opening block for the interior pages, so /work and /about share a rhythm. */
export const PageHeader = ({ eyebrow, title, lede }: PageHeaderProps) => (
	<header className='shell pt-24 pb-16 sm:pt-32 sm:pb-20'>
		<Reveal>
			<Eyebrow className='mb-7'>{eyebrow}</Eyebrow>
		</Reveal>

		<div className='grid gap-x-16 gap-y-8 lg:grid-cols-12'>
			<Reveal className='lg:col-span-7' delay={0.05}>
				<h1 className='max-w-[14ch] text-balance font-semibold text-display-sm text-text'>{title}</h1>
			</Reveal>

			{lede && (
				<Reveal className='flex flex-col justify-end lg:col-span-5' delay={0.12}>
					<p className='max-w-prose text-faded-text text-lede'>{lede}</p>
				</Reveal>
			)}
		</div>
	</header>
);
