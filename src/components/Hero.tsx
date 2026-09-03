import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { mailto } from '../data/site';
import { useMediaQuery, usePointerParallax } from '../hooks';
import { settle, stagger } from '../lib/motion';
import { ButtonLink } from './Button';
import { HeroVisual } from './HeroVisual';
import { StatementLine } from './Statement';

const headlineLines = ['hero.headline.line1', 'hero.headline.line2', 'hero.headline.line3'] as const;

/**
 * The hero.
 *
 * Two things, in the order they matter: the sentence that says what I do, and
 * one composition that shows it. The work isn't listed here any more. An index
 * of four projects under the headline turned the first screen into a contents
 * page, and the section directly below is already the work.
 *
 * The composition is positioned rather than placed, so it fills the quarter the
 * headline leaves empty instead of pushing the call to action under the fold.
 * Below the pointer breakpoints it stops being a floating panel and becomes the
 * last block of the hero, simplified to the pieces that still read at 390px.
 *
 * Leaving is choreographed too. The headline, the call to action and the visual
 * travel at three different rates as the page scrolls, so the hero comes apart
 * into layers instead of sliding away as one flat card.
 */
export const Hero = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	// Measured across the composition, driven from the whole hero: the layers
	// start leaning while the cursor is still somewhere over the headline.
	const { ref: visualRef, onPointerMove, onPointerLeave } = usePointerParallax<HTMLDivElement>(2.6);

	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
	const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
	const lowerY = useTransform(scrollYProgress, [0, 1], [0, -130]);
	const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
	const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

	const depth = (value: typeof headlineY) => (prefersReducedMotion ? undefined : { y: value, opacity: fade });

	return (
		<section
			className='relative overflow-hidden'
			onPointerLeave={onPointerLeave}
			onPointerMove={onPointerMove}
			ref={sectionRef}
		>
			<div aria-hidden='true' className='edge-fade grid-backdrop absolute inset-0' />

			<div className='shell relative flex min-h-[calc(100svh-var(--header-h)-3rem)] flex-col justify-center pt-8 pb-10 sm:pt-12 lg:pt-14 lg:pb-14'>
				<motion.div animate='visible' className='relative' initial='hidden' variants={stagger(0.08, 0.1)}>
					<motion.div style={depth(headlineY)}>
						<motion.p
							className='flex items-center gap-2.5 font-medium font-mono text-eyebrow text-subfaded-text uppercase'
							variants={settle(0)}
						>
							<span aria-hidden='true' className='pulse' />
							{t('hero.status')}
						</motion.p>

						<h1 className='statement mt-7 text-display sm:mt-9 lg:mt-11'>
							{headlineLines.map((line, index) => (
								<StatementLine
									className={index === headlineLines.length - 1 ? 'italic' : ''}
									delay={0.22 + index * 0.13}
									key={line}
								>
									{t(line)}
								</StatementLine>
							))}
						</h1>
					</motion.div>

					<motion.div className='mt-8 sm:mt-11 lg:mt-14' style={depth(lowerY)}>
						<motion.p className='max-w-[46ch] text-faded-text text-lede' variants={settle(0.5)}>
							{t('hero.lede')}
						</motion.p>

						<motion.div
							className='mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center'
							variants={settle(0.58)}
						>
							<ButtonLink className='w-full sm:w-auto' href={mailto()} magnetic>
								{t('actions.startConversation')}
							</ButtonLink>
							<ButtonLink className='w-full sm:w-auto' to='/work' variant='ghost' withArrow={false}>
								{t('actions.seeWork')}
							</ButtonLink>
						</motion.div>
					</motion.div>

					{/*
					 * Scroll owns the outer transform and the composition owns everything
					 * inside it, which is also why the scroll depth is desktop-only: on a
					 * phone the visual is the last thing in the hero, and fading out what
					 * somebody has just scrolled down to reach is the opposite of depth.
					 */}
					<motion.div
						className='mt-14 sm:mt-16 lg:absolute lg:inset-y-0 lg:right-[calc(var(--shell-gutter)*-0.4)] lg:mt-0 lg:flex lg:w-[clamp(19rem,29vw,27rem)] lg:items-center'
						style={isDesktop && !prefersReducedMotion ? { y: visualY, opacity: fade } : undefined}
					>
						<div className='w-full max-w-[24rem] sm:max-w-[30rem] lg:max-w-none' ref={visualRef}>
							<HeroVisual />
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
