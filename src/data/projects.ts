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
	hue: 214
};

/** Client work on a genuinely complicated product. */
const examin: CaseStudyModel = {
	key: 'examin',
	name: 'Examin.ai',
	link: 'https://examin.ai/',
	kind: 'client',
	hue: 226
};

/** Idea → product → live application, all mine. */
const ainterest: CaseStudyModel = {
	key: 'ainterest',
	name: 'AInterest',
	link: 'https://www.ainterest.me/',
	kind: 'product',
	hue: 236
};

/** Not software. Same weight on the page, deliberately different in shape. */
const aiForFrontend: CaseStudyModel = {
	key: 'aiForFrontend',
	name: 'AI for Frontend Developers',
	link: 'https://itlogia.ru/ai-front',
	kind: 'course',
	primaryLabelKey: 'viewCourse',
	hue: 204
};

/** The three software products, shown as full-width alternating rows. */
export const productCaseStudies: CaseStudyModel[] = [barcaMobile, examin, ainterest];

/** Teaching sits apart: the same weight, a different kind of proof. */
export const teachingCaseStudy: CaseStudyModel = aiForFrontend;

/** Everything, in the order the story is told. */
export const caseStudies: CaseStudyModel[] = [...productCaseStudies, teachingCaseStudy];
