import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { stagger } from '../lib/motion';
import { HeroMarks, HeroResult, HeroSource, HeroWire } from './HeroFragments';
import { HeroLayer } from './HeroLayer';
import { HeroSurface, heroSteps, stepDuration } from './HeroSurface';

/**
 * The four steps, a beat where the run reads as finished, and a beat where the
 * surface clears. The clearing beat is what makes the loop a loop: without it
 * the first step is already full when its turn comes round again, and a row
 * that starts finished has nothing left to show.
 */
const beats = heroSteps.length + 2;
const clearing = beats - 1;

/**
 * The hero's one visual idea: the job moving off the sheet and into something
 * that runs on its own.
 *
 * Three planes and two hairlines between them. The sheet sits furthest back and
 * moves most, the surface sits in the middle and barely moves at all, and the
 * result comes forward at the end of a run. Depth is the whole effect, so every
 * plane reads the same two pointer numbers and multiplies them by its own
 * distance rather than animating anything of its own.
 *
 * The run itself is one integer. It says which step is going, which are behind
 * it, how far the progress line has got, where the selection sits in the sheet
 * and whether the result is out yet, which is why the composition holds
 * together instead of reading as five things animating near each other.
 *
 * Decorative in full: the whole thing is `aria-hidden`, and nothing in it is
 * needed to understand the page.
 */
export const HeroVisual = () => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const visible = useInView(ref, { amount: 0.25 });
	const prefersReducedMotion = useReducedMotion();
	const [beat, setBeat] = useState(0);

	useEffect(() => {
		if (prefersReducedMotion || !visible) return;

		const timer = setInterval(() => setBeat((value) => (value + 1) % beats), stepDuration * 1000);

		return () => clearInterval(timer);
	}, [prefersReducedMotion, visible]);

	// With motion off the composition holds the state a run ends in: everything
	// handled. A loop that can't move has nothing to say mid-way through.
	const running = beat === clearing ? -1 : beat;
	const step = prefersReducedMotion ? heroSteps.length : running;
	const finished = step >= heroSteps.length;

	return (
		<motion.div
			animate='visible'
			aria-hidden='true'
			className='hero-visual relative pt-6 pb-16 sm:pt-[8rem]'
			initial='hidden'
			ref={ref}
			variants={stagger(0, 0.5)}
		>
			<HeroLayer className='absolute inset-0' delay={0} depth={-11}>
				<span className='hero-visual__field' />
			</HeroLayer>

			<HeroMarks />

			<HeroLayer className='absolute top-0 right-0 hidden w-[52%] sm:block' delay={0.26} depth={19} drift={13}>
				<HeroSource cursor={beat} label={t('hero.visual.source')} />
			</HeroLayer>

			<HeroWire className='top-[6rem] right-[24%] hidden h-[2rem] sm:block' delay={0.42} signalDelay={0.4} />

			<HeroLayer className='relative z-10 mr-[8%]' delay={0.1} depth={6} tilt>
				<HeroSurface step={step} />
			</HeroLayer>

			{/* This one belongs to the result rather than to the composition, so it
			    draws itself when there's something at the end of it and retracts
			    once the run clears. A line hanging off the surface pointing at
			    nothing is just a line hanging off the surface. */}
			<HeroWire className='bottom-[1.75rem] left-[18%] h-[2.25rem]' shown={finished} signalDelay={2.1} />

			<HeroLayer className='absolute bottom-0 left-[5%] z-20' delay={0.34} depth={27} drift={9} driftDelay={2}>
				<HeroResult label={t('hero.visual.result')} shown={finished} />
			</HeroLayer>
		</motion.div>
	);
};
