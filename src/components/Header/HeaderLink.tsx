import { Link } from 'react-router-dom';

interface HeaderLinkProps {
    currentPath: string;
    targetPath: string;
    linkText: string;
}

const HeaderLink = ({ currentPath, targetPath, linkText }: HeaderLinkProps) => {
    return (
        <Link
            className={`${
                currentPath === targetPath && 'text-text border-text'
            } border-b border-solid border-faded-line hover:text-text hover:border-text transition-colors duration-150`}
            to={targetPath}>
            {linkText}
        </Link>
    );
};

export default HeaderLink;
