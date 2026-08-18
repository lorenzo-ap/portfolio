import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { GithubIcon, LinkedinIcon, LogoMark } from './icons';

const columnTitle = 'mb-5 font-medium font-mono text-eyebrow text-faded-text uppercase';
const columnLink =
	'inline-block text-body-sm text-subfaded-text transition-colors duration-300 ease-expo hover:text-accent';

const pages = [
	{ to: '/', labelKey: 'nav.home' as const },
	{ to: '/work', labelKey: 'nav.work' as const },
	{ to: '/about', labelKey: 'nav.about' as const }
];

/**
 * Deliberately thin.
 *
 * The contact band sits directly above it with the email address, the messaging
 * channels and the availability line. Repeating all of that here would be the
 * third time the page asks for the same thing, so the footer only carries what
 * the band doesn't: the routes and the two profiles.
 */
export const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className='shell'>
			<div className='pt-16 pb-12'>
				<div className='grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-12'>
					<div className='lg:col-span-6'>
						<Link className='inline-flex items-center gap-2.5 text-text' to='/'>
							<LogoMark size={24} title={t('nav.home')} />
							<span className='font-medium text-[0.9375rem] tracking-tight'>{site.name}</span>
						</Link>

						<p className='mt-6 max-w-[32ch] text-body-sm text-faded-text'>{t('footer.tagline')}</p>

						<a className='link link__accent mt-6 inline-block break-all text-body-sm' href={`mailto:${site.email}`}>
							{site.email}
						</a>
					</div>

					<div className='lg:col-span-3'>
						<h2 className={columnTitle}>{t('footer.navLabel')}</h2>
						<ul className='flex flex-col gap-3'>
							{pages.map((page) => (
								<li key={page.to}>
									<Link className={columnLink} to={page.to}>
										{t(page.labelKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='lg:col-span-3'>
						<h2 className={columnTitle}>{t('footer.contactLabel')}</h2>
						<ul className='flex flex-col gap-3'>
							<li>
								<Link className={`${columnLink} inline-flex items-center gap-2`} target='_blank' to={site.linkedin}>
									<LinkedinIcon size={14} title={t('footer.linkedin')} />
									{t('footer.linkedin')}
								</Link>
							</li>
							<li>
								<Link className={`${columnLink} inline-flex items-center gap-2`} target='_blank' to={site.github}>
									<GithubIcon size={14} title={t('footer.github')} />
									{t('footer.github')}
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/*
				 * The name at the scale it deserves once, at the very bottom, where
				 * there's nothing left to compete with it. Hidden from assistive
				 * technology: it's the same name the footer already opens with.
				 */}
				<p
					aria-hidden='true'
					className='statement mt-24 select-none text-[clamp(2.75rem,12vw,10rem)] text-wordmark leading-[0.82] tracking-[-0.04em]'
				>
					{site.name}
				</p>

				<div className='mt-10 flex flex-wrap items-center justify-between gap-4 border-border border-t pt-7 font-mono text-[0.75rem] text-faded-text'>
					<p className='flex items-center gap-2'>
						<span>&copy; {new Date().getFullYear()}</span>
						<span className='dot' />
						<span>{site.name}</span>
					</p>

					<button
						className='group inline-flex items-center gap-1.5 transition-colors duration-300 ease-expo hover:text-accent'
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						type='button'
					>
						{t('actions.backToTop')}
						<span
							aria-hidden='true'
							className='transition-transform duration-500 ease-expo group-hover:-translate-y-0.5'
						>
							↑
						</span>
					</button>
				</div>
			</div>
		</footer>
	);
};
