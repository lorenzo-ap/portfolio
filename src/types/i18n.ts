import type en from '../i18n/locales/en.json';

export type Translations = typeof en;

export type PageTitleKey = keyof Translations['pageTitles'];

export type ProjectDescriptionKey = keyof Translations['projects']['items'];
