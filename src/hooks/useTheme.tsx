import { useCallback, useEffect, useState } from 'react';
import { Theme } from '../types';

export const THEME_STORAGE_KEY = 'theme';

/**
 * The class is already on <html> before first paint (inline script in index.html),
 * so this hook only has to read it back and keep it in sync.
 */
const readTheme = (): Theme => (document.documentElement.classList.contains(Theme.Light) ? Theme.Light : Theme.Dark);

export const useTheme = () => {
	const [theme, setThemeState] = useState<Theme>(Theme.Dark);

	useEffect(() => {
		setThemeState(readTheme());
	}, []);

	const setTheme = useCallback((next: Theme) => {
		const root = document.documentElement;

		root.classList.remove(next === Theme.Dark ? Theme.Light : Theme.Dark);
		root.classList.add(next);
		localStorage.setItem(THEME_STORAGE_KEY, next);

		setThemeState(next);
	}, []);

	return { theme, setTheme };
};
