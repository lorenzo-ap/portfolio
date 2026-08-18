import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks';
import { ArrowIcon } from './icons';

type ButtonVariant = 'primary' | 'ghost';

/**
 * Written out in full rather than interpolated. Tailwind scans source text for
 * class names, so `btn__${variant}` would get stripped from the build.
 */
const variantClass: Record<ButtonVariant, string> = {
	primary: 'btn__primary',
	ghost: 'btn__ghost'
};

interface ButtonLinkProps extends PropsWithChildren {
	/** Internal route. Use `href` instead for mailto and external targets. */
	to?: string;
	href?: string;
	variant?: ButtonVariant;
	className?: string;
	withArrow?: boolean;
	external?: boolean;
	small?: boolean;
	/** Leans towards the cursor. Reserved for the primary action on a screen. */
	magnetic?: boolean;
}

/**
 * One button treatment for the whole site. Primary carries the accent, ghost
 * stays neutral until hover. Both settle on press, so a click always gets
 * acknowledged.
 */
export const ButtonLink = ({
	to,
	href,
	variant = 'primary',
	className = '',
	withArrow = true,
	external = false,
	small = false,
	magnetic = false,
	children
}: ButtonLinkProps) => {
	const { ref, onPointerMove, onPointerLeave, onBlur } = useMagnetic<HTMLAnchorElement>();

	const classes = `btn ${variantClass[variant]} ${small ? 'btn__sm' : ''} ${magnetic ? 'magnetic' : ''} ${className}`;
	const magnetProps = magnetic ? { ref, onPointerMove, onPointerLeave, onBlur } : {};
	const content = (
		<>
			{children}
			{withArrow && (
				<span aria-hidden='true' className='btn__icon'>
					<ArrowIcon />
				</span>
			)}
		</>
	);

	if (to) {
		return (
			<Link className={classes} to={to} {...magnetProps}>
				{content}
			</Link>
		);
	}

	return (
		<a
			className={classes}
			href={href}
			rel={external ? 'noopener noreferrer' : undefined}
			target={external ? '_blank' : undefined}
			{...magnetProps}
		>
			{content}
		</a>
	);
};
