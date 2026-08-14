/**
 * Single source of truth for identity + contact routes.
 * Everything the visitor can reach me through lives here.
 */
export const site = {
	name: 'Lorenzo Apolloni',
	shortName: 'Lorenzo',
	// Swap this if you'd rather route enquiries to a dedicated address.
	email: 'ap.lorenzo03@gmail.com',
	github: 'https://github.com/lorenzo-ap',
	linkedin: 'https://www.linkedin.com/in/lorenzo-apl/',
	currentCompany: {
		name: 'Barça Mobile',
		link: 'https://www.barcamobile.com/'
	}
} as const;

export const ENQUIRY_SUBJECT = 'Project enquiry';

export const mailto = (subject: string = ENQUIRY_SUBJECT) =>
	`mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
