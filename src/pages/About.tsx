import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
	ContactCta,
	Eyebrow,
	MarkerRow,
	PageHeader,
	ProcessLadder,
	Reveal,
	RevealGroup,
	RevealItem,
	Section,
	Statement
} from '../components';
import { caseStudies } from '../data/projects';
import { site } from '../data/site';

const principleKeys = ['problem', 'smallest', 'maintainable', 'ai'] as const;
const workingKeys = ['noSpec', 'notSure', 'tooSmall', 'existing', 'managing', 'money'] as const;

/** Kept in sync with the work list rather than repeating the address here. */
const ownProduct = caseStudies.find((caseStudy) => caseStudy.kind === 'product');

interface Fact {
	label: string;
	value: ReactNode;
}

/**
 * Three lines of metadata beside the opening paragraphs.
 *
 * These used to sit under the hero, where they were competing with the headline
 * and the call to action. They answer "who is this person, right now", which is
 * the question this page exists for.
 */
const FactList = ({ facts }: { facts: Fact[] }) => (
	<RevealGroup as='ul' className='border-border border-t' step={0.06}>
		{facts.map((fact) => (
			<RevealItem as='li' key={fact.label}>
				<div className='flex flex-col gap-2 border-border border-b py-5'>
					<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>{fact.label}</span>
					<span className='text-body-sm text-text'>{fact.value}</span>
				</div>
			</RevealItem>
		))}
	</RevealGroup>
);

export const AboutPage = () => {
	const { t } = useTranslation();

	const facts: Fact[] = [
		{
			label: t('hero.facts.currentLabel'),
			value: (
				<>
					{t('hero.facts.currentValue')}{' '}
					<Link className='link link__accent' target='_blank' to={site.currentCompany.link}>
						{site.currentCompany.name}
					</Link>
				</>
			)
		},
		{
			label: t('hero.facts.latestLabel'),
			value: ownProduct ? (
				<Link className='link link__accent' target='_blank' to={ownProduct.link}>
					{t('hero.facts.latestValue')}
				</Link>
			) : (
				t('hero.facts.latestValue')
			)
		},
		{ label: t('hero.facts.studyingLabel'), value: t('hero.facts.studyingValue') }
	];

	return (
		<>
			<PageHeader eyebrow={t('nav.about')} lede={t('about.lede')} title={t('about.title')} />

			<Section divider={false}>
				<div className='grid gap-x-16 gap-y-14 lg:grid-cols-12'>
					<div className='flex max-w-prose flex-col gap-6 text-body text-faded-text lg:col-span-7'>
						<Reveal>
							<p className='text-lede text-subfaded-text'>
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

					<div className='lg:col-span-4 lg:col-start-9'>
						<FactList facts={facts} />
					</div>
				</div>
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
					<div className='lg:col-span-4'>
						<Reveal>
							<Eyebrow className='mb-8'>{t('process.eyebrow')}</Eyebrow>
						</Reveal>

						<Statement className='max-w-[14ch] text-headline' delay={0.06}>
							{t('process.title')}
						</Statement>

						<Reveal delay={0.16}>
							<p className='mt-6 max-w-prose text-body-sm text-faded-text'>{t('process.lede')}</p>
						</Reveal>
					</div>

					<div className='lg:col-span-7 lg:col-start-6'>
						<ProcessLadder />
					</div>
				</div>
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
					<div className='lg:col-span-4'>
						<Reveal>
							<Eyebrow className='mb-8'>{t('about.principles.title')}</Eyebrow>
						</Reveal>
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
					<div className='lg:col-span-4'>
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
