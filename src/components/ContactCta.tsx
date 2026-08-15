import { useTranslation } from 'react-i18next';
import { mailto, messagingChannels, site } from '../data/site';
import { usePointerSpotlight } from '../hooks';
import { ActionLink } from './ActionLink';
import { ButtonLink } from './Button';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

export const ContactCta = () => {
	const { t } = useTranslation();
	const { ref: spotlightRef, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

	return (
		<section className='shell' id='contact'>
			<div
				className='relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 sm:px-14 sm:py-20'
				onPointerMove={onPointerMove}
				ref={spotlightRef}
			>
				<div aria-hidden='true' className='absolute inset-0'>
					<div className='grid-backdrop mask-fade-y absolute inset-0' />
					<div className='spotlight absolute inset-0' />
				</div>

				<div className='relative grid gap-x-16 gap-y-10 lg:grid-cols-12'>
					<div className='lg:col-span-7'>
						<Reveal>
							<Eyebrow className='mb-6'>{t('contact.eyebrow')}</Eyebrow>
						</Reveal>

						<Reveal delay={0.06}>
							<h2 className='max-w-[14ch] text-balance font-semibold text-display-sm text-text'>
								{t('contact.title')}
							</h2>
						</Reveal>

						<Reveal delay={0.1}>
							<p className='mt-6 max-w-prose text-faded-text text-lede'>{t('contact.lede')}</p>
						</Reveal>

						<Reveal delay={0.16}>
							<div className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
								<ButtonLink className='w-full sm:w-auto' href={mailto()}>
									{t('actions.emailMe')}
								</ButtonLink>
								<ButtonLink
									className='w-full sm:w-auto'
									external
									href={site.linkedin}
									variant='ghost'
									withArrow={false}
								>
									{t('footer.linkedin')}
								</ButtonLink>
							</div>
						</Reveal>

						{messagingChannels.length > 0 && (
							<Reveal delay={0.22}>
								<div className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-3'>
									<span className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
										{t('contact.messagingLabel')}
									</span>

									{messagingChannels.map((channel) => (
										<ActionLink external href={channel.href} key={channel.id} label={t(channel.labelKey)} muted />
									))}
								</div>
							</Reveal>
						)}
					</div>

					<div className='flex flex-col justify-end gap-6 lg:col-span-5'>
						<Reveal delay={0.2}>
							<div className='flex flex-col gap-2'>
								<span className='font-medium font-mono text-[0.6875rem] text-faded-text uppercase tracking-[0.14em]'>
									{t('contact.emailLabel')}
								</span>
								<a className='link link__accent break-all text-[1.0625rem]' href={mailto()}>
									{site.email}
								</a>
							</div>
						</Reveal>

						<Reveal delay={0.28}>
							<p className='flex items-center gap-2.5 text-[0.875rem] text-faded-text'>
								<span className='relative flex h-1.5 w-1.5'>
									<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70' />
									<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-accent' />
								</span>
								{t('contact.availability')}
							</p>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
};
