import type { CaseStudyModel } from '../types';

type PosterSize = 'sm' | 'lg';

interface ProjectPosterProps {
	caseStudy: CaseStudyModel;
	/** Kind label, already translated. */
	kind: string;
	index: number;
	/** `sm` is the hero panel, `lg` is a full case-study row. */
	size?: PosterSize;
	className?: string;
	/** Above the fold: the first poster on a page shouldn't wait for lazy loading. */
	priority?: boolean;
}

/**
 * Written out in full rather than composed at runtime, because Tailwind scans
 * source text and would strip anything it can't see as a literal.
 */
const sizeClass: Record<PosterSize, { pad: string; icon: string; name: string; rule: string }> = {
	sm: {
		pad: 'p-6',
		icon: 'mb-5 h-9 w-9',
		name: 'poster__name--sm',
		rule: 'w-4'
	},
	lg: {
		pad: 'p-5 sm:p-8 lg:p-10',
		icon: 'mb-5 h-10 w-10 sm:mb-7 sm:h-12 sm:w-12 lg:h-16 lg:w-16',
		name: 'poster__name--lg',
		rule: 'w-4 sm:w-6'
	}
};

const WWW_PREFIX = /^www\./;

const hostnameOf = (link: string) => {
	try {
		return new URL(link).hostname.replace(WWW_PREFIX, '');
	} catch {
		return link;
	}
};

/**
 * Two accent-family washes over the theme's poster base. The hue comes from the
 * project and stays inside 200-250, so four posters read as a set rather than
 * four different brands.
 */
const fieldStyle = (hue: number) => ({
	backgroundImage: [
		`radial-gradient(120% 95% at 82% 8%, hsl(${hue} 88% 58% / 0.22), transparent 58%)`,
		`radial-gradient(75% 70% at 6% 104%, hsl(${hue} 85% 55% / 0.16), transparent 66%)`
	].join(', ')
});

/**
 * A project's visual identity on this site.
 *
 * When a real screenshot exists at `image` it fills the frame. Otherwise the
 * poster is the composition: the product's own icon, its name set in the
 * editorial serif, and the address it lives at. It never mocks up an interface
 * that doesn't exist, and it never dresses itself as a browser window.
 */
export const ProjectPoster = ({
	caseStudy,
	kind,
	index,
	size = 'lg',
	className = '',
	priority = false
}: ProjectPosterProps) => {
	const style = sizeClass[size];

	return (
		<div className={`poster ${className || 'aspect-[4/3]'}`}>
			{caseStudy.image ? (
				<img
					alt={caseStudy.name}
					className='poster__field h-full w-full object-cover object-top'
					decoding='async'
					height={900}
					loading={priority ? 'eager' : 'lazy'}
					src={caseStudy.image}
					width={1200}
				/>
			) : (
				<>
					<div aria-hidden='true' className='poster__field' style={fieldStyle(caseStudy.hue)} />
					<div aria-hidden='true' className='grid-backdrop absolute inset-0 opacity-40' />

					<div className={`relative flex h-full flex-col justify-between ${style.pad}`}>
						<div className='flex items-center gap-3 font-medium font-mono text-eyebrow text-faded-text uppercase'>
							<span className='text-accent'>{String(index + 1).padStart(2, '0')}</span>
							<span aria-hidden='true' className={`h-px bg-border-strong ${style.rule}`} />
							<span>{kind}</span>
						</div>

						<div>
							{caseStudy.icon && (
								<img
									alt=''
									aria-hidden='true'
									className={`object-contain ${style.icon}`}
									decoding='async'
									height={128}
									loading={priority ? 'eager' : 'lazy'}
									src={caseStudy.icon}
									width={128}
								/>
							)}

							<p aria-hidden='true' className={`poster__name ${style.name}`}>
								{caseStudy.name}
							</p>
						</div>

						<p className='font-mono text-[0.6875rem] text-faded-text'>{hostnameOf(caseStudy.link)}</p>
					</div>
				</>
			)}
		</div>
	);
};
