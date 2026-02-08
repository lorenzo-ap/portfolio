import { type ProjectModel, Skill } from '../types';

export const projects: ProjectModel[] = [
	{
		name: 'AInterest',
		link: 'https://www.ainterest.live',
		skills: [Skill.React, Skill.TypeScript, Skill.Fastify],
		description:
			'A full-stack AI-powered, Pinterest-inspired app for generating and exploring images from user prompts.'
	},
	{
		name: 'Weather',
		link: 'https://lorenzo-ap.github.io/weather-app',
		skills: [Skill.React, Skill.TypeScript],
		description: 'A web app where you can check the weather for your current spot or look up forecasts for any city.'
	},
	{
		name: 'Pulse',
		link: 'https://lorenzo-pulse.netlify.app',
		skills: [Skill.HTML, Skill.CSS, Skill.jQuery],
		description: 'A sports store web app template, created for learning and focused on layout.'
	},
	{
		name: 'Writer Works',
		link: 'https://lorenzo-writer.netlify.app',
		skills: [Skill.HTML, Skill.CSS, Skill.JavaScript],
		description:
			'A web app template built with core web technologies, focused on animations, layout, and visual design.'
	}
];

export const clientProjects: ProjectModel[] = [
	{
		name: 'Kraanveld',
		link: 'https://www.kraanveld.nl',
		skills: [Skill.NextJS, Skill.TypeScript],
		description: 'Website for a crane rental company, showcasing services, projects, and key information.'
	},
	{
		name: 'Nextremum',
		link: 'https://nextremum.net',
		skills: [Skill.NextJS, Skill.TypeScript],
		description:
			'Website for a telecommunications provider offering private networking and connectivity services across Europe and Asia.'
	}
];

export const misc: ProjectModel[] = [
	{
		name: 'Typing Game',
		link: 'https://lorenzo-typing-game.vercel.app',
		skills: [Skill.React]
	},
	{
		name: 'Budget App',
		link: 'https://lorenzo-ap.github.io/budget-app',
		skills: [Skill.Angular]
	},
	{
		name: 'Kanban Board',
		link: 'https://lorenzo-ap.github.io/ng-kanban',
		skills: [Skill.Angular]
	},
	{
		name: 'Background Generator',
		link: 'https://lorenzo-ap.github.io/background-generator',
		skills: [Skill.JavaScript]
	}
];
