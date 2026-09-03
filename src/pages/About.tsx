import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
	ContactCta,
	Eyebrow,
	MarkerRow,
	Portrait,
	ProcessLadder,
	Reveal,
	RevealGroup,
	Section,
	Statement,
	StepCounter
} from '../components';
import { processStepKeys } from '../data/capabilities';
import { site } from '../data/site';

const principleKeys = ['problem', 'smallest', 'maintainable', 'ai'] as const;
const workingKeys = ['noSpec', 'notSure', 'tooSmall', 'existing', 'managing', 'money'] as const;

/** Below this the left columns stick while their lists scroll past. */
const stickyAside = 'lg:sticky lg:top-32 lg:self-start';

export const AboutPage = () => {
	const { t } = useTranslation();
	const [activeStep, setActiveStep] = useState(0);

	return (
		<>
			{/*
			 * The opening is its own composition rather than the shared `PageHeader`:
			 * the photo sits beside the title, and the paragraphs run on under the
			 * title so the two columns finish near each other. On a phone the photo
			 * falls between the lede and the paragraphs.
			 */}
			<header className='shell pt-14 pb-14 sm:pt-24 sm:pb-20 lg:pt-36 lg:pb-28'>
				<Reveal>
					<Eyebrow className='mb-7 sm:mb-9'>{t('nav.about')}</Eyebrow>
				</Reveal>

				<div className='grid gap-x-16 gap-y-10 lg:grid-cols-12 lg:gap-y-14'>
					<div className='lg:col-span-6'>
						<Statement as='h1' className='max-w-[13ch] text-display-sm' delay={0.05} immediate>
							{t('about.title')}
						</Statement>

						<Reveal className='mt-8 sm:mt-10' delay={0.24}>
							<p className='max-w-prose text-faded-text text-lede'>{t('about.lede')}</p>
						</Reveal>
					</div>

					<Portrait className='max-w-lg lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-start' />

					<div className='flex max-w-prose flex-col gap-6 text-body text-faded-text lg:col-span-6'>
						<Reveal>
							<p className='text-text'>
								<Trans
									components={{
										barca: <Link className='link link__accent' target='_blank' to={site.currentCompany.link} />
									}}
									i18nKey='about.intro'
									t={t}
								/>
							</p>
						</Reveal>
						<Reveal delay={0.06}>
							<p>{t('about.freelance')}</p>
						</Reveal>
						<Reveal delay={0.1}>
							<p>{t('about.career')}</p>
						</Reveal>
						<Reveal delay={0.14}>
							<p>{t('about.interests')}</p>
						</Reveal>
					</div>
				</div>
			</header>

			<Section>
				<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
					<div className={`lg:col-span-4 ${stickyAside}`}>
						<Reveal>
							<Eyebrow className='mb-8'>{t('process.eyebrow')}</Eyebrow>
						</Reveal>

						<Statement className='max-w-[14ch] text-headline' delay={0.06}>
							{t('process.title')}
						</Statement>

						<Reveal delay={0.16}>
							<p className='mt-6 max-w-prose text-body-sm text-faded-text'>{t('process.lede')}</p>
						</Reveal>

						<Reveal className='mt-12 hidden border-border border-t pt-8 lg:block' delay={0.22}>
							<StepCounter step={activeStep} total={processStepKeys.length} />
						</Reveal>
					</div>

					<div className='lg:col-span-7 lg:col-start-6'>
						<ProcessLadder onStepChange={setActiveStep} />
					</div>
				</div>
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
					<div className={`lg:col-span-4 ${stickyAside}`}>
						<Reveal>
							<Eyebrow className='mb-8'>{t('about.principles.eyebrow')}</Eyebrow>
						</Reveal>

						<Statement className='max-w-[14ch] text-headline' delay={0.06}>
							{t('about.principles.title')}
						</Statement>
					</div>

					<RevealGroup as='ul' className='lg:col-span-7 lg:col-start-6' step={0.06}>
						{principleKeys.map((key, index) => (
							<MarkerRow
								key={key}
								marker={String(index + 1).padStart(2, '0')}
								title={t(`about.principles.items.${key}.title`)}
							>
								{t(`about.principles.items.${key}.body`)}
							</MarkerRow>
						))}
					</RevealGroup>
				</div>
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
					<div className={`lg:col-span-4 ${stickyAside}`}>
						<Statement className='max-w-[16ch] text-headline'>{t('about.working.title')}</Statement>

						<Reveal delay={0.14}>
							<p className='mt-6 max-w-prose text-body-sm text-faded-text'>{t('about.working.intro')}</p>
						</Reveal>
					</div>

					<RevealGroup as='ul' className='lg:col-span-7 lg:col-start-6' step={0.05}>
						{workingKeys.map((key) => (
							<MarkerRow key={key} marker={t(`about.working.items.${key}.label`)} wideMarker>
								{t(`about.working.items.${key}.body`)}
							</MarkerRow>
						))}
					</RevealGroup>
				</div>
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-8 lg:grid-cols-12'>
					<div className='lg:col-span-5'>
						<Statement className='max-w-[14ch] text-headline'>{t('about.outro.title')}</Statement>
					</div>
					<Reveal className='lg:col-span-6 lg:col-start-7' delay={0.14}>
						<p className='max-w-prose text-body text-faded-text'>{t('about.outro.body')}</p>
					</Reveal>
				</div>
			</Section>

			<ContactCta />
		</>
	);
};
