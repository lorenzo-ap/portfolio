import { type ArchiveProjectModel, type CaseStudyModel, Skill } from '../types';

/**
 * Case studies, strongest first. `key` resolves the Problem / Built / Challenge /
 * Value copy from the locale files so every language tells the same story.
 */
export const caseStudies: CaseStudyModel[] = [
	{
		key: 'ainterest',
		name: 'AInterest',
		link: 'https://www.ainterest.me',
		kind: 'product',
		skills: [Skill.React, Skill.TypeScript, Skill.Fastify, Skill.SystemDesign],
		hue: 232
	},
	{
		key: 'nextremum',
		name: 'Nextremum',
		link: 'https://nextremum.net',
		kind: 'client',
		skills: [Skill.NextJS, Skill.TypeScript],
		hue: 210
	},
	{
		key: 'kraanveld',
		name: 'Kraanveld',
		link: 'https://www.kraanveld.nl',
		kind: 'client',
		skills: [Skill.NextJS, Skill.TypeScript],
		hue: 248
	},
	{
		key: 'aiForFrontend',
		name: 'AI for Frontend Developers',
		link: 'https://itlogia.ru/ai-front',
		kind: 'course',
		skills: [Skill.AITooling, Skill.CurriculumDesign],
		hue: 200
	},
	{
		key: 'wayport',
		name: 'Wayport',
		link: 'https://github.com/lorenzo-ap/hacktech',
		kind: 'hackathon',
		skills: [Skill.ReactNative, Skill.TypeScript],
		secondaryLink: { href: 'https://hack-tech.ai/airport-chapter', labelKey: 'hackathonLink' },
		hue: 222
	}
];

/** Shown on the home page. The three that best answer "can he build my thing?". */
export const featuredCaseStudies = caseStudies.slice(0, 3);

export const archiveProjects: ArchiveProjectModel[] = [
	{
		name: 'Cahul Connect',
		link: 'https://github.com/serezha13/cahul-connect',
		kind: 'hackathon',
		skills: [Skill.NextJS, Skill.TypeScript],
		descriptionKey: 'cahulConnect'
	},
	{
		name: 'Weather',
		link: 'https://lorenzo-ap.github.io/weather-app',
		kind: 'product',
		skills: [Skill.React, Skill.TypeScript],
		descriptionKey: 'weather'
	},
	{
		name: 'Pulse',
		link: 'https://lorenzo-pulse.netlify.app',
		kind: 'experiment',
		skills: [Skill.HTML, Skill.CSS, Skill.jQuery],
		descriptionKey: 'pulse'
	},
	{
		name: 'Writer Works',
		link: 'https://lorenzo-writer.netlify.app',
		kind: 'experiment',
		skills: [Skill.HTML, Skill.CSS, Skill.JavaScript],
		descriptionKey: 'writerWorks'
	},
	{
		name: 'Typing Game',
		link: 'https://lorenzo-typing-game.vercel.app',
		kind: 'experiment',
		skills: [Skill.React]
	},
	{
		name: 'Budget App',
		link: 'https://lorenzo-ap.github.io/budget-app',
		kind: 'experiment',
		skills: [Skill.Angular]
	},
	{
		name: 'Kanban Board',
		link: 'https://lorenzo-ap.github.io/ng-kanban',
		kind: 'experiment',
		skills: [Skill.Angular]
	},
	{
		name: 'Background Generator',
		link: 'https://lorenzo-ap.github.io/background-generator',
		kind: 'experiment',
		skills: [Skill.JavaScript]
	}
];
