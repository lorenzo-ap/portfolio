import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Language, languages } from '../types';
import en from './locales/en.json';
import ro from './locales/ro.json';
import ru from './locales/ru.json';

export const LANGUAGE_STORAGE_KEY = 'language';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			[Language.EN]: { translation: en },
			[Language.RU]: { translation: ru },
			[Language.RO]: { translation: ro }
		},
		supportedLngs: languages,
		fallbackLng: Language.EN,
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: LANGUAGE_STORAGE_KEY,
			caches: ['localStorage']
		},
		interpolation: {
			escapeValue: false
		}
	});

document.documentElement.lang = i18n.resolvedLanguage ?? Language.EN;

i18n.on('languageChanged', (language) => {
	document.documentElement.lang = language;
});
