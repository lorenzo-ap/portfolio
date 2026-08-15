import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fadeUp, inView, stagger } from '../lib/motion';
import type { CaseStudyModel } from '../types';
import { ActionLink } from './ActionLink';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './Reveal';

interface CaseStudyProps {
	caseStudy: CaseStudyModel;
	index: number;
}

const eyebrowClass = 'font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]';

/** Index + kind, the pair that tells you what sort of work you're looking at. */
const CaseStudyMeta = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();

	return (
		<div className={`flex items-center gap-3 ${eyebrowClass}`}>
			<span className='text-accent'>{String(index + 1).padStart(2, '0')}</span>
			<span aria-hidden='true' className='h-px w-5 bg-border-strong' />
			<span>{t(`work.kinds.${caseStudy.kind}`)}</span>
		</div>
	);
};

interface CaseStudyTitleProps {
	caseStudy: CaseStudyModel;
	className: string;
	as?: 'h2' | 'h3';
}

/**
 * The product's own icon, then its name. The icon is sized in `em` so it tracks
 * whichever heading size the surface uses, and stays inline so it rides the
 * first line when a title wraps instead of centring itself between two lines.
 * It's decorative — the name beside it already carries the meaning.
 */
const CaseStudyTitle = ({ caseStudy, className, as: Heading = 'h3' }: CaseStudyTitleProps) => (
	<Heading className={className}>
		{caseStudy.icon && (
			<img
				alt=''
				aria-hidden='true'
				className='mr-[0.4em] inline-block h-[0.85em] w-[0.85em] object-contain align-[-0.1em]'
				decoding='async'
				height={128}
				loading='lazy'
				src={caseStudy.icon}
				width={128}
			/>
		)}
		{caseStudy.name}
	</Heading>
);

interface CaseStudyLinksProps {
	caseStudy: CaseStudyModel;
}

/** Primary link always; the App Store or another destination alongside it. */
const CaseStudyLinks = ({ caseStudy }: CaseStudyLinksProps) => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-wrap items-center gap-x-7 gap-y-3'>
			<ActionLink external href={caseStudy.link} label={t(`actions.${caseStudy.primaryLabelKey ?? 'visitSite'}`)} />
			{caseStudy.secondaryLink && (
				<ActionLink
					external
					href={caseStudy.secondaryLink.href}
					label={t(`actions.${caseStudy.secondaryLink.labelKey}`)}
					muted
				/>
			)}
		</div>
	);
};

const courseFactKeys = ['audience', 'format', 'length', 'publisher'] as const;

/** What the course actually is, for someone deciding whether it counts. */
const CourseFactList = () => {
	const { t } = useTranslation();

	return (
		<dl className='flex flex-col'>
			{courseFactKeys.map((factKey) => (
				<div className='flex flex-col gap-1.5 border-border border-t py-4 first:border-t-0 first:pt-0' key={factKey}>
					<dt className={eyebrowClass}>{t(`work.course.${factKey}Label`)}</dt>
					<dd className='text-[0.9375rem] text-text leading-snug'>{t(`work.course.${factKey}Value`)}</dd>
				</div>
			))}
		</dl>
	);
};

/**
 * The course doesn't live behind a browser frame, so it gets its own surface:
 * same tokens, same accent family, visibly not a website.
 */
const courseSurfaceStyle = (hue: number) => ({
	backgroundImage: `radial-gradient(85% 70% at 88% 0%, hsl(${hue} 85% 58% / 0.18), transparent 62%), radial-gradient(60% 60% at 8% 100%, hsl(${hue} 90% 60% / 0.12), transparent 70%)`
});

interface CourseSurfaceProps {
	hue: number;
	className?: string;
	children: React.ReactNode;
}

