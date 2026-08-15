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

/**
 * Secondary messaging handles. Fill one in and its link appears everywhere;
 * leave it empty and nothing renders — no dead links, no placeholders.
 *
 * `whatsapp`: a wa.me link — either the click-to-chat short link from the
 * WhatsApp app or 'https://wa.me/<international number, digits only>'.
 * `telegram`: username, with or without the leading '@'.
 */
export const messaging = {
	whatsapp: 'https://wa.me/message/HB2LCIV3ALTMA1',
	telegram: '@lorenzo_ap'
};

export const ENQUIRY_SUBJECT = 'Project enquiry';

export const mailto = (subject: string = ENQUIRY_SUBJECT) =>
	`mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export type MessagingChannelId = keyof typeof messaging;

export interface MessagingChannel {
	id: MessagingChannelId;
	/** Deep link that opens the conversation directly. */
	href: string;
	labelKey: 'footer.whatsapp' | 'footer.telegram';
}

const LEADING_AT = /^@/;

const buildMessagingChannels = () => {
	const channels: MessagingChannel[] = [];
	const whatsappLink = messaging.whatsapp.trim();
	const telegramHandle = messaging.telegram.trim().replace(LEADING_AT, '');

	if (whatsappLink) {
		channels.push({ id: 'whatsapp', href: whatsappLink, labelKey: 'footer.whatsapp' });
	}

	if (telegramHandle) {
		channels.push({ id: 'telegram', href: `https://t.me/${telegramHandle}`, labelKey: 'footer.telegram' });
	}

	return channels;
};

/** Only the channels that are actually configured, in the order they're shown. */
export const messagingChannels = buildMessagingChannels();
