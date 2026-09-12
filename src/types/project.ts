import type { BuildGroupKey, BuildKey, CaseStudyKey, ProjectKindKey } from './i18n';

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
	/** The product's own icon in `public/icons/`, shown before the title. */
	icon?: string;
	/** Label for the main link. Defaults to `visitSite`. */
	primaryLabelKey?: ProjectLinkLabelKey;
	secondaryLink?: {
		href: string;
		labelKey: ProjectLinkLabelKey;
	};
	/** Hue (deg) for the generated preview. Keep it in the accent family (200-250). */
	hue: number;
}

/**
 * A build: something complete I made without a client, for a business that
 * doesn't exist. It gets a name and an address and nothing else, because the
 * copy that describes it is translated and lives under `builds.items`.
 */
export interface BuildModel {
	/** Matches the key under `builds.items` in the locale files. */
	key: BuildKey;
	name: string;
	link: string;
}

/** One topic's worth of builds. The grouping is what keeps the list short. */
export interface BuildGroupModel {
	/** Matches the key under `builds.groups` in the locale files. */
	key: BuildGroupKey;
	builds: BuildModel[];
}
