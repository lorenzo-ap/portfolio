import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ContactCta, Eyebrow, PageHeader, Reveal, RevealGroup, RevealItem, Section, Statement } from '../components';
import { site } from '../data/site';

const principleKeys = ['problem', 'smallest', 'maintainable', 'ai'] as const;
const workingKeys = ['noSpec', 'notSure', 'tooSmall', 'existing', 'managing', 'money'] as const;

export const AboutPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader eyebrow={t('nav.about')} lede={t('about.lede')} title={t('about.title')} />

			<Section divider={false}>
				<div className='grid gap-x-16 gap-y-10 lg:grid-cols-12'>
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
							<RevealItem as='li' key={key}>
								<div className='group row grid gap-x-8 gap-y-2 py-9 last:border-b last:border-b-border sm:grid-cols-12'>
									<span className='relative font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-2'>
										{String(index + 1).padStart(2, '0')}
									</span>

									<div className='row__shift relative sm:col-span-10'>
										<h2 className='font-medium text-text text-title'>{t(`about.principles.items.${key}.title`)}</h2>
										<p className='mt-3 max-w-prose text-body-sm text-faded-text'>
											{t(`about.principles.items.${key}.body`)}
										</p>
									</div>
								</div>
							</RevealItem>
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
							<RevealItem as='li' key={key}>
								<div className='group row grid gap-x-8 gap-y-2 py-7 last:border-b last:border-b-border sm:grid-cols-12'>
									<span className='relative font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-4'>
										{t(`about.working.items.${key}.label`)}
									</span>
									<p className='row__shift relative max-w-prose text-body-sm text-subfaded-text sm:col-span-8'>
										{t(`about.working.items.${key}.body`)}
									</p>
								</div>
							</RevealItem>
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
