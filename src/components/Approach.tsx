import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { processStepKeys } from '../data/capabilities';
import { site } from '../data/site';
import { ActionLink } from './ActionLink';
import { Eyebrow } from './Eyebrow';
import { Reveal, RevealGroup, RevealItem } from './Reveal';
import { Section } from './Section';
import { Statement } from './Statement';

/**
 * The four steps, threaded onto a spine that fills as the section scrolls past.
 * It's the only progress indicator on the site, and it's here because this is
 * the one place the order of things is the point.
 */
const ProcessLadder = () => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });
	const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

	return (
		<div className='relative mt-12 pl-8' ref={ref}>
			<span aria-hidden='true' className='absolute top-0 left-0 h-full w-px bg-border' />
			<motion.span
				aria-hidden='true'
				className='absolute top-0 left-0 h-full w-px origin-top bg-accent'
				style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: fill }}
			/>

			<RevealGroup as='ol' step={0.06}>
				{processStepKeys.map((key, index) => (
					<RevealItem as='li' key={key}>
						<div className='group grid gap-x-8 gap-y-2 border-border border-t py-7 first:border-t-0 first:pt-0 sm:grid-cols-12'>
							<span className='font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-2'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<div className='sm:col-span-10'>
								<h3 className='font-medium text-[1.0625rem] text-text tracking-tight'>
									{t(`process.steps.${key}.title`)}
								</h3>
								<p className='mt-2 max-w-prose text-body-sm text-faded-text'>{t(`process.steps.${key}.body`)}</p>
							</div>
						</div>
					</RevealItem>
				))}
			</RevealGroup>
		</div>
	);
};

/**
 * Who you'd be working with, and what that looks like.
 *
 * This used to be two sections: a "how I work" process strip and an about
 * teaser, each with its own heading and its own supporting sentence. They were
 * answering one question, so they're one section now. The claim sits on the
 * left and the four steps that back it up sit on the right, which is also the
 * order somebody reads them in.
 */
export const Approach = () => {
	const { t } = useTranslation();

	return (
		<Section id='approach'>
			<div className='grid gap-x-16 gap-y-16 lg:grid-cols-12'>
				<div className='lg:col-span-5'>
					<Reveal>
						<Eyebrow className='mb-8'>{t('aboutTeaser.eyebrow')}</Eyebrow>
					</Reveal>

					<Statement className='max-w-[14ch] text-statement' delay={0.06}>
						{t('aboutTeaser.title')}
					</Statement>

					<div className='mt-10 flex max-w-prose flex-col gap-5 text-body text-faded-text'>
						<Reveal delay={0.14}>
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
						<Reveal delay={0.18}>
							<p>{t('aboutTeaser.body2')}</p>
						</Reveal>
						<Reveal delay={0.22}>
							<p className='text-subfaded-text'>{t('aboutTeaser.body3')}</p>
						</Reveal>
					</div>

					<Reveal className='mt-10' delay={0.26}>
						<ActionLink label={t('actions.moreAbout')} to='/about' />
					</Reveal>
				</div>

				<div className='lg:col-span-6 lg:col-start-7'>
					<Reveal>
						<Eyebrow className='mb-8'>{t('process.eyebrow')}</Eyebrow>
					</Reveal>

					<Reveal delay={0.06}>
						<p className='max-w-[22ch] font-medium text-text text-title'>{t('process.title')}</p>
					</Reveal>

					<ProcessLadder />
				</div>
			</div>
		</Section>
	);
};
