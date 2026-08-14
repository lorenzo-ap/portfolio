import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PageTitleKey } from '../types';

export const usePageTitle = (titleKey: PageTitleKey) => {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t(`pageTitles.${titleKey}`);
	}, [t, titleKey]);
};
