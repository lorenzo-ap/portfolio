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
	Fastify: 'Fastify'
};
export type Skill = (typeof Skill)[keyof typeof Skill];
