import { useTranslation } from 'react-i18next';
import { Language, languages } from '../types';

export const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage ?? Language.EN;

	return (
		<div className='flex rounded-md bg-faded-bg'>
			{languages.map((language) => (
				<button
					aria-label={t(`footer.languages.${language}`)}
					aria-pressed={language === currentLanguage}
					className={`${
						language === currentLanguage ? 'bg-faded-bg text-text' : 'text-faded-text'
					} rounded-md px-1.5 py-1 font-medium text-[12px] uppercase leading-4 hover:bg-faded-bg hover:text-text`}
					key={language}
					onClick={() => i18n.changeLanguage(language)}
					type='button'
				>
					{language}
				</button>
			))}
		</div>
	);
};
