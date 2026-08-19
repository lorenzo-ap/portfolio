import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { mailto, messagingChannels, site } from '../data/site';
import { useFocusTrap, useHeaderState, useMediaQuery, useScrollLock } from '../hooks';
import { ease, easeInOut } from '../lib/motion';
import { ButtonLink } from './Button';
import { LogoMark } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

const routes = [
	{ path: '/work', labelKey: 'nav.work' as const },
	{ path: '/about', labelKey: 'nav.about' as const }
];

/** The sheet lists Home as well: on a phone the logo isn't an obvious way back. */
const sheetRoutes = [{ path: '/', labelKey: 'nav.home' as const }, ...routes];

const MENU_ID = 'mobile-nav';

const BAR =
	'flex items-center justify-between gap-4 rounded-full border transition-all duration-500 ease-expo md:gap-6';

/**
 * The bar's three surfaces, written out rather than composed, because Tailwind
 * scans source text and would strip anything it can't read as a literal.
 *
 * Over the sheet the bar has to be opaque: glass over a solid surface of the
 * same colour is just a rectangle.
 */
const barSurfaceClass = {
	flat: 'h-[var(--header-h)] border-transparent px-0',
	floating:
		'h-14 border-border bg-bg-translucent px-4 shadow-[0_14px_44px_-28px_var(--shadow-pop)] backdrop-blur-xl sm:px-5',
	overSheet: 'h-14 border-border bg-bg-color px-4 sm:px-5'
} as const;

/**
 * Following a link to the page you're already on is a no-op as far as the
 * router is concerned, so `ScrollToTop` never runs and nothing happens. Every
 * header link takes you back to the top instead, which is what a visitor
 * clicking the logo or the current section is asking for.
 */
const scrollToTopIfCurrent = (isCurrent: boolean) => () => {
	if (isCurrent) window.scrollTo({ top: 0 });
};

interface NavLinkProps {
	path: string;
	label: string;
	isActive: boolean;
}

const NavLink = ({ path, label, isActive }: NavLinkProps) => (
	<Link
		aria-current={isActive ? 'page' : undefined}
		className={`relative py-2 font-medium font-mono text-[0.8125rem] uppercase tracking-[0.12em] transition-colors duration-300 ease-expo hover:text-text ${
			isActive ? 'text-text' : 'text-faded-text'
		}`}
		onClick={scrollToTopIfCurrent(isActive)}
		to={path}
	>
		{label}
		{isActive && (
			<motion.span
				className='absolute inset-x-0 bottom-0 h-px bg-accent'
				layoutId='nav-underline'
				transition={{ duration: 0.4, ease }}
			/>
		)}
	</Link>
);

/**
 * The header.
 *
 * At the top of a page it's just marks on the page, sitting on the same grid as
 * everything under it. Once past the fold it lifts off and becomes a floating
 * bar: glass, a hairline, a shadow, and a little air above it. It never leaves,
 * because navigation you have to go hunting for isn't navigation.
 *
 * The bar changes size but the space it reserves in the layout doesn't
 * (`--header-h`), so nothing below it moves when it settles.
 *
 * On a phone the second half of that system is the sheet. It covers the whole
 * viewport, including the strip the bar sits in, which is what lets the bar keep
 * whatever shape it already had: opening the menu halfway down a page changes
 * nothing about the bar's position, and no part of the page shows through above
 * the first menu item.
 */
