import { Project } from '../components';
import { clientProjects, misc, projects } from '../data/projects';

export const ProjectsPage = () => {
	return (
		<>
			<section className='flex flex-col gap-[14px] px-6 text-text'>
				<h1 className='mt-[28px] mb-[14px] font-semibold text-4xl'>Projects.</h1>

				<p>Here are some of the projects I&#39;ve worked on as a maintainer, contributor or just for fun.</p>

				{projects.map((project, index) => (
					<Project index={index} key={project.name} project={project} />
				))}
			</section>

			<section className='my-[80px] flex flex-col gap-[14px] px-6 text-text'>
				<h2 className='font-semibold text-[21px]'>Client Projects.</h2>

				<p>
					A selection of projects delivered for external clients, focused on web development and design, built to real
					requirements.
				</p>

				{clientProjects.map((project, index) => (
					<Project index={index} key={project.name} project={project} />
				))}
			</section>

			<section className='flex flex-col gap-[14px] px-6 text-text'>
				<h2 className='font-semibold text-[21px]'>Misc & Experiments.</h2>

				<p>
					This is a collection of small projects, experiments and interesting things I&#39;ve worked on. Not
					particularly useful, maintained or actively developed.
				</p>

				{misc.map((project, index) => (
					<Project index={index} isMisc key={project.name} project={project} />
				))}
			</section>
		</>
	);
};
