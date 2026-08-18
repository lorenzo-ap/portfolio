import type { CaseStudyModel } from '../types';

/**
 * Four pieces of work, in the order they're meant to be read:
 * real product → complex product → my own product → teaching.
 *
 * `key` resolves the Situation / What I did / Hard part / What this shows copy
 * from the locale files, so every language tells the same story.
 */

/** The day job: a live product with paying customers and a brand attached. */
const barcaMobile: CaseStudyModel = {
	key: 'barcaMobile',
	name: 'Barça Mobile',
	link: 'https://www.barcamobile.com/',
	kind: 'live',
	secondaryLink: {
		href: 'https://apps.apple.com/bg/app/bar%C3%A7a-mobile-your-travel-esim/id6741801803',
		labelKey: 'appStoreLink'
	},
	icon: '/icons/barca-mobile.png',
	hue: 214
};

/** Client work on a genuinely complicated product. */
const examin: CaseStudyModel = {
	key: 'examin',
	name: 'Examin.ai',
	link: 'https://examin.ai/',
	kind: 'client',
	icon: '/icons/examin.png',
	hue: 226
};

/** Idea → product → live application, all mine. */
const ainterest: CaseStudyModel = {
	key: 'ainterest',
	name: 'AInterest',
	link: 'https://www.ainterest.me/',
	kind: 'product',
	icon: '/icons/ainterest.svg',
	hue: 236
};

/** Not software. Same weight on the page, deliberately different in shape. */
const aiForFrontend: CaseStudyModel = {
	key: 'aiForFrontend',
	name: 'AI for Frontend Developers',
	link: 'https://itlogia.ru/ai-front',
	kind: 'course',
	primaryLabelKey: 'viewCourse',
	icon: '/icons/itlogia.png',
	hue: 204
};

/**
 * Everything, in the order the story is told. One list: the pages read it
 * straight through, and the piece that isn't software says so through its
 * `kind` rather than by being kept in a separate array.
 */
export const caseStudies: CaseStudyModel[] = [barcaMobile, examin, ainterest, aiForFrontend];
