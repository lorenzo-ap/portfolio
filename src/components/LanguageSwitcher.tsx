import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ease } from '../lib/motion';
import { Language, languages } from '../types';
import { CheckIcon, ChevronIcon } from './icons';

interface LanguageSwitcherProps {
	className?: string;
	/** `inline` lays the options out flat, for the mobile menu where a popover would be clipped. */
	variant?: 'dropdown' | 'inline';
}

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
			<div className={`flex rounded-full border border-border p-0.5 ${className}`}>
				{languages.map((language) => (
					<button
						aria-current={language === currentLanguage}
						aria-label={t(`footer.languages.${language}`)}
						className={`rounded-full px-2.5 py-1.5 font-medium font-mono text-[0.6875rem] uppercase leading-none tracking-wider transition-colors duration-300 ease-expo ${
							language === currentLanguage ? 'bg-faded-bg text-text' : 'text-faded-text hover:text-text'
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
			<button
				aria-expanded={open}
				aria-haspopup='listbox'
				aria-label={t('footer.language')}
				className={`flex h-10 items-center gap-1.5 rounded-full border px-2.5 transition-colors duration-300 ease-expo ${
					open ? 'border-border text-text' : 'border-transparent text-faded-text hover:border-border hover:text-text'
				}`}
				onClick={() => setOpen((isOpen) => !isOpen)}
				ref={triggerRef}
				type='button'
			>
				<span className='font-medium font-mono text-[0.6875rem] uppercase leading-none tracking-wider'>
					{currentLanguage}
				</span>
				<motion.span animate={{ rotate: open ? 180 : 0 }} className='flex' transition={{ duration: 0.3, ease }}>
					<ChevronIcon size={12} />
				</motion.span>
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						animate={{ opacity: 1, y: 0, scale: 1 }}
						className='absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[10rem] origin-top-right rounded-xl border border-border bg-surface-raised p-1 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)]'
						exit={{ opacity: 0, y: -6, scale: 0.96 }}
						initial={{ opacity: 0, y: -6, scale: 0.96 }}
						role='listbox'
						transition={{ duration: 0.22, ease }}
					>
						{languages.map((language) => {
							const isSelected = language === currentLanguage;

							return (
								<li key={language}>
									<button
										aria-selected={isSelected}
										className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-[0.875rem] transition-colors duration-200 ease-expo ${
											isSelected ? 'text-accent' : 'text-subfaded-text hover:bg-accent-soft hover:text-text'
										}`}
										onClick={() => select(language)}
										role='option'
										type='button'
									>
										{t(`footer.languages.${language}`)}
										{isSelected ? (
											<CheckIcon size={13} />
										) : (
											<span className='font-mono text-[0.625rem] text-faded-text uppercase tracking-wider'>
												{language}
											</span>
										)}
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
