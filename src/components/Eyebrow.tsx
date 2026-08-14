import type { PropsWithChildren } from 'react';

interface EyebrowProps extends PropsWithChildren {
	className?: string;
}

/** Small mono label with a leading rule. The section marker used site-wide. */
export const Eyebrow = ({ className = '', children }: EyebrowProps) => (
	<p className={`flex items-center gap-3 font-medium font-mono text-eyebrow text-faded-text uppercase ${className}`}>
		<span aria-hidden='true' className='h-px w-6 bg-border-strong' />
		{children}
	</p>
);
