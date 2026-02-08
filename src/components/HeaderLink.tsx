import { Link } from 'react-router-dom';

interface HeaderLinkProps {
	currentPath: string;
	targetPath: string;
	linkText: string;
}

export const HeaderLink = ({ currentPath, targetPath, linkText }: HeaderLinkProps) => {
	return (
		<Link
			className={`${
				currentPath === targetPath && 'border-text text-text'
			} border-faded-line border-b border-solid transition-colors duration-150 hover:border-text hover:text-text`}
			to={targetPath}
		>
			{linkText}
		</Link>
	);
};
