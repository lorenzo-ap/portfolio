import type { Skill } from '.';
import type { ProjectDescriptionKey } from './i18n';

export interface ProjectModel {
	name: string;
	link: string;
	skills: Skill[];
	descriptionKey?: ProjectDescriptionKey;
	hackathonLink?: string;
}