export const Header = () => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);

	// Order matters. The lock takes the body out of the flow, which reports a
	// scroll position of zero, so the header has to stop reading scroll first.
	const scrolled = useHeaderState(menuOpen);
	useScrollLock(menuOpen, pathname);
	useFocusTrap(headerRef, menuOpen);

	const isDesktop = useMediaQuery('(min-width: 768px)');

	// Close on route change, and never leave the page scroll-locked.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	// A sheet that only exists below `md` has to close when the viewport grows
	// past it, or the page stays locked behind a menu nobody can see.
	useEffect(() => {
		if (isDesktop) setMenuOpen(false);
	}, [isDesktop]);

	useEffect(() => {
		if (!menuOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setMenuOpen(false);
		};

		document.addEventListener('keydown', onKeyDown);

		return () => document.removeEventListener('keydown', onKeyDown);
	}, [menuOpen]);

	const isActive = (path: string) => pathname === path || (path === '/work' && pathname === '/projects');
	const barSurface = scrolled ? barSurfaceClass[menuOpen ? 'overSheet' : 'floating'] : barSurfaceClass.flat;

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
				initial={{ y: -20, opacity: 0 }}
				ref={headerRef}
				transition={{ duration: 0.6, ease, delay: 0.1 }}
			>
				<AnimatePresence>
					{menuOpen && (
						<motion.div
							animate={{ opacity: 1 }}
							className='nav-sheet md:hidden'
							exit={{ opacity: 0, transition: { duration: 0.2, ease: easeInOut } }}
							initial={{ opacity: 0 }}
							transition={{ duration: 0.28, ease }}
						>
							<nav aria-label={t('nav.label')} className='shell nav-sheet__body' id={MENU_ID}>
								<ul>
									{sheetRoutes.map((route, index) => (
										<motion.li
											animate={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 14 }}
											key={route.path}
											transition={{ duration: 0.45, ease, delay: 0.05 + index * 0.06 }}
										>
											<Link
												aria-current={isActive(route.path) ? 'page' : undefined}
												className='nav-sheet__link statement text-headline'
												onClick={() => {
													setMenuOpen(false);
													// The scroll lock restores its offset as it lifts, so the
													// trip to the top has to wait for the frame after that.
													if (isActive(route.path)) requestAnimationFrame(() => window.scrollTo({ top: 0 }));
												}}
												to={route.path}
											>
												{t(route.labelKey)}
												{isActive(route.path) && (
													<span aria-hidden='true' className='h-1.5 w-1.5 flex-none rounded-full bg-accent' />
												)}
											</Link>
										</motion.li>
									))}
								</ul>

								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className='flex flex-col gap-7'
									initial={{ opacity: 0, y: 14 }}
									transition={{ duration: 0.45, ease, delay: 0.24 }}
								>
									<ButtonLink className='w-full' href={mailto()}>
										{t('actions.startProject')}
									</ButtonLink>

									<div className='flex flex-wrap items-center gap-x-6 font-mono text-[0.8125rem] text-faded-text'>
										<a className='tap transition-colors duration-300 ease-expo active:text-accent' href={mailto()}>
											{site.email}
										</a>
										{messagingChannels.map((channel) => (
											<Link
												className='tap transition-colors duration-300 ease-expo active:text-accent'
												key={channel.id}
												target='_blank'
												to={channel.href}
											>
												{t(channel.labelKey)}
											</Link>
										))}
									</div>

									<div className='flex items-center justify-between gap-4 border-border border-t pt-6'>
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

				{/*
				 * Positioned, so it paints above the sheet. Paint order between
				 * siblings isn't DOM order once one of them is positioned: the sheet
				 * is fixed, and a static bar would end up underneath it.
				 */}
				<div className={`relative z-10 transition-[padding] duration-500 ease-expo ${scrolled ? 'pt-3' : 'pt-0'}`}>
					<div className='shell'>
						<div className={`${BAR} ${barSurface}`}>
							{/* The mark and the name are one target, so the turn belongs to the
							    whole link rather than to whichever half the pointer landed on. */}
							<Link
								aria-label={site.name}
								className='group/logo -my-2 flex min-w-0 items-center gap-2.5 py-2 text-text'
								onClick={() => {
									setMenuOpen(false);
									if (pathname === '/') window.scrollTo({ top: 0 });
								}}
								to='/'
							>
								<span className='flex-none transition-transform duration-700 ease-expo group-hover/logo:rotate-180'>
									<LogoMark size={26} title={t('nav.home')} />
								</span>
								<span className='truncate font-medium text-[0.9375rem] tracking-tight'>{site.name}</span>
							</Link>

							<div className='flex flex-none items-center gap-1 md:gap-5'>
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

								<div className='flex items-center gap-1'>
									<LanguageSwitcher className='hidden md:flex' />
									<ThemeSwitcher />
								</div>

								<ButtonLink className='hidden md:inline-flex' href={mailto()} small variant='ghost' withArrow={false}>
									{t('actions.startProject')}
								</ButtonLink>

								<button
									aria-controls={MENU_ID}
									aria-expanded={menuOpen}
									aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
									className='-mr-2.5 flex h-11 w-11 items-center justify-center text-text md:hidden'
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
				</div>
			</motion.header>
		</>
	);
};
