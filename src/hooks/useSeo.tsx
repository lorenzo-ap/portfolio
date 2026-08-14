import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PageTitleKey } from '../types';

const upsertMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
	let element = document.head.querySelector<HTMLMetaElement>(selector);

	if (!element) {
		element = document.createElement('meta');
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}

	element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
	let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

	if (!element) {
		element = document.createElement('link');
		element.rel = 'canonical';
		document.head.appendChild(element);
	}

	element.href = href;
};

interface SeoOptions {
	titleKey: PageTitleKey;
	descriptionKey?: 'home' | 'work' | 'about';
}

/**
 * Keeps title, description, canonical and Open Graph tags correct per route.
 * Canonical is derived from the live origin so it stays right on any domain.
 */
export const useSeo = ({ titleKey, descriptionKey }: SeoOptions) => {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		const title = t(`pageTitles.${titleKey}`);
		const description = descriptionKey ? t(`meta.${descriptionKey}`) : undefined;
		const url = `${window.location.origin}${window.location.pathname}`;

		document.title = title;
		upsertCanonical(url);
		upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
		upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
		upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
		upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', i18n.resolvedLanguage ?? 'en');

		if (description) {
			upsertMeta('meta[name="description"]', 'name', 'description', description);
			upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
			upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
		}
	}, [t, i18n.resolvedLanguage, titleKey, descriptionKey]);
};
