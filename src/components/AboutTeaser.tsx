import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { ActionLink } from './ActionLink';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { Section } from './Section';

const stackRows = [
	{ labelKey: 'about.techStack.frontend' as const, value: 'React, Next.js, Solid.js, Angular' },
	{ labelKey: 'about.techStack.backend' as const, value: 'Fastify, Express, Node.js' },
	{ labelKey: 'about.techStack.agentic' as const, value: 'Claude Code' }
];

export const AboutTeaser = () => {
	const { t } = useTranslation();

	return (
		<Section id='about'>
			<div className='grid gap-x-16 gap-y-12 lg:grid-cols-12'>
				<div className='lg:col-span-7'>
					<Reveal>
						<Eyebrow className='mb-6'>{t('aboutTeaser.eyebrow')}</Eyebrow>
					</Reveal>

					<Reveal delay={0.06}>
						<h2 className='max-w-[18ch] text-balance font-semibold text-headline text-text'>
							{t('aboutTeaser.title')}
						</h2>
					</Reveal>

					<div className='mt-8 flex max-w-prose flex-col gap-5 text-[1.0625rem] text-faded-text leading-[1.65]'>
						<Reveal delay={0.1}>
							<p>
								<Trans
									components={{
										barca: <Link className='link link__accent' target='_blank' to={site.currentCompany.link} />
									}}
									i18nKey='aboutTeaser.body1'
									t={t}
								/>
							</p>
						</Reveal>
						<Reveal delay={0.14}>
							<p>{t('aboutTeaser.body2')}</p>
						</Reveal>
						<Reveal delay={0.18}>
							<p className='text-subfaded-text'>{t('aboutTeaser.body3')}</p>
						</Reveal>
					</div>

					<Reveal className='mt-9' delay={0.22}>
						<ActionLink label={t('actions.moreAbout')} to='/about' />
					</Reveal>
				</div>

				<div className='lg:col-span-5'>
					<Reveal delay={0.12}>
						<div className='rounded-2xl border border-border bg-surface p-8'>
							<p className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
								{t('about.techStack.title')}
							</p>

							<dl className='mt-6 flex flex-col'>
								{stackRows.map((row) => (
									<div
										className='flex flex-col gap-1 border-border border-t py-4 first:border-t-0 first:pt-0'
										key={row.labelKey}
									>
										<dt className='text-[0.8125rem] text-faded-text'>{t(row.labelKey)}</dt>
										<dd className='text-[0.9375rem] text-text'>{row.value}</dd>
									</div>
								))}
							</dl>
						</div>
					</Reveal>
				</div>
			</div>
		</Section>
	);
};
