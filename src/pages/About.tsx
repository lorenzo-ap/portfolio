import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ContactCta, Eyebrow, PageHeader, Reveal, RevealGroup, RevealItem, Section } from '../components';
import { site } from '../data/site';

const principleKeys = ['problem', 'smallest', 'maintainable', 'ai'] as const;
const workingKeys = ['noSpec', 'notSure', 'tooSmall', 'existing', 'money'] as const;

interface DefinitionRow {
	label: string;
	value: string;
}

interface DefinitionTableProps {
	title: string;
	intro?: string;
	rows: DefinitionRow[];
}

const DefinitionTable = ({ title, intro, rows }: DefinitionTableProps) => {
	return (
		<div>
			<Reveal>
				<h2 className='font-semibold text-text text-title'>{title}</h2>
			</Reveal>

			{intro && (
				<Reveal delay={0.05}>
					<p className='mt-4 max-w-prose text-[1.0625rem] text-faded-text leading-[1.65]'>{intro}</p>
				</Reveal>
			)}

			<RevealGroup as='ul' className='mt-8 border-border border-t' step={0.05}>
				{rows.map((row) => (
					<RevealItem as='li' key={row.label}>
						<div className='grid gap-x-10 gap-y-1 border-border border-b py-4 sm:grid-cols-12'>
							<span className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em] sm:col-span-4'>
								{row.label}
							</span>
							<span className='max-w-prose text-[0.9375rem] text-text leading-relaxed sm:col-span-8'>{row.value}</span>
						</div>
					</RevealItem>
				))}
			</RevealGroup>
		</div>
	);
};

export const AboutPage = () => {
	const { t } = useTranslation();

	const workingRows: DefinitionRow[] = workingKeys.map((key) => ({
		label: t(`about.working.items.${key}.label`),
		value: t(`about.working.items.${key}.body`)
	}));

	return (
		<>
			<PageHeader eyebrow={t('nav.about')} lede={t('about.lede')} title={t('about.title')} />

			<Section divider={false}>
				<div className='grid gap-x-16 gap-y-10 lg:grid-cols-12'>
					<div className='flex max-w-prose flex-col gap-6 text-[1.0625rem] text-faded-text leading-[1.7] lg:col-span-8'>
						<Reveal>
							<p className='text-subfaded-text'>
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
			</Section>

			<Section>
				<Reveal>
					<Eyebrow className='mb-7'>{t('about.principles.title')}</Eyebrow>
				</Reveal>

				<RevealGroup
					className='grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2'
					step={0.06}
				>
					{principleKeys.map((key, index) => (
						<RevealItem
							className='group bg-bg-color p-8 transition-colors duration-500 ease-expo hover:bg-accent-soft'
							key={key}
						>
							<span className='font-medium font-mono text-[0.6875rem] text-faded-text transition-colors duration-500 ease-expo group-hover:text-accent'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className='mt-5 font-semibold text-[1.125rem] text-text tracking-tight'>
								{t(`about.principles.items.${key}.title`)}
							</h3>
							<p className='mt-3 text-[0.9375rem] text-faded-text leading-relaxed'>
								{t(`about.principles.items.${key}.body`)}
							</p>
						</RevealItem>
					))}
				</RevealGroup>
			</Section>

			<Section>
				<DefinitionTable intro={t('about.working.intro')} rows={workingRows} title={t('about.working.title')} />
			</Section>

			<Section>
				<div className='grid gap-x-16 gap-y-6 lg:grid-cols-12'>
					<Reveal className='lg:col-span-5'>
						<h2 className='font-semibold text-text text-title'>{t('about.outro.title')}</h2>
					</Reveal>
					<Reveal className='lg:col-span-7' delay={0.06}>
						<p className='max-w-prose text-[1.0625rem] text-faded-text leading-[1.7]'>{t('about.outro.body')}</p>
					</Reveal>
				</div>
			</Section>

			<div className='pb-[var(--section-gap)]'>
				<ContactCta />
			</div>
		</>
	);
};
