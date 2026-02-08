import type { Skill } from '.';

export interface ProjectModel {
	name: string;
	link: string;
	skills: Skill[];
	description?: string;
}
