import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { mailto, site } from '../data/site';
import { useScrolled } from '../hooks';
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
	onNavigate?: () => void;
}

const NavLink = ({ path, label, isActive, onNavigate }: NavLinkProps) => (
	<Link
		className={`relative py-1 text-[0.9375rem] transition-colors duration-300 ease-expo hover:text-text ${
			isActive ? 'text-text' : 'text-faded-text'
		}`}
		onClick={onNavigate}
		to={path}
	>
		{label}
		{isActive && (
			<motion.span
				className='absolute inset-x-0 -bottom-0.5 h-px bg-accent'
				layoutId='nav-underline'
				transition={{ duration: 0.4, ease }}
			/>
		)}
	</Link>
);

export const Header = () => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const scrolled = useScrolled();
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

	const isActive = (path: string) => pathname === path || (path === '/work' && pathname === '/projects');

	return (
		<>
			<a
				className='sr-only -translate-y-full focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:translate-y-0 focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-bg-color'
				href='#main'
			>
				{t('nav.skipToContent')}
			</a>

			<motion.header
				animate={{ y: 0, opacity: 1 }}
				className='fixed inset-x-0 top-0 z-50'
				initial={{ y: -24, opacity: 0 }}
				transition={{ duration: 0.6, ease, delay: 0.1 }}
			>
				<div
					className={`transition-all duration-500 ease-expo ${
						scrolled || menuOpen
							? 'border-border border-b bg-bg-translucent backdrop-blur-xl'
							: 'border-transparent border-b'
					}`}
				>
					<div className='shell flex h-[68px] items-center justify-between gap-6'>
						<Link
							aria-label={site.name}
							className='-ml-1 flex items-center gap-2.5 text-text'
							onClick={() => setMenuOpen(false)}
							to='/'
						>
							<span className='transition-transform duration-700 ease-expo hover:rotate-180'>
								<LogoMark size={30} title={t('nav.home')} />
							</span>
							<span className='hidden font-medium text-[0.9375rem] tracking-tight sm:inline'>{site.name}</span>
						</Link>

						<div className='flex items-center gap-3 md:gap-5'>
							<nav aria-label={t('nav.label')} className='hidden md:block'>
								<ul className='flex items-center gap-7'>
									{routes.map((route) => (
										<li key={route.path}>
											<NavLink isActive={isActive(route.path)} label={t(route.labelKey)} path={route.path} />
										</li>
									))}
								</ul>
							</nav>

							<span aria-hidden='true' className='hidden h-4 w-px bg-border md:block' />

							<div className='flex items-center gap-1.5'>
								<LanguageSwitcher className='hidden md:flex' />
								<ThemeSwitcher />
							</div>

							<ButtonLink className='hidden md:inline-flex' href={mailto()} small variant='ghost' withArrow={false}>
								{t('actions.startProject')}
							</ButtonLink>

							<button
								aria-expanded={menuOpen}
								aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
								className='-mr-2 flex h-10 w-10 items-center justify-center text-text md:hidden'
								onClick={() => setMenuOpen((open) => !open)}
								type='button'
							>
								<span className='relative block h-3.5 w-6'>
									<motion.span
										animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
										className='absolute inset-x-0 top-0 h-px bg-current'
										transition={{ duration: 0.35, ease: easeInOut }}
									/>
									<motion.span
										animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
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
							animate={{ height: 'auto', opacity: 1 }}
							className='overflow-hidden border-border border-b bg-bg-color md:hidden'
							exit={{ height: 0, opacity: 0 }}
							initial={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.45, ease }}
						>
							<nav aria-label={t('nav.label')} className='shell flex flex-col gap-1 py-6'>
								{routes.map((route, index) => (
									<motion.div
										animate={{ opacity: 1, y: 0 }}
										initial={{ opacity: 0, y: 12 }}
										key={route.path}
										transition={{ duration: 0.4, ease, delay: 0.06 + index * 0.06 }}
									>
										<Link
											className={`block border-border border-b py-3.5 font-semibold text-[1.75rem] tracking-tight ${
												isActive(route.path) ? 'text-text' : 'text-faded-text'
											}`}
											to={route.path}
										>
											{t(route.labelKey)}
										</Link>
									</motion.div>
								))}

								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className='pt-6'
									initial={{ opacity: 0, y: 12 }}
									transition={{ duration: 0.4, ease, delay: 0.2 }}
								>
									<ButtonLink className='w-full' href={mailto()}>
										{t('actions.startProject')}
									</ButtonLink>
								</motion.div>

								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className='flex items-center justify-between pt-7'
									initial={{ opacity: 0, y: 12 }}
									transition={{ duration: 0.4, ease, delay: 0.26 }}
								>
									<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
										{t('footer.language')}
									</span>
									<LanguageSwitcher variant='inline' />
								</motion.div>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.header>
		</>
	);
};
