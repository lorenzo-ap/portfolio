import type { Skill } from '.';
import type { ArchiveDescriptionKey, CaseStudyKey, ProjectKindKey } from './i18n';

/** Narrative case study. This is the format the site leads with. */
export interface CaseStudyModel {
	/** Matches the key under `work.cases` in the locale files. */
	key: CaseStudyKey;
	name: string;
	link: string;
	/** Matches the key under `work.kinds` in the locale files. */
	kind: ProjectKindKey;
	skills: Skill[];
	/** Optional real screenshot in `public/`; falls back to a generated visual. */
	image?: string;
	secondaryLink?: {
		href: string;
		labelKey: 'hackathonLink' | 'sourceLink';
	};
	/** Hue (deg) for the generated preview. Keep it in the accent family (200-250). */
	hue: number;
}

/** Compact entry for smaller builds and experiments. */
export interface ArchiveProjectModel {
	name: string;
	link: string;
	skills: Skill[];
	kind: ProjectKindKey;
	descriptionKey?: ArchiveDescriptionKey;
}
