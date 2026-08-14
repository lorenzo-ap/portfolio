import { useTranslation } from 'react-i18next';
import { Project } from '../components';
import { clientProjects, hackathonProjects, misc, projects } from '../data/projects';

export const ProjectsPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<section className='flex flex-col gap-[14px] px-6 text-text'>
				<h1 className='mt-[28px] mb-[14px] font-semibold text-4xl'>{t('projects.title')}</h1>

				<p>{t('projects.intro')}</p>

				{projects.map((project, index) => (
					<Project index={index} key={project.name} project={project} />
				))}
			</section>

			<section className='my-[100px] flex flex-col gap-[14px] px-6 text-text'>
				<h2 className='font-semibold text-[21px]'>{t('projects.client.title')}</h2>

				<p>{t('projects.client.intro')}</p>

				{clientProjects.map((project, index) => (
					<Project index={index} key={project.name} project={project} />
				))}
			</section>

			<section className='my-[100px] flex flex-col gap-[14px] px-6 text-text'>
				<h2 className='font-semibold text-[21px]'>{t('projects.hackathon.title')}</h2>

				<p>{t('projects.hackathon.intro')}</p>

				{hackathonProjects.map((project, index) => (
					<Project index={index} key={project.name} project={project} />
				))}
			</section>

			<section className='flex flex-col gap-[14px] px-6 text-text'>
				<h2 className='font-semibold text-[21px]'>{t('projects.misc.title')}</h2>

				<p>{t('projects.misc.intro')}</p>

				{misc.map((project, index) => (
					<Project index={index} isMisc key={project.name} project={project} />
				))}
			</section>
		</>
	);
};
