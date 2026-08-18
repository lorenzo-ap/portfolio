import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fadeUp, inView, inViewOnce, stagger, wipeUp } from '../lib/motion';
import type { CaseStudyModel } from '../types';
import { ActionLink } from './ActionLink';
import { ProjectPoster } from './ProjectPoster';
import { Reveal } from './Reveal';
import { Statement } from './Statement';

interface CaseStudyProps {
	caseStudy: CaseStudyModel;
	index: number;
}

const metaClass = 'font-medium font-mono text-eyebrow text-faded-text uppercase';

/** Index + kind, the pair that tells you what sort of work you're looking at. */
export const CaseStudyMeta = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();

	return (
		<div className={`flex items-center gap-3.5 ${metaClass}`}>
			<span className='text-accent'>{String(index + 1).padStart(2, '0')}</span>
			<span aria-hidden='true' className='h-px w-6 bg-border-strong' />
			<span>{t(`work.kinds.${caseStudy.kind}`)}</span>
		</div>
	);
};

interface CaseStudyLinksProps {
	caseStudy: CaseStudyModel;
}

/** Primary link always; the App Store or another destination alongside it. */
const CaseStudyLinks = ({ caseStudy }: CaseStudyLinksProps) => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-wrap items-center gap-x-8 gap-y-3'>
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
const CourseFacts = ({ compact = false }: { compact?: boolean }) => {
	const { t } = useTranslation();

	return (
		<dl className={compact ? 'grid gap-x-10 gap-y-5 sm:grid-cols-2' : 'flex flex-col'}>
			{courseFactKeys.map((factKey) => (
				<div
					className={
						compact
							? 'flex flex-col gap-1.5'
							: 'flex flex-col gap-1.5 border-border border-t py-4 first:border-t-0 first:pt-0'
					}
					key={factKey}
				>
					<dt className={metaClass}>{t(`work.course.${factKey}Label`)}</dt>
					<dd className='text-body-sm text-text'>{t(`work.course.${factKey}Value`)}</dd>
				</div>
			))}
		</dl>
	);
};

interface PosterLinkProps extends CaseStudyProps {
	className?: string;
	posterClassName?: string;
	priority?: boolean;
}

/** The poster as a destination. Lifts on hover, opens the product in a new tab. */
export const PosterLink = ({
	caseStudy,
	index,
	className = '',
	posterClassName = '',
	priority = false
}: PosterLinkProps) => {
	const { t } = useTranslation();

	return (
		<Link
			aria-label={caseStudy.name}
			className={`group/poster block transition-transform duration-700 ease-expo hover:-translate-y-1.5 ${className}`}
			target='_blank'
			to={caseStudy.link}
		>
			<ProjectPoster
				caseStudy={caseStudy}
				className={posterClassName}
				index={index}
				kind={t(`work.kinds.${caseStudy.kind}`)}
				priority={priority}
			/>
		</Link>
	);
};

interface PosterFrameProps extends CaseStudyProps {
	priority?: boolean;
	/** Full-width plate on the work page, where nothing sits beside it. */
	wide?: boolean;
}

/**
 * The poster, arriving on its own and moving at its own rate.
 *
 * The drift is small on purpose: enough that the image and the text beside it
 * are clearly two planes, not enough to notice as an effect. Skipped entirely
 * when the visitor has asked for reduced motion, since a scroll-linked
 * transform can't be softened, only removed.
 */
export const PosterFrame = ({ caseStudy, index, priority = false, wide = false }: PosterFrameProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const y = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);

	return (
		<div ref={ref}>
			<motion.div
				initial={inViewOnce.initial}
				style={prefersReducedMotion ? undefined : { y }}
				variants={wipeUp}
				viewport={inViewOnce.viewport}
				whileInView={inViewOnce.whileInView}
			>
				<PosterLink
					caseStudy={caseStudy}
					index={index}
					posterClassName={wide ? 'aspect-[16/9]' : ''}
					priority={priority}
				/>
			</motion.div>
		</div>
	);
};

interface WorkPanelProps extends CaseStudyProps {
	setActive: Dispatch<SetStateAction<number>>;
}

