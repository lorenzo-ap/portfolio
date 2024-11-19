import { Link } from 'react-router-dom';
import { Label } from '../../enums/label.enum';

export interface Props {
  index: number;
  title: string;
  description?: string;
  link: string;
  label: Label;
}

const Project = ({ index, title, description, link, label }: Props) => {
  return (
    <div
      className={`flex ${description ? 'flex-col sm:flex-row items-start sm:items-center' : 'items-center'} justify-between pt-[14px] ${index !== 0 ? 'border-t border-faded-line' : ''}`}
    >
      <div className='max-w-lg me-5'>
        <Link
          className='text-subfaded-text hover:text-text text-[18px] transition-colors duration-150'
          to={link}
          target='_blank'
        >
          {title}
        </Link>

        {description && <p className='mt-1 text-text text-[14px] mb-1.5'>{description}</p>}
      </div>

      <div className='py-[1px] px-[3px] rounded-sm text-[10px] uppercase text-text bg-faded-bg font-medium'>
        {label}
      </div>
    </div>
  );
};

export default Project;
