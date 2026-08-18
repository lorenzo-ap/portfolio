import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { mailto, messagingChannels, site } from '../data/site';
import { useHeaderState } from '../hooks';
import { ease, easeInOut } from '../lib/motion';
import { ButtonLink } from './Button';
import { LogoMark } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

const routes = [
	{ path: '/work', labelKey: 'nav.work' as const },
	{ path: '/about', labelKey: 'nav.about' as const }
];

interface NavLinkProps {
	path: string;
	label: string;
	isActive: boolean;
}

const NavLink = ({ path, label, isActive }: NavLinkProps) => (
	<Link
		className={`relative py-1.5 font-medium font-mono text-[0.8125rem] uppercase tracking-[0.12em] transition-colors duration-300 ease-expo hover:text-text ${
			isActive ? 'text-text' : 'text-faded-text'
		}`}
		to={path}
	>
		{label}
		{isActive && (
			<motion.span
				className='absolute inset-x-0 -bottom-px h-px bg-accent'
				layoutId='nav-underline'
				transition={{ duration: 0.4, ease }}
			/>
		)}
	</Link>
);

/**
 * The header.
 *
 * It has three states rather than two. At the top of a page it's just marks on
 * the page with no bar behind them. Once past the fold it earns a background.
 * And while the visitor is scrolling forwards it leaves, because navigation is
 * only useful at the moment somebody looks for it, which is when they scroll
 * back up.
 */
export const Header = () => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const { scrolled, hidden } = useHeaderState();
	const [menuOpen, setMenuOpen] = useState(false);

	// Close on route change, and never leave the page scroll-locked.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setMenuOpen(false);
		};

		document.addEventListener('keydown', onKeyDown);

		return () => document.removeEventListener('keydown', onKeyDown);
	}, [menuOpen]);

	const isActive = (path: string) => pathname === path || (path === '/work' && pathname === '/projects');
	// The bar shrinks as you leave the first screen. The space it reserves in the
	// layout doesn't, so nothing below it moves when the bar changes size.
	const compact = scrolled && !menuOpen;

	return (
		<>
			<a
				className='sr-only -translate-y-full focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:translate-y-0 focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-bg-color'
				href='#main'
			>
				{t('nav.skipToContent')}
			</a>

			<motion.header
				animate={{ y: hidden && !menuOpen ? '-100%' : '0%', opacity: 1 }}
				className='fixed inset-x-0 top-0 z-50'
				initial={{ y: '-100%', opacity: 0 }}
				transition={{ duration: 0.5, ease }}
			>
				<div
					className={`transition-colors duration-500 ease-expo ${
						scrolled && !menuOpen
							? 'border-border border-b bg-bg-translucent backdrop-blur-xl'
							: 'border-transparent border-b'
					}`}
				>
					<div
						className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ease-expo ${
							compact ? 'h-14' : 'h-20'
						}`}
					>
						<Link
							aria-label={site.name}
							className='-ml-1 flex items-center gap-2.5 text-text'
							onClick={() => setMenuOpen(false)}
							to='/'
						>
							<span className='transition-transform duration-700 ease-expo hover:rotate-180'>
								<LogoMark size={28} title={t('nav.home')} />
							</span>
							<span className='hidden font-medium text-[0.9375rem] tracking-tight sm:inline'>{site.name}</span>
						</Link>

						<div className='flex items-center gap-3 md:gap-6'>
							<nav aria-label={t('nav.label')} className='hidden md:block'>
								<ul className='flex items-center gap-8'>
									{routes.map((route) => (
										<li key={route.path}>
											<NavLink isActive={isActive(route.path)} label={t(route.labelKey)} path={route.path} />
										</li>
									))}
								</ul>
							</nav>

							<span aria-hidden='true' className='hidden h-4 w-px bg-border md:block' />

							<div className='flex items-center gap-1'>
								<LanguageSwitcher className='hidden md:flex' />
								<ThemeSwitcher />
							</div>

							<ButtonLink className='hidden md:inline-flex' href={mailto()} small variant='ghost' withArrow={false}>
								{t('actions.startProject')}
							</ButtonLink>

							<button
								aria-expanded={menuOpen}
								aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
								className='-mr-2 flex h-11 w-11 items-center justify-center text-text md:hidden'
								onClick={() => setMenuOpen((open) => !open)}
								type='button'
							>
								<span className='relative block h-3 w-6'>
									<motion.span
										animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5.5 : 0 }}
										className='absolute inset-x-0 top-0 h-px bg-current'
										transition={{ duration: 0.35, ease: easeInOut }}
									/>
									<motion.span
										animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5.5 : 0 }}
										className='absolute inset-x-0 bottom-0 h-px bg-current'
										transition={{ duration: 0.35, ease: easeInOut }}
									/>
								</span>
							</button>
						</div>
					</div>
				</div>

				<AnimatePresence>
					{menuOpen && (
						<motion.div
							animate={{ opacity: 1 }}
							className={`fixed inset-0 bg-bg-color md:hidden ${compact ? 'top-14' : 'top-20'}`}
							exit={{ opacity: 0, transition: { duration: 0.2, ease: easeInOut } }}
							initial={{ opacity: 0 }}
							transition={{ duration: 0.32, ease }}
						>
							<nav
								aria-label={t('nav.label')}
								className='shell flex h-full flex-col justify-between overflow-y-auto pt-10 pb-12'
							>
								<ul>
									{routes.map((route, index) => (
										<motion.li
											animate={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 16 }}
											key={route.path}
											transition={{ duration: 0.5, ease, delay: 0.06 + index * 0.07 }}
										>
											<Link
												className={`statement block border-border border-b py-6 text-display-sm ${
													isActive(route.path) ? 'text-text' : 'text-faded-text'
												}`}
												to={route.path}
											>
												{t(route.labelKey)}
											</Link>
										</motion.li>
									))}
								</ul>

								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className='flex flex-col gap-8 pt-10'
									initial={{ opacity: 0, y: 16 }}
									transition={{ duration: 0.5, ease, delay: 0.24 }}
								>
									<ButtonLink className='w-full' href={mailto()}>
										{t('actions.startProject')}
									</ButtonLink>

									<div className='flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[0.8125rem] text-faded-text'>
										<a className='transition-colors duration-300 ease-expo hover:text-accent' href={mailto()}>
											{site.email}
										</a>
										{messagingChannels.map((channel) => (
											<Link
												className='transition-colors duration-300 ease-expo hover:text-accent'
												key={channel.id}
												target='_blank'
												to={channel.href}
											>
												{t(channel.labelKey)}
											</Link>
										))}
									</div>

									<div className='flex items-center justify-between border-border border-t pt-7'>
										<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
											{t('footer.language')}
										</span>
										<LanguageSwitcher variant='inline' />
									</div>
								</motion.div>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.header>
		</>
	);
};
