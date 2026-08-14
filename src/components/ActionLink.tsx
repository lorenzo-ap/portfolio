import { Link } from 'react-router-dom';
import { ArrowIcon, ArrowUpRightIcon } from './icons';

interface ActionLinkProps {
	label: string;
	/** Internal route. Use `href` for external targets and mailto. */
	to?: string;
	href?: string;
	external?: boolean;
	muted?: boolean;
	className?: string;
}

/**
 * The middle tier between an inline text link and a button: a standalone action
 * that shouldn't shout. Underline draws in under the label, the icon shifts,
 * and the whole thing picks up the accent on hover.
 */
export const ActionLink = ({ label, to, href, external = false, muted = false, className = '' }: ActionLinkProps) => {
	const classes = `link-action ${external ? 'link-action__diagonal' : ''} ${muted ? 'link-action__muted' : ''} ${className}`;
	const content = (
		<>
			<span className='link-action__label'>{label}</span>
			<span aria-hidden='true' className='link-action__icon'>
				{external ? <ArrowUpRightIcon /> : <ArrowIcon />}
			</span>
		</>
	);

	if (external) {
		return (
			<Link className={classes} target='_blank' to={href ?? to ?? ''}>
				{content}
			</Link>
		);
	}

	if (to) {
		return (
			<Link className={classes} to={to}>
				{content}
			</Link>
		);
	}

	return (
		<a className={classes} href={href}>
			{content}
		</a>
	);
};
