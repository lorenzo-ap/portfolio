import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ease } from '../lib/motion';
import { Language, languages } from '../types';
import { CheckIcon } from './icons';

interface LanguageSwitcherProps {
	className?: string;
	/** `inline` lays the options out flat, for the mobile menu where a popover would be clipped. */
	variant?: 'dropdown' | 'inline';
}

/** The mono scale tracks wide, which pushes short labels off-centre unless the lead is padded back. */
const code = 'pl-[0.14em] font-medium font-mono text-eyebrow uppercase';

export const LanguageSwitcher = ({ className = '', variant = 'dropdown' }: LanguageSwitcherProps) => {
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage ?? Language.EN;

	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;

			setOpen(false);
			triggerRef.current?.focus();
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	const select = (language: Language) => {
		i18n.changeLanguage(language);
		setOpen(false);
	};

	if (variant === 'inline') {
		return (
			<div className={`flex items-center gap-1 rounded-full border border-border p-1 ${className}`}>
				{languages.map((language) => (
					<button
						aria-current={language === currentLanguage}
						aria-label={t(`footer.languages.${language}`)}
						className={`${code} rounded-full px-2.5 py-2 transition-colors duration-300 ease-expo ${
							language === currentLanguage ? 'bg-accent-soft text-accent' : 'text-faded-text hover:text-text'
						}`}
						key={language}
						onClick={() => i18n.changeLanguage(language)}
						type='button'
					>
						{language}
					</button>
				))}
			</div>
		);
	}

	return (
		<div className={`relative ${className}`} ref={rootRef}>
			{/* Sized and shaped exactly like the theme toggle, so the two read as one pair of controls. */}
			<button
				aria-expanded={open}
				aria-haspopup='listbox'
				aria-label={t('footer.language')}
				className={`${code} flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ease-expo ${
					open
						? 'border-border bg-faded-bg text-text'
						: 'border-transparent text-faded-text hover:border-border hover:text-text'
				}`}
				onClick={() => setOpen((isOpen) => !isOpen)}
				ref={triggerRef}
				title={t('footer.language')}
				type='button'
			>
				{currentLanguage}
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						animate={{ opacity: 1, y: 0, scale: 1 }}
						className='absolute top-[calc(100%+0.625rem)] right-0 z-50 min-w-[11.5rem] origin-top-right rounded-2xl border border-border bg-surface-raised p-1.5 shadow-[0_20px_44px_-28px_var(--shadow-pop)]'
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						role='listbox'
						transition={{ duration: 0.22, ease }}
					>
						{languages.map((language) => {
							const isSelected = language === currentLanguage;

							return (
								<li key={language}>
									<button
										aria-selected={isSelected}
										className={`flex w-full items-center justify-between gap-6 rounded-full px-3.5 py-2 text-left text-[0.9375rem] transition-colors duration-300 ease-expo ${
											isSelected ? 'text-accent' : 'text-faded-text hover:bg-faded-bg hover:text-text'
										}`}
										onClick={() => select(language)}
										role='option'
										type='button'
									>
										{t(`footer.languages.${language}`)}
										{isSelected ? <CheckIcon size={13} /> : <span className={`${code} opacity-70`}>{language}</span>}
									</button>
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};
