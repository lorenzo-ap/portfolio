import { Link } from 'react-router-dom';
import type { ProjectModel, Skill } from '../types';

interface SkillsProps {
	skills: Skill[];
}

const Skills = ({ skills }: SkillsProps) => {
	if (!skills) return null;

	return (
		<div className='mt-2 flex flex-wrap gap-1.5'>
			{skills.map((skill) => (
				<div
					className='rounded-sm bg-faded-bg px-[3px] py-[1px] font-medium text-[10px] text-text uppercase'
					key={skill}
				>
					{skill}
				</div>
			))}
		</div>
	);
};

interface ProjectProps {
	index: number;
	project: ProjectModel;
	isMisc?: boolean;
}

export const Project = ({ index, project, isMisc }: ProjectProps) => {
	const { name, description, link, skills } = project;

	return (
		<div className={index !== 0 ? 'border-faded-line border-t pt-[14px]' : 'mt-[14px]'}>
			<div className='flex items-center justify-between'>
				<Link
					className='text-[18px] text-subfaded-text underline-offset-2 hover:text-text hover:underline'
					target='_blank'
					to={link}
				>
					{name}
				</Link>

				{isMisc && <Skills skills={skills} />}
			</div>

			{description && <p className='mt-1 mb-1.5 text-[14px] text-text'>{description}</p>}

			{!isMisc && <Skills skills={skills} />}
		</div>
	);
};
