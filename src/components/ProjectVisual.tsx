interface ProjectVisualProps {
	name: string;
	link: string;
	hue: number;
	image?: string;
	className?: string;
	priority?: boolean;
}

const WWW_PREFIX = /^www\./;

/** Longer names step down a size so the wordmark never runs off the frame. */
const wordmarkSize = (name: string) => {
	if (name.length <= 10) return 'clamp(2.5rem, 6.5vw, 4.5rem)';
	if (name.length <= 18) return 'clamp(1.75rem, 4.5vw, 3.25rem)';

	return 'clamp(1.25rem, 3vw, 2.25rem)';
};

const hostnameOf = (link: string) => {
	try {
		return new URL(link).hostname.replace(WWW_PREFIX, '');
	} catch {
		return link;
	}
};

/**
 * Project preview inside a browser frame.
 *
 * When a real screenshot exists at `image` it is used; otherwise the frame holds
 * a generated composition keyed to the project's hue. That keeps the page
 * visually rich without ever showing a mocked-up interface that doesn't exist.
 */
export const ProjectVisual = ({ name, link, hue, image, className = '', priority = false }: ProjectVisualProps) => (
	<div
		className={`group/visual relative overflow-hidden rounded-2xl border border-border bg-surface-raised ${className}`}
	>
		<div className='flex items-center gap-2 border-border border-b px-4 py-3'>
			<span aria-hidden='true' className='flex gap-1.5'>
				<span className='h-2 w-2 rounded-full bg-faded-line' />
				<span className='h-2 w-2 rounded-full bg-faded-line' />
				<span className='h-2 w-2 rounded-full bg-faded-line' />
			</span>
			<span className='ml-2 truncate font-mono text-[0.6875rem] text-faded-text'>{hostnameOf(link)}</span>
		</div>

		<div className='relative aspect-[16/10] overflow-hidden'>
			{image ? (
				<img
					alt={name}
					className='h-full w-full object-cover object-top transition-transform duration-[900ms] ease-expo group-hover/visual:scale-[1.03]'
					decoding='async'
					height={800}
					loading={priority ? 'eager' : 'lazy'}
					src={image}
					width={1280}
				/>
			) : (
				<>
					<div
						className='absolute inset-0 transition-transform duration-[900ms] ease-expo group-hover/visual:scale-105'
						style={{
							backgroundImage: `radial-gradient(120% 90% at 78% 12%, hsl(${hue} 85% 58% / 0.28), transparent 62%), linear-gradient(155deg, hsl(${hue} 70% 50% / 0.14), transparent 55%)`
						}}
					/>
					<div className='grid-backdrop absolute inset-0 opacity-70' />
					<div
						aria-hidden='true'
						className='absolute inset-x-0 bottom-0 translate-y-[14%] px-6 font-semibold leading-[0.95] tracking-[-0.04em] transition-transform duration-[900ms] ease-expo group-hover/visual:translate-y-[8%]'
						style={{ color: 'var(--wordmark)', fontSize: wordmarkSize(name) }}
					>
						{name}
					</div>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `radial-gradient(60% 60% at 20% 90%, hsl(${hue} 90% 60% / 0.16), transparent 70%)`
						}}
					/>
				</>
			)}
		</div>
	</div>
);
