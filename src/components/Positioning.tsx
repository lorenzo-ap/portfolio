import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { ActionLink } from './ActionLink';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { Statement } from './Statement';

/**
 * Who you'd be working with, in one screen.
 *
 * The home page makes the claim and stops. How I actually work, what I've
 * settled on and what the first few weeks look like all live on /about now,
 * because a visitor who wants that has already decided to read about me, and
 * one who hasn't shouldn't have to scroll past it to reach the contact details.
 */
export const Positioning = () => {
	const { t } = useTranslation();

	return (
		<Section id='about'>
			<Reveal>
				<Eyebrow className='mb-6 sm:mb-8'>{t('aboutTeaser.eyebrow')}</Eyebrow>
			</Reveal>

			<div className='grid gap-x-16 gap-y-8 lg:grid-cols-12'>
				<div className='lg:col-span-5'>
					<Statement className='max-w-[13ch] text-statement' delay={0.06}>
						{t('aboutTeaser.title')}
					</Statement>
				</div>

				<div className='lg:col-span-6 lg:col-start-7'>
					<div className='flex max-w-prose flex-col gap-5 text-body text-faded-text'>
						<Reveal delay={0.12}>
							<p className='text-lede text-subfaded-text'>
								<Trans
									components={{
										barca: <Link className='link link__accent' target='_blank' to={site.currentCompany.link} />
									}}
									i18nKey='aboutTeaser.body1'
									t={t}
								/>
							</p>
						</Reveal>
						<Reveal delay={0.16}>
							<p>{t('aboutTeaser.body2')}</p>
						</Reveal>
						<Reveal delay={0.2}>
							<p>{t('aboutTeaser.body3')}</p>
						</Reveal>
					</div>

					<Reveal className='mt-8 sm:mt-10' delay={0.24}>
						<ActionLink label={t('actions.moreAbout')} to='/about' />
					</Reveal>
				</div>
			</div>
		</Section>
	);
};
