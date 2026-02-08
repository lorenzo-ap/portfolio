export const Label = {
	Development: 'In development',
	Finished: 'Finished',
	React: 'React',
	Angular: 'Angular',
	JavaScript: 'JavaScript'
} as const;
export type Label = (typeof Label)[keyof typeof Label];
