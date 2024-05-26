import { useEffect } from 'react';

const useTheme = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme');

        !theme && localStorage.setItem('theme', 'dark');

        document.documentElement.classList.add(theme || 'dark');
    });
};

export default useTheme;
