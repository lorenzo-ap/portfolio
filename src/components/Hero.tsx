import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/projects';
import { mailto } from '../data/site';
import { useMagnetic } from '../hooks';
import { ease, ruleReveal, stagger } from '../lib/motion';
import { ButtonLink } from './Button';
import { ProjectPoster } from './ProjectPoster';
import { StatementLine } from './Statement';

const headlineLines = ['hero.headline.line1', 'hero.headline.line2', 'hero.headline.line3'] as const;

/** Everything after the headline arrives on the same curve, just later. */
const settle = (delay: number) => ({
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } }
});

/**
 * The hero.
 *
 * One visual idea, and it belongs to the work rather than to the animation: the
 * four projects sit along the bottom edge as an index, and pointing at one
 * brings its poster up beside the headline. The hero is the introduction and the
 * table of contents at the same time, which is why there's no third block of
 * copy explaining what's below.
 *
 * Leaving it is choreographed too. The headline, the call to action and the
 * poster travel at three different rates as the page scrolls, so the hero comes
 * apart into layers instead of sliding away as one flat card.
 */
export const Hero = () => {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const { ref: posterRef, onPointerMove, onPointerLeave } = useMagnetic<HTMLDivElement>(0.035);

	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
	const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
	const lowerY = useTransform(scrollYProgress, [0, 1], [0, -130]);
	const posterY = useTransform(scrollYProgress, [0, 1], [0, 90]);
	const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

	const active = caseStudies[activeIndex];
	const depth = (value: typeof headlineY) => (prefersReducedMotion ? undefined : { y: value, opacity: fade });

	return (
		<section
			className='relative overflow-hidden'
			onPointerLeave={onPointerLeave}
			onPointerMove={onPointerMove}
			ref={sectionRef}
		>
			<div aria-hidden='true' className='edge-fade grid-backdrop absolute inset-0' />

			<div className='shell relative flex min-h-[calc(100svh-80px)] flex-col justify-between gap-10 pt-12 pb-5 lg:pt-14'>
				<motion.div
					animate='visible'
					className='relative flex flex-1 flex-col justify-center'
					initial='hidden'
					variants={stagger(0.08, 0.1)}
				>
					<motion.div style={depth(headlineY)}>
						<motion.p
							className='flex items-center gap-2.5 font-medium font-mono text-eyebrow text-subfaded-text uppercase'
							variants={settle(0)}
						>
							<span aria-hidden='true' className='pulse' />
							{t('hero.status')}
						</motion.p>

						<h1 className='statement mt-9 text-display lg:mt-11'>
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

					<motion.div className='mt-11 lg:mt-14' style={depth(lowerY)}>
						<motion.p className='max-w-[46ch] text-faded-text text-lede' variants={settle(0.5)}>
							{t('hero.lede')}
						</motion.p>

						<motion.div
							className='mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'
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
					 * The rail's payoff, and the reason it can be this large: the poster is
					 * positioned rather than placed, so it fills the empty quarter the
					 * headline leaves behind instead of pushing the call to action under
					 * the fold. Hidden where there's no pointer to drive it.
					 */}
					<motion.div
						className='pointer-events-none absolute right-[calc(var(--shell-gutter)*-0.5)] bottom-[7rem] hidden w-[clamp(17rem,25vw,25rem)] lg:block'
						style={prefersReducedMotion ? undefined : { y: posterY, opacity: fade }}
					>
						{/* Scroll owns the outer transform, the entrance owns the inner one.
						    Sharing an element would let the scroll values overwrite the
						    entrance before it had a chance to play. */}
						<motion.div variants={settle(0.66)}>
							{/* The magnet writes a CSS transform, so it has to live on an
							    element framer isn't already animating, or the entrance
							    would overwrite it on its first frame. */}
							<div className='magnetic' ref={posterRef}>
								<AnimatePresence initial={false} mode='wait'>
									<motion.div
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.24, ease } }}
										initial={{ opacity: 0, y: 14, scale: 0.98 }}
										key={active.key}
										transition={{ duration: 0.55, ease }}
									>
										<ProjectPoster
											caseStudy={active}
											index={activeIndex}
											kind={t(`work.kinds.${active.kind}`)}
											priority
											size='sm'
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>

				<motion.nav
					animate='visible'
					aria-label={t('work.eyebrow')}
					className='relative'
					initial='hidden'
					variants={stagger(0.06, 0.75)}
				>
					<motion.span
						aria-hidden='true'
						className='block h-px origin-left bg-border'
						transition={{ duration: 1, ease, delay: 0.7 }}
						variants={ruleReveal}
					/>

					<ul className='grid grid-cols-2 lg:grid-cols-4'>
						{caseStudies.map((caseStudy, index) => (
							<motion.li key={caseStudy.key} variants={settle(0)}>
								<Link
									className='group relative block py-5 pr-4 sm:py-6'
									onFocus={() => setActiveIndex(index)}
									onPointerEnter={() => setActiveIndex(index)}
									to='/work'
								>
									{index === activeIndex && (
										<motion.span
											aria-hidden='true'
											className='absolute inset-x-0 -top-px h-px bg-accent'
											layoutId='rail-active'
											transition={{ duration: 0.5, ease }}
										/>
									)}

									<span className='flex items-baseline gap-3'>
										<span
											className={`font-medium font-mono text-eyebrow uppercase transition-colors duration-500 ease-expo ${
												index === activeIndex ? 'text-accent' : 'text-faded-text'
											}`}
										>
											{String(index + 1).padStart(2, '0')}
										</span>
										<span className='row__shift font-medium text-[0.9375rem] text-text tracking-tight'>
											{caseStudy.name}
										</span>
									</span>

									<span className='mt-1.5 block pl-[2.125rem] font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
										{t(`work.kinds.${caseStudy.kind}`)}
									</span>
								</Link>
							</motion.li>
						))}
					</ul>
				</motion.nav>
			</div>
		</section>
	);
};
