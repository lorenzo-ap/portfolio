import type { CaseStudyKey, ProjectKindKey } from './i18n';

/** Labels available to a project's external links. Matches keys under `actions`. */
export type ProjectLinkLabelKey = 'visitSite' | 'appStoreLink' | 'viewCourse';

/** Narrative case study. This is the only format the site uses. */
export interface CaseStudyModel {
	/** Matches the key under `work.cases` in the locale files. */
	key: CaseStudyKey;
	name: string;
	link: string;
	/** Matches the key under `work.kinds` in the locale files. */
	kind: ProjectKindKey;
	/** Optional real screenshot in `public/`; falls back to a generated visual. */
	image?: string;
	/** Label for the main link. Defaults to `visitSite`. */
	primaryLabelKey?: ProjectLinkLabelKey;
	secondaryLink?: {
		href: string;
		labelKey: ProjectLinkLabelKey;
	};
	/** Hue (deg) for the generated preview. Keep it in the accent family (200-250). */
	hue: number;
}
