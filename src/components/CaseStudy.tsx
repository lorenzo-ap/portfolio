import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fadeUp, inView, stagger } from '../lib/motion';
import type { CaseStudyModel, Skill } from '../types';
import { ActionLink } from './ActionLink';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './Reveal';

interface SkillChipsProps {
	skills: Skill[];
	className?: string;
}

export const SkillChips = ({ skills, className = '' }: SkillChipsProps) => (
	<ul className={`flex flex-wrap gap-1.5 ${className}`}>
		{skills.map((skill) => (
			<li
				className='rounded-full border border-border px-2.5 py-1 font-medium font-mono text-[0.6875rem] text-faded-text'
				key={skill}
			>
				{skill}
			</li>
		))}
	</ul>
);

interface CaseStudyProps {
	caseStudy: CaseStudyModel;
	index: number;
}

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
				<div className='flex items-center gap-3 font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
					<span className='text-accent'>{String(index + 1).padStart(2, '0')}</span>
					<span aria-hidden='true' className='h-px w-5 bg-border-strong' />
					<span>{t(`work.kinds.${caseStudy.kind}`)}</span>
				</div>

				<h3 className='mt-5 font-semibold text-text text-title'>{caseStudy.name}</h3>

				<p className='mt-3 text-[1.0625rem] text-faded-text leading-relaxed'>
					{t(`work.cases.${caseStudy.key}.summary`)}
				</p>

				<p className='mt-5 max-w-prose text-[0.9375rem] text-subfaded-text leading-relaxed'>
					{t(`work.cases.${caseStudy.key}.challenge`)}
				</p>

				<SkillChips className='mt-6' skills={caseStudy.skills} />

				<div className='mt-7'>
					<ActionLink external href={caseStudy.link} label={t('actions.visitSite')} />
				</div>
			</motion.div>
		</motion.article>
	);
};

const narrativeRows = ['problem', 'built', 'challenge', 'value'] as const;

/** Work page: the full Problem → Built → Hard part → Value story. */
export const CaseStudyArticle = ({ caseStudy, index }: CaseStudyProps) => {
	const { t } = useTranslation();

	return (
		<article className='border-border border-t pt-12 lg:pt-16'>
			<div className='grid gap-x-14 gap-y-6 lg:grid-cols-12'>
				<div className='lg:col-span-7'>
					<Reveal>
						<div className='flex items-center gap-3 font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
							<span className='text-accent'>{String(index + 1).padStart(2, '0')}</span>
							<span aria-hidden='true' className='h-px w-5 bg-border-strong' />
							<span>{t(`work.kinds.${caseStudy.kind}`)}</span>
						</div>
					</Reveal>

					<Reveal delay={0.06}>
						<h2 className='mt-5 font-semibold text-display-sm text-text'>{caseStudy.name}</h2>
					</Reveal>
				</div>

				<div className='flex flex-col justify-end gap-6 lg:col-span-5'>
					<Reveal delay={0.1}>
						<p className='max-w-prose text-faded-text text-lede'>{t(`work.cases.${caseStudy.key}.summary`)}</p>
					</Reveal>

					<Reveal delay={0.14}>
						<div className='flex flex-wrap items-center gap-x-7 gap-y-3'>
							<ActionLink external href={caseStudy.link} label={t('actions.visitSite')} />
							{caseStudy.secondaryLink && (
								<ActionLink
									external
									href={caseStudy.secondaryLink.href}
									label={t(`actions.${caseStudy.secondaryLink.labelKey}`)}
									muted
								/>
							)}
						</div>
					</Reveal>
				</div>
			</div>

			<Reveal className='mt-12' delay={0.08}>
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
						<dt className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em] lg:col-span-3'>
							{t(`work.labels.${row}`)}
						</dt>
						<dd className='max-w-prose text-[1.0625rem] text-subfaded-text leading-[1.65] lg:col-span-9'>
							{t(`work.cases.${caseStudy.key}.${row}`)}
						</dd>
					</motion.div>
				))}

				<motion.div className='grid gap-x-14 gap-y-3 border-border border-t py-7 lg:grid-cols-12' variants={fadeUp}>
					<dt className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em] lg:col-span-3'>
						{t('work.labels.stack')}
					</dt>
					<dd className='lg:col-span-9'>
						<SkillChips skills={caseStudy.skills} />
					</dd>
				</motion.div>
			</motion.dl>
		</article>
	);
};
