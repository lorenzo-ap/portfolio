import { motion } from 'framer-motion';
import type { CSSProperties, PropsWithChildren } from 'react';
import { settle } from '../lib/motion';

interface HeroLayerProps extends PropsWithChildren {
	/** Pixels this layer travels between the two edges of the pointer's reach. */
	depth: number;
	/** Where the layer sits in the hero's arrival sequence. */
	delay?: number;
	/** Seconds for one idle drift. Left off for anything that should hold still. */
	drift?: number;
	driftDelay?: number;
	/** Adds the hint of a turn towards the cursor. Only the central surface uses it. */
	tilt?: boolean;
	className?: string;
}

/**
 * One plane of the hero composition.
 *
 * Three properties, three elements, on purpose. The entrance owns the outer
 * transform, the pointer owns the middle one and the idle drift owns
 * `translate` on the same middle element, which composes with `transform`
 * instead of fighting it. Put any two of them on one element and whichever
 * writes last wins, which is how a layer ends up stuck at its initial state.
 */
export const HeroLayer = ({
	depth,
	delay = 0,
	drift,
	driftDelay = 0,
	tilt = false,
	className = '',
	children
}: HeroLayerProps) => (
	<motion.div className={className} variants={settle(delay)}>
		<div
			className={`hero-layer ${tilt ? 'hero-layer--tilt' : ''} ${drift ? 'hero-layer--drift' : ''}`}
			style={
				{
					'--depth': depth,
					animationDuration: drift ? `${drift}s` : undefined,
					animationDelay: drift ? `${driftDelay}s` : undefined
				} as CSSProperties
			}
		>
			{children}
		</div>
	</motion.div>
);
