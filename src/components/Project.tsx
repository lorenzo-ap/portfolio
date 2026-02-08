import { Link } from 'react-router-dom';
import type { Label } from '../types';

export interface Props {
	index: number;
	title: string;
	description?: string;
	link: string;
	label: Label;
}

export const Project = ({ index, title, description, link, label }: Props) => {
	return (
		<div
			className={`flex ${description ? 'flex-col items-start sm:flex-row sm:items-center' : 'items-center'} justify-between pt-[14px] ${index !== 0 ? 'border-faded-line border-t' : ''}`}
		>
			<div className='me-5 max-w-lg'>
				<Link
					className='text-[18px] text-subfaded-text underline-offset-2 transition-colors duration-150 hover:text-text hover:underline'
					target='_blank'
					to={link}
				>
					{title}
				</Link>

				{description && <p className='mt-1 mb-1.5 text-[14px] text-text'>{description}</p>}
			</div>

			<div className='rounded-sm bg-faded-bg px-[3px] py-[1px] font-medium text-[10px] text-text uppercase'>
				{label}
			</div>
		</div>
	);
};