/**
 * One project inside the pinned work stage.
 *
 * The panel reports itself as active when it crosses the middle band of the
 * viewport, which is what drives the poster beside it. On narrow screens there
 * is nothing to pin, so the panel carries its own poster and reads as an
 * ordinary block.
 */
export const WorkPanel = ({ caseStudy, index, setActive }: WorkPanelProps) => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const isCentred = useInView(ref, { margin: '-45% 0px -45% 0px' });
	const isCourse = caseStudy.kind === 'course';

	useEffect(() => {
		if (isCentred) setActive(index);
	}, [isCentred, index, setActive]);

	return (
		<div
			className='flex flex-col justify-center border-border border-t py-16 first:border-t-0 first:pt-0 lg:min-h-[68vh] lg:border-t-0 lg:py-0'
			ref={ref}
		>
			<div className='mb-10 lg:hidden'>
				<PosterFrame caseStudy={caseStudy} index={index} priority={index === 0} />
			</div>

			<Reveal>
				<CaseStudyMeta caseStudy={caseStudy} index={index} />
			</Reveal>

			<Statement as='h3' className='mt-6 text-headline'>
				{caseStudy.name}
			</Statement>

			<Reveal delay={0.08}>
				<p className='mt-5 max-w-prose text-faded-text text-lede'>{t(`work.cases.${caseStudy.key}.summary`)}</p>
			</Reveal>

			{isCourse && (
				<Reveal className='mt-9 border-border border-t pt-8' delay={0.12}>
					<CourseFacts compact />
				</Reveal>
			)}

			<Reveal className='mt-9' delay={0.16}>
				<CaseStudyLinks caseStudy={caseStudy} />
			</Reveal>
		</div>
	);
};

const narrativeRows = ['situation', 'contribution', 'challenge', 'proof', 'role'] as const;

/** Work page: the full Situation → What I did → Hard part → What this shows story. */
export const CaseStudyArticle = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();
	const isCourse = caseStudy.kind === 'course';

	return (
		<article className='border-border border-t pt-14 lg:pt-20'>
			<div className='grid gap-x-16 gap-y-8 lg:grid-cols-12'>
				<div className='lg:col-span-7'>
					<Reveal>
						<CaseStudyMeta caseStudy={caseStudy} index={index} />
					</Reveal>

					<Statement as='h2' className='mt-7 text-statement'>
						{caseStudy.name}
					</Statement>
				</div>

				<div className='flex flex-col justify-end gap-7 lg:col-span-4 lg:col-start-9'>
					<Reveal delay={0.1}>
						<p className='max-w-prose text-faded-text text-lede'>{t(`work.cases.${caseStudy.key}.summary`)}</p>
					</Reveal>

					<Reveal delay={0.14}>
						<CaseStudyLinks caseStudy={caseStudy} />
					</Reveal>
				</div>
			</div>

			<motion.div
				className='mt-14 grid gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-12'
				initial={inViewOnce.initial}
				variants={stagger(0.08)}
				viewport={inViewOnce.viewport}
				whileInView={inViewOnce.whileInView}
			>
				<div className={isCourse ? 'lg:col-span-7' : 'lg:col-span-12'}>
					<PosterFrame caseStudy={caseStudy} index={index} priority={index === 0} wide={!isCourse} />
				</div>

				{isCourse && (
					<motion.div className='lg:col-span-4 lg:col-start-9' variants={fadeUp}>
						<CourseFacts />
						<p className='mt-8 max-w-prose text-body-sm text-faded-text'>{t('work.course.note')}</p>
					</motion.div>
				)}
			</motion.div>

			<motion.dl
				className='mt-16 border-border border-b'
				initial={inView.initial}
				variants={stagger(0.06)}
				viewport={inView.viewport}
				whileInView={inView.whileInView}
			>
				{narrativeRows.map((row) => (
					<motion.div
						className='grid gap-x-16 gap-y-2 border-border border-t py-8 lg:grid-cols-12'
						key={row}
						variants={fadeUp}
					>
						<dt className={`${metaClass} lg:col-span-3`}>{t(`work.labels.${row}`)}</dt>
						<dd className='max-w-prose text-body text-subfaded-text lg:col-span-8 lg:col-start-5'>
							{t(`work.cases.${caseStudy.key}.${row}`)}
						</dd>
					</motion.div>
				))}
			</motion.dl>
		</article>
	);
};
