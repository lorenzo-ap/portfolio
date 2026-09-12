import type en from '../i18n/locales/en.json';

export type Translations = typeof en;

export type PageTitleKey = keyof Translations['pageTitles'];

export type CaseStudyKey = keyof Translations['work']['cases'];

export type ProjectKindKey = keyof Translations['work']['kinds'];

export type CapabilityKey = keyof Translations['capabilities']['items'];

export type ProcessStepKey = keyof Translations['process']['steps'];

export type BuildKey = keyof Translations['builds']['items'];

export type BuildGroupKey = keyof Translations['builds']['groups'];
