import { AnimatePresence, motion } from 'framer-motion';
import { ease } from '../lib/motion';

interface StepCounterProps {
	/** Zero-based index of the current step. */
	step: number;
	total: number;
	className?: string;
}

const pad = (value: number) => String(value).padStart(2, '0');

const flip = {
	initial: { y: '60%', opacity: 0 },
	animate: { y: '0%', opacity: 1, transition: { duration: 0.55, ease } },
	exit: { y: '-60%', opacity: 0, transition: { duration: 0.35, ease } }
};

/**
 * A large serif number beside the process ladder, counting the step the spine
 * has reached. Each digit pair rolls out of the top of its box as the next one
 * rolls in from below, the same up-and-out gesture as the headline reveals.
 */
export const StepCounter = ({ step, total, className = '' }: StepCounterProps) => (
	<p aria-hidden='true' className={`flex items-baseline gap-4 ${className}`}>
		<span className='statement relative block h-[1em] overflow-hidden text-display-sm leading-none'>
			<AnimatePresence initial={false} mode='popLayout'>
				<motion.span className='block' key={step} {...flip}>
					{pad(step + 1)}
				</motion.span>
			</AnimatePresence>
		</span>
		<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>/ {pad(total)}</span>
	</p>
);
