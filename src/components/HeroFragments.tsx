import { motion, type Variants } from 'framer-motion';
import type { CSSProperties } from 'react';
import { ease } from '../lib/motion';
import { HeroLayer } from './HeroLayer';

/**
 * The sheet, as a fraction of one. Each number is how much of its cell is
 * filled, and a zero is an empty cell. Fixed rather than generated, so the
 * shape of the thing is the same on every visit.
 */
const sourceColumns = 4;

const sourceCells = [0.72, 0.44, 0, 0.58, 0.36, 0.8, 0.5, 0, 0.66, 0.4, 0.54, 0].map((fill, index) => ({
	fill,
	id: `hero-cell-${index}`
}));

interface HeroSourceProps {
	label: string;
	/** Which cell the selection is sitting in. Moves with the run. */
	cursor: number;
}

/**
 * Where the job lives before anyone builds anything: a sheet somebody keeps by
 * hand. It's the quietest layer in the composition, and the only one that
 * changes when you point at the hero.
 *
 * The selection is one element that travels rather than twelve that take turns
 * being lit, and it travels on a transform of its own size, so it lands on a
 * cell at any width without measuring anything.
 */
export const HeroSource = ({ label, cursor }: HeroSourceProps) => {
	const cell = cursor % sourceCells.length;

	return (
		<div className='hero-card hero-source'>
			<span className='hero-card__label'>{label}</span>

			<span className='hero-source__grid'>
				{sourceCells.map((entry) => (
					<span className='hero-cell' key={entry.id}>
						{entry.fill > 0 && <span className='hero-cell__bar' style={{ width: `${entry.fill * 100}%` }} />}
					</span>
				))}

				<span
					className='hero-cell__cursor'
					style={{ '--col': cell % sourceColumns, '--row': Math.floor(cell / sourceColumns) } as CSSProperties}
				/>
			</span>
		</div>
	);
};

interface HeroResultProps {
	label: string;
	/** True once the run has worked through every step. */
	shown: boolean;
}

/**
 * What's left at the end of a run. Arrives on the last step and leaves with it,
 * a beat behind its wire so the line is there for it to land on.
 */
export const HeroResult = ({ label, shown }: HeroResultProps) => (
	<motion.div
		animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 10 }}
		className='hero-card hero-result'
		initial={false}
		transition={{ duration: shown ? 0.7 : 0.4, ease, delay: shown ? 0.35 : 0 }}
	>
		<span className='hero-tick' />
		<span className='hero-card__label'>{label}</span>
	</motion.div>
);

/**
 * Hairlines draw themselves in from the end they start at, like every rule on
 * the site. Only the height is animated: opacity belongs to the stylesheet, so
 * the hover state still has something to lift.
 */
const draw = (delay: number): Variants => ({
	hidden: { scaleY: 0 },
	visible: { scaleY: 1, transition: { duration: 0.9, ease, delay } }
});

interface HeroWireProps {
	className?: string;
	delay?: number;
	/** Offsets the travelling signal, so the two wires never pulse together. */
	signalDelay?: number;
	/**
	 * Set for a wire that belongs to something that comes and goes. Left off,
	 * the wire is permanent structure and simply arrives with the composition.
	 */
	shown?: boolean;
}

/** The connection between two layers, kept orthogonal so it belongs to the grid. */
export const HeroWire = ({ className = '', delay = 0, signalDelay = 0, shown }: HeroWireProps) => {
	const gate =
		shown === undefined
			? { variants: draw(delay) }
			: {
					initial: { scaleY: 0 },
					animate: { scaleY: shown ? 1 : 0 },
					transition: { duration: shown ? 0.55 : 0.45, ease, delay: shown ? 0 : 0.2 }
				};

	return (
		<motion.span className={`hero-wire ${className}`} {...gate}>
			<span className='hero-wire__signal' style={{ animationDelay: `${signalDelay}s` }} />
		</motion.span>
	);
};

const specks = [
	{ id: 'speck-a', className: 'top-[22%] left-[4%]', depth: 26, breath: 0 },
	{ id: 'speck-b', className: 'right-[3%] bottom-[28%]', depth: 32, breath: 1.6 },
	{ id: 'speck-c', className: 'top-[7%] left-[44%]', depth: 20, breath: 3.1 }
] as const;

/**
 * Three marks sitting on the field behind everything. They're the fastest thing
 * in the composition under the pointer and the slowest thing at rest, which is
 * what keeps the empty corners from reading as empty.
 */
export const HeroMarks = () => (
	<>
		{specks.map((speck) => (
			<HeroLayer className={`absolute ${speck.className}`} delay={1.05} depth={speck.depth} key={speck.id}>
				<span className='hero-speck' style={{ animationDelay: `${speck.breath}s` }} />
			</HeroLayer>
		))}
	</>
);
