import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { archiveProjects } from '../data/projects';
import { ArrowUpRightIcon } from './icons';
import { RevealGroup, RevealItem } from './Reveal';

export const ArchiveList = () => {
	const { t } = useTranslation();

	return (
		<RevealGroup as='ul' className='mt-12 border-border border-t' step={0.04}>
			{archiveProjects.map((project) => (
				<RevealItem as='li' key={project.name}>
					<Link
						className='group grid items-baseline gap-x-10 gap-y-2 border-border border-b py-6 transition-colors duration-500 ease-expo hover:bg-accent-soft lg:grid-cols-12'
						target='_blank'
						to={project.link}
					>
						<span className='flex items-center gap-2 font-medium text-[1.0625rem] text-text transition-colors duration-300 ease-expo group-hover:text-accent lg:col-span-3'>
							{project.name}
							<span className='opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100'>
								<ArrowUpRightIcon />
							</span>
						</span>

						<span className='text-[0.9375rem] text-faded-text lg:col-span-4'>
							{project.descriptionKey ? t(`work.archiveItems.${project.descriptionKey}`) : null}
						</span>

						<span className='font-mono text-[0.6875rem] text-faded-text lg:col-span-3'>
							{project.skills.join(' · ')}
						</span>

						<span className='font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.12em] lg:col-span-2 lg:text-right'>
							{t(`work.kinds.${project.kind}`)}
						</span>
					</Link>
				</RevealItem>
			))}
		</RevealGroup>
	);
};
