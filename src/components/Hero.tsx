import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { mailto, site } from '../data/site';
import { usePointerSpotlight } from '../hooks';
import { ease, lineReveal, stagger } from '../lib/motion';
import { ButtonLink } from './Button';

const headlineLines = ['hero.headline.line1', 'hero.headline.line2', 'hero.headline.line3'] as const;

interface FactProps {
	label: string;
	children: React.ReactNode;
}

const Fact = ({ label, children }: FactProps) => (
	<div className='flex flex-col gap-1.5 border-border border-t pt-4'>
		<span className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>{label}</span>
		<span className='text-[0.9375rem] text-subfaded-text leading-snug'>{children}</span>
	</div>
);

export const Hero = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const { ref: spotlightRef, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
	const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

	return (
		<section className='relative overflow-hidden' onPointerMove={onPointerMove} ref={sectionRef}>
			<div aria-hidden='true' className='absolute inset-0' ref={spotlightRef}>
				<div className='mask-fade-y grid-backdrop absolute inset-0' />
				<div className='spotlight absolute inset-0' />
			</div>

			<motion.div
				className='shell relative flex min-h-[calc(100svh-68px)] flex-col justify-center py-20 lg:py-24'
				style={{ y: contentY, opacity: contentOpacity }}
			>
				<motion.div animate='visible' initial='hidden' variants={stagger(0.09, 0.15)}>
					<motion.div
						className='mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5 backdrop-blur-sm lg:mb-9'
						variants={{
							hidden: { opacity: 0, y: 10 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
						}}
					>
						<span className='relative flex h-1.5 w-1.5'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70' />
							<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-accent' />
						</span>
						<span className='font-medium font-mono text-[0.6875rem] text-subfaded-text uppercase tracking-[0.12em]'>
							{t('hero.status')}
						</span>
					</motion.div>

					<h1 className='font-semibold text-display text-text'>
						{headlineLines.map((line) => (
							<span className='block overflow-hidden pb-[0.06em]' key={line}>
								<motion.span className='block' variants={lineReveal}>
									{t(line)}
								</motion.span>
							</span>
						))}
					</h1>

					<motion.p
						className='mt-8 max-w-[54ch] text-faded-text text-lede'
						variants={{
							hidden: { opacity: 0, y: 14 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.25 } }
						}}
					>
						{t('hero.lede')}
					</motion.p>

					<motion.div
						className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'
						variants={{
							hidden: { opacity: 0, y: 14 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.35 } }
						}}
					>
						<ButtonLink className='w-full sm:w-auto' href={mailto()}>
							{t('actions.startConversation')}
						</ButtonLink>
						<ButtonLink className='w-full sm:w-auto' to='/work' variant='ghost' withArrow={false}>
							{t('actions.seeWork')}
						</ButtonLink>
					</motion.div>

					<motion.div
						className='mt-12 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-3 lg:mt-16'
						variants={{
							hidden: { opacity: 0, y: 14 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.45 } }
						}}
					>
						<Fact label={t('hero.facts.currentLabel')}>
							{t('hero.facts.currentValue')}{' '}
							<Link className='link link__accent' target='_blank' to={site.currentCompany.link}>
								{site.currentCompany.name}
							</Link>
						</Fact>
						<Fact label={t('hero.facts.latestLabel')}>
							<Link className='link link__accent' target='_blank' to='https://www.ainterest.me'>
								{t('hero.facts.latestValue')}
							</Link>
						</Fact>
						<Fact label={t('hero.facts.studyingLabel')}>{t('hero.facts.studyingValue')}</Fact>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
};
