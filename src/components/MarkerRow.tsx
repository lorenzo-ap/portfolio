import type { PropsWithChildren, ReactNode } from 'react';
import { RevealItem } from './Reveal';

interface MarkerRowProps extends PropsWithChildren {
	/** The index or short label that opens the row. */
	marker: ReactNode;
	title?: string;
	/** Gives the body its own column on desktop instead of running under the title. */
	split?: boolean;
	/** For a marker that's a phrase rather than a number. */
	wideMarker?: boolean;
	/** Hairline only. For lists that aren't a set of separate things to point at. */
	quiet?: boolean;
	className?: string;
}

/**
 * The site's list row, everywhere a numbered or labelled list appears.
 *
 * A number is narrow enough to sit beside what it marks even on a phone, so it
 * does: the row is a two-column grid whose first column is exactly as wide as
 * the number, and the title and body line up under one left edge. That saves a
 * line per row, and it stops a list of six from reading as twelve separate
 * things.
 *
 * A phrase can't do that. `wideMarker` stacks the label over the body until
 * there's room for both, because a hundred-pixel label beside a paragraph on a
 * 390px screen leaves the paragraph six words wide.
 *
 * Every class is written out per case: Tailwind reads source text, so a column
 * span built by interpolation would never reach the stylesheet.
 *
 * The list opens with a rule and doesn't close with one. Every one of these
 * lists ends where its section does, and a closing border left two hairlines a
 * full section-gap apart with nothing between them.
 */
export const MarkerRow = ({
	marker,
	title,
	split = false,
	wideMarker = false,
	quiet = false,
	className = '',
	children
}: MarkerRowProps) => {
	const grid = wideMarker
		? 'grid gap-x-8 gap-y-1.5 sm:grid-cols-12'
		: `grid grid-cols-[1.75rem_1fr] gap-x-4 gap-y-2.5 sm:grid-cols-12 sm:gap-x-8 ${split ? 'lg:gap-x-12' : ''}`;

	const markerClass = wideMarker ? 'sm:col-span-4' : `sm:col-span-2 ${split ? 'lg:col-span-1' : ''}`;
	const titleClass = wideMarker ? 'sm:col-span-8' : `sm:col-span-10 ${split ? 'lg:col-span-5 lg:col-start-2' : ''}`;
	const bodyClass = wideMarker
		? 'sm:col-span-8 sm:col-start-5'
		: `col-start-2 sm:col-span-10 sm:col-start-3 ${split ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1' : ''}`;

	return (
		<RevealItem
			as='li'
			className={`group py-6 sm:py-8 lg:py-10 ${quiet ? 'border-border border-t' : 'row'} ${className}`}
		>
			<div className={grid}>
				<span
					className={`relative font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent ${markerClass}`}
				>
					{marker}
				</span>

				{title ? (
					<>
						<h3 className={`row__shift relative font-medium text-text text-title ${titleClass}`}>{title}</h3>
						<div className={`relative max-w-prose text-body-sm text-faded-text ${bodyClass}`}>{children}</div>
					</>
				) : (
					<div className={`row__shift relative max-w-prose text-body-sm text-subfaded-text ${bodyClass}`}>
						{children}
					</div>
				)}
			</div>
		</RevealItem>
	);
};