const CourseSurface = ({ hue, className = '', children }: CourseSurfaceProps) => (
	<div className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${className}`}>
		<div aria-hidden='true' className='absolute inset-0' style={courseSurfaceStyle(hue)} />
		<div aria-hidden='true' className='grid-backdrop absolute inset-0 opacity-50' />
		{/* Fades out before the rounded corners; a flat hairline gets clipped mid-curve and reads as a stray line. */}
		<div
			aria-hidden='true'
			className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-line to-transparent'
		/>
		<div className='relative'>{children}</div>
	</div>
);

/** Home page teaser: alternating visual / narrative rows. */
export const FeaturedCaseStudy = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();
	const flipped = index % 2 === 1;

	return (
		<motion.article
			className='group grid items-center gap-x-14 gap-y-8 lg:grid-cols-12'
			initial={inView.initial}
			variants={stagger(0.08)}
			viewport={inView.viewport}
			whileInView={inView.whileInView}
		>
			<motion.div className={`lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`} variants={fadeUp}>
				<Link aria-label={caseStudy.name} target='_blank' to={caseStudy.link}>
					<ProjectVisual
						className='transition-transform duration-700 ease-expo group-hover:-translate-y-1'
						hue={caseStudy.hue}
						image={caseStudy.image}
						link={caseStudy.link}
						name={caseStudy.name}
					/>
				</Link>
			</motion.div>

			<motion.div className={`lg:col-span-5 ${flipped ? 'lg:order-1' : ''}`} variants={fadeUp}>
				<CaseStudyMeta caseStudy={caseStudy} index={index} />

				<CaseStudyTitle caseStudy={caseStudy} className='mt-5 font-semibold text-text text-title' />

				<p className='mt-3 text-[1.0625rem] text-faded-text leading-relaxed'>
					{t(`work.cases.${caseStudy.key}.summary`)}
				</p>

				<p className='mt-5 max-w-prose text-[0.9375rem] text-subfaded-text leading-relaxed'>
					{t(`work.cases.${caseStudy.key}.situation`)}
				</p>

				<div className='mt-7'>
					<CaseStudyLinks caseStudy={caseStudy} />
				</div>
			</motion.div>
		</motion.article>
	);
};

/** Home page teaser for the course: one wide panel instead of a browser frame. */
export const FeaturedTeaching = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();

	return (
		<CourseSurface hue={caseStudy.hue}>
			<motion.article
				className='grid gap-x-14 gap-y-10 p-8 sm:p-10 lg:grid-cols-12 lg:p-12'
				initial={inView.initial}
				variants={stagger(0.08)}
				viewport={inView.viewport}
				whileInView={inView.whileInView}
			>
				<motion.div className='lg:col-span-7' variants={fadeUp}>
					<CaseStudyMeta caseStudy={caseStudy} index={index} />

					<CaseStudyTitle caseStudy={caseStudy} className='mt-5 font-semibold text-text text-title' />

					<p className='mt-3 max-w-prose text-[1.0625rem] text-faded-text leading-relaxed'>
						{t(`work.cases.${caseStudy.key}.summary`)}
					</p>

					<p className='mt-5 max-w-prose text-[0.9375rem] text-subfaded-text leading-relaxed'>
						{t(`work.cases.${caseStudy.key}.situation`)}
					</p>

					<div className='mt-7'>
						<CaseStudyLinks caseStudy={caseStudy} />
					</div>
				</motion.div>

				<motion.div className='lg:col-span-5' variants={fadeUp}>
					<CourseFactList />
				</motion.div>
			</motion.article>
		</CourseSurface>
	);
};

const narrativeRows = ['situation', 'contribution', 'challenge', 'proof'] as const;

/** Work page: the full Situation → What I did → Hard part → What this shows story. */
export const CaseStudyArticle = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();
	const isCourse = caseStudy.kind === 'course';

	return (
		<article className='border-border border-t pt-12 lg:pt-16'>
			<div className='grid gap-x-14 gap-y-6 lg:grid-cols-12'>
				<div className='lg:col-span-7'>
					<Reveal>
						<CaseStudyMeta caseStudy={caseStudy} index={index} />
					</Reveal>

					<Reveal delay={0.06}>
						<CaseStudyTitle as='h2' caseStudy={caseStudy} className='mt-5 font-semibold text-display-sm text-text' />
					</Reveal>
				</div>

				<div className='flex flex-col justify-end gap-6 lg:col-span-5'>
					<Reveal delay={0.1}>
						<p className='max-w-prose text-faded-text text-lede'>{t(`work.cases.${caseStudy.key}.summary`)}</p>
					</Reveal>

					<Reveal delay={0.14}>
						<CaseStudyLinks caseStudy={caseStudy} />
					</Reveal>
				</div>
			</div>

			<Reveal className='mt-12' delay={0.08}>
				{isCourse ? (
					<CourseSurface hue={caseStudy.hue}>
						<div className='p-8 sm:p-10 lg:p-12'>
							<div className='grid gap-x-14 gap-y-8 lg:grid-cols-2'>
								<CourseFactList />
								<p className='max-w-prose self-center text-[0.9375rem] text-subfaded-text leading-relaxed'>
									{t('work.course.note')}
								</p>
							</div>
						</div>
					</CourseSurface>
				) : (
					<Link aria-label={caseStudy.name} className='group block' target='_blank' to={caseStudy.link}>
						<ProjectVisual
							className='transition-transform duration-700 ease-expo group-hover:-translate-y-1'
							hue={caseStudy.hue}
							image={caseStudy.image}
							link={caseStudy.link}
							name={caseStudy.name}
							priority={index === 0}
						/>
					</Link>
				)}
			</Reveal>

			<motion.dl
				className='mt-14'
				initial={inView.initial}
				variants={stagger(0.06)}
				viewport={inView.viewport}
				whileInView={inView.whileInView}
			>
				{narrativeRows.map((row) => (
					<motion.div
						className='grid gap-x-14 gap-y-2 border-border border-t py-7 lg:grid-cols-12'
						key={row}
						variants={fadeUp}
					>
						<dt className={`${eyebrowClass} lg:col-span-3`}>{t(`work.labels.${row}`)}</dt>
						<dd className='max-w-prose text-[1.0625rem] text-subfaded-text leading-[1.65] lg:col-span-9'>
							{t(`work.cases.${caseStudy.key}.${row}`)}
						</dd>
					</motion.div>
				))}

				<motion.div className='grid gap-x-14 gap-y-2 border-border border-t py-7 lg:grid-cols-12' variants={fadeUp}>
					<dt className={`${eyebrowClass} lg:col-span-3`}>{t('work.labels.role')}</dt>
					<dd className='max-w-prose text-[1.0625rem] text-subfaded-text leading-[1.65] lg:col-span-9'>
						{t(`work.cases.${caseStudy.key}.role`)}
					</dd>
				</motion.div>
			</motion.dl>
		</article>
	);
};
