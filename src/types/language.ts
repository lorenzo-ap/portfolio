export const Language = {
	EN: 'en',
	RU: 'ru',
	RO: 'ro'
} as const;
export type Language = (typeof Language)[keyof typeof Language];

export const languages: Language[] = [Language.EN, Language.RU, Language.RO];
