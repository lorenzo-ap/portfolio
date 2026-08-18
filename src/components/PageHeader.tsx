import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { Statement } from './Statement';

interface PageHeaderProps {
	eyebrow: string;
	title: string;
	lede?: ReactNode;
}

/** Opening block for the interior pages, so /work and /about share a rhythm. */
export const PageHeader = ({ eyebrow, title, lede }: PageHeaderProps) => (
	<header className='shell pt-28 pb-20 sm:pt-36 sm:pb-28'>
		<Reveal>
			<Eyebrow className='mb-9'>{eyebrow}</Eyebrow>
		</Reveal>

		<div className='grid gap-x-16 gap-y-10 lg:grid-cols-12'>
			<div className='lg:col-span-7'>
				<Statement as='h1' className='max-w-[13ch] text-display-sm' delay={0.05} immediate>
					{title}
				</Statement>
			</div>

			{lede && (
				<Reveal className='flex flex-col justify-end lg:col-span-4 lg:col-start-9' delay={0.24}>
					<p className='max-w-prose text-faded-text text-lede'>{lede}</p>
				</Reveal>
			)}
		</div>
	</header>
);
