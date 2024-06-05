import { Link } from 'react-router-dom';

export interface Props {
    index: number;
    title: string;
    description?: string;
    link: string;
    label: string;
}

const Project = ({ index, title, description, link, label }: Props) => {
    return (
        <div
            className={`flex justify-between items-center pt-[14px] ${
                index !== 0 ? 'border-t border-faded-line' : ''
            }`}>
            <div className="max-w-lg">
                <Link
                    className="text-subfaded-text hover:text-text text-[18px] transition-colors duration-150"
                    to={link}
                    target="_blank">
                    {title}
                </Link>

                {description && <p className="text-text text-[14px]">{description}</p>}
            </div>

            <div className="py-[1px] px-[3px] rounded-sm text-[10px] uppercase text-text bg-faded-bg font-medium">
                {label}
            </div>
        </div>
    );
};

export default Project;
