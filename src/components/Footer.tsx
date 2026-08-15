import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { type MessagingChannelId, messagingChannels, site } from '../data/site';
import { GithubIcon, LinkedinIcon, LogoMark, TelegramIcon, WhatsappIcon } from './icons';

const channelIcon: Record<MessagingChannelId, typeof WhatsappIcon> = {
	whatsapp: WhatsappIcon,
	telegram: TelegramIcon
};

const columnTitle = 'mb-4 font-medium font-mono text-eyebrow text-faded-text uppercase';
const columnLink =
	'inline-block text-[0.9375rem] text-subfaded-text transition-colors duration-300 ease-expo hover:text-accent';

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className='shell'>
			<div className='border-border border-t pt-14 pb-10'>
				<div className='grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-12'>
					<div className='lg:col-span-6'>
						<Link className='inline-flex items-center gap-2.5 text-text' to='/'>
							<LogoMark size={26} title={t('nav.home')} />
							<span className='font-medium text-[0.9375rem] tracking-tight'>{site.name}</span>
						</Link>

						<p className='mt-5 max-w-[34ch] text-[0.9375rem] text-faded-text leading-relaxed'>{t('footer.tagline')}</p>
					</div>

					<div className='lg:col-span-3'>
						<h2 className={columnTitle}>{t('footer.navLabel')}</h2>
						<ul className='flex flex-col gap-2.5'>
							<li>
								<Link className={columnLink} to='/'>
									{t('nav.home')}
								</Link>
							</li>
							<li>
								<Link className={columnLink} to='/work'>
									{t('nav.work')}
								</Link>
							</li>
							<li>
								<Link className={columnLink} to='/about'>
									{t('nav.about')}
								</Link>
							</li>
						</ul>
					</div>

					<div className='lg:col-span-3'>
						<h2 className={columnTitle}>{t('footer.contactLabel')}</h2>
						<ul className='flex flex-col gap-2.5'>
							<li>
								<a className={columnLink} href={`mailto:${site.email}`}>
									{site.email}
								</a>
							</li>

							{messagingChannels.map((channel) => {
								const ChannelIcon = channelIcon[channel.id];

								return (
									<li key={channel.id}>
										<Link className={`${columnLink} inline-flex items-center gap-2`} target='_blank' to={channel.href}>
											<ChannelIcon size={14} title={t(channel.labelKey)} />
											{t(channel.labelKey)}
										</Link>
									</li>
								);
							})}

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

				<div className='mt-14 flex flex-wrap items-center justify-between gap-4 border-border border-t pt-6 font-mono text-[0.75rem] text-faded-text'>
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
