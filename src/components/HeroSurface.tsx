import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ease } from '../lib/motion';

/**
 * The four steps the surface works through. Written out as full keys so the
 * lookup is checked against `en.json` rather than assembled at runtime.
 */
export const heroSteps = [
	'hero.visual.steps.intake',
	'hero.visual.steps.check',
	'hero.visual.steps.update',
	'hero.visual.steps.send'
] as const;

/** How long one step holds. The leader fills across the row in the same time. */
export const stepDuration = 2.2;

const pad = (value: number) => String(value).padStart(2, '0');

interface StepProps {
	label: string;
	index: number;
	active: boolean;
	done: boolean;
}

const HeroStep = ({ label, index, active, done }: StepProps) => (
	<li className={`hero-step ${active ? 'hero-step--active' : ''} ${done ? 'hero-step--done' : ''}`}>
		<span className='hero-step__index'>{pad(index + 1)}</span>
		<span className='hero-step__label'>{label}</span>

		{/* The leader is the only continuous movement on the surface: it fills at
		    the speed of the step, so the pause between two states is filled by
		    something that's actually happening rather than by a spinner.

		    It starts empty rather than at whatever the animation is heading
		    towards. With `initial={false}` the first step of the first run
		    mounted already full, which read as a row that had somehow finished
		    before the page had. */}
		<span className='hero-step__leader'>
			<motion.span
				animate={{ scaleX: active || done ? 1 : 0 }}
				className='hero-step__fill'
				initial={{ scaleX: 0 }}
				transition={active ? { duration: stepDuration, ease: 'linear' } : { duration: 0.5, ease }}
			/>
		</span>

		<span className='hero-step__mark' />
	</li>
);

interface HeroSurfaceProps {
	/**
	 * Which step is running. Anything at or past the last one reads as finished,
	 * and -1 is the beat where the surface clears before the next run.
	 */
	step: number;
}

/**
 * The centre of the hero composition: a small piece of software doing the job
 * the headline is about, drawn in the same hairlines as the rest of the page.
 *
 * It's a schematic, not a screenshot. There's no window chrome, no sidebar, no
 * invented number and nothing that claims a result. Four steps, which one is
 * running, and how far through the run it is.
 */
export const HeroSurface = ({ step }: HeroSurfaceProps) => {
	const { t } = useTranslation();
	const complete = Math.max(0, Math.min(step, heroSteps.length));

	return (
		<div className='hero-surface'>
			<div className='hero-surface__bar'>
				<span className='hero-surface__label'>{t('hero.visual.process')}</span>

				<span className='hero-surface__count'>
					<span className={`hero-live ${complete === heroSteps.length ? 'hero-live--done' : ''}`} />
					{pad(Math.min(Math.max(step + 1, 1), heroSteps.length))}/{pad(heroSteps.length)}
				</span>
			</div>

			<ul className='hero-surface__list'>
				{heroSteps.map((key, index) => (
					<HeroStep active={index === step} done={index < step} index={index} key={key} label={t(key)} />
				))}
			</ul>

			<motion.span
				animate={{ scaleX: complete / heroSteps.length }}
				className='hero-surface__progress'
				initial={false}
				transition={{ duration: 0.6, ease }}
			/>
		</div>
	);
};
