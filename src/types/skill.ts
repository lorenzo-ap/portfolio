export const Skill = {
	React: 'React',
	NextJS: 'Next.js',
	SolidJS: 'SolidJS',
	Angular: 'Angular',
	JavaScript: 'JavaScript',
	TypeScript: 'TypeScript',
	jQuery: 'jQuery',
	HTML: 'HTML',
	CSS: 'CSS',
	Fastify: 'Fastify',
	Express: 'Express',
	NodeJS: 'Node.js',
	ReactNative: 'React Native',
	CurriculumDesign: 'Curriculum Design',
	AITooling: 'AI Tooling',
	SystemDesign: 'System Design'
};
export type Skill = (typeof Skill)[keyof typeof Skill];
