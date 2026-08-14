import { type ProjectModel, Skill } from '../types';

export const projects: ProjectModel[] = [
	{
		name: 'AInterest',
		link: 'https://www.ainterest.me',
		skills: [Skill.React, Skill.TypeScript, Skill.Fastify],
		descriptionKey: 'ainterest'
	},
	{
		name: 'Weather',
		link: 'https://lorenzo-ap.github.io/weather-app',
		skills: [Skill.React, Skill.TypeScript],
		descriptionKey: 'weather'
	},
	{
		name: 'Pulse',
		link: 'https://lorenzo-pulse.netlify.app',
		skills: [Skill.HTML, Skill.CSS, Skill.jQuery],
		descriptionKey: 'pulse'
	},
	{
		name: 'Writer Works',
		link: 'https://lorenzo-writer.netlify.app',
		skills: [Skill.HTML, Skill.CSS, Skill.JavaScript],
		descriptionKey: 'writerWorks'
	}
];

export const clientProjects: ProjectModel[] = [
	{
		name: 'AI for Frontend Developers',
		link: 'https://itlogia.ru/ai-front',
		skills: [Skill.AITooling, Skill.CurriculumDesign],
		descriptionKey: 'aiForFrontend'
	},
	{
		name: 'Kraanveld',
		link: 'https://www.kraanveld.nl',
		skills: [Skill.NextJS, Skill.TypeScript],
		descriptionKey: 'kraanveld'
	},
	{
		name: 'Nextremum',
		link: 'https://nextremum.net',
		skills: [Skill.NextJS, Skill.TypeScript],
		descriptionKey: 'nextremum'
	}
];

export const hackathonProjects: ProjectModel[] = [
	{
		name: 'Wayport',
		link: 'https://github.com/lorenzo-ap/hacktech',
		skills: [Skill.ReactNative, Skill.TypeScript],
		descriptionKey: 'wayport',
		hackathonLink: 'https://hack-tech.ai/airport-chapter'
	},
	{
		name: 'Cahul Connect',
		link: 'https://github.com/serezha13/cahul-connect',
		skills: [Skill.NextJS, Skill.TypeScript],
		descriptionKey: 'cahulConnect',
		hackathonLink: 'https://old.gigahack.md/deeptech-gigahack-2023/'
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
