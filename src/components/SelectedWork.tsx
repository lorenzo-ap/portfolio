import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { caseStudies } from '../data/projects';
import { ease } from '../lib/motion';
import { ButtonLink } from './Button';
import { PosterLink, WorkPanel } from './CaseStudy';
import { Reveal } from './Reveal';
import { Section, SectionHeader } from './Section';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Selected work, as a stage rather than a list.
 *
 * The poster stays pinned while the four projects scroll through beside it, so
 * the imagery is at full size for the entire section instead of appearing and
 * leaving four times. Crossing the middle of the viewport is what changes it,
 * which means scroll position alone drives the whole thing and there is nothing
 * to click to make it work.
 *
 * Below the pinning breakpoint there is no stage: each project carries its own
 * poster and the section degrades to four ordinary blocks.
 */
export const SelectedWork = () => {
	const { t } = useTranslation();
	const [active, setActive] = useState(0);

	return (
		<Section id='work'>
			<SectionHeader
				aside={
					<Reveal delay={0.18}>
						<ButtonLink to='/work' variant='ghost'>
							{t('actions.allWork')}
						</ButtonLink>
					</Reveal>
				}
				eyebrow={t('work.eyebrow')}
				lede={t('work.lede')}
				title={t('work.title')}
			/>

			<div className='mt-20 lg:mt-28 lg:grid lg:grid-cols-12 lg:gap-x-16'>
				<div className='hidden lg:col-span-6 lg:block'>
					<div className='sticky top-[7.5rem]'>
						<div className='relative aspect-[4/3]'>
							{caseStudies.map((caseStudy, index) => (
								<motion.div
									animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.03 }}
									className='absolute inset-0'
									initial={false}
									key={caseStudy.key}
									style={{ pointerEvents: index === active ? 'auto' : 'none' }}
									transition={{ duration: 0.7, ease }}
								>
									<PosterLink
										caseStudy={caseStudy}
										className='h-full'
										index={index}
										posterClassName='h-full'
										priority={index === 0}
									/>
								</motion.div>
							))}
						</div>

						<div className='mt-8 flex items-center gap-6'>
							<span className='font-medium font-mono text-eyebrow text-faded-text uppercase tabular-nums'>
								{pad(active + 1)} / {pad(caseStudies.length)}
							</span>

							<span aria-hidden='true' className='flex flex-1 gap-1.5'>
								{caseStudies.map((caseStudy, index) => (
									<span
										className={`h-px flex-1 origin-left transition-colors duration-700 ease-expo ${
											index <= active ? 'bg-accent' : 'bg-border'
										}`}
										key={caseStudy.key}
									/>
								))}
							</span>
						</div>
					</div>
				</div>

				<div className='lg:col-span-5 lg:col-start-8'>
					{caseStudies.map((caseStudy, index) => (
						<WorkPanel caseStudy={caseStudy} index={index} key={caseStudy.key} setActive={setActive} />
					))}
				</div>
			</div>
		</Section>
	);
};
