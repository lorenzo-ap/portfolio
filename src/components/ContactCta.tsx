import { useTranslation } from 'react-i18next';
import { mailto, messagingChannels, site } from '../data/site';
import { usePointerSpotlight } from '../hooks';
import { ActionLink } from './ActionLink';
import { ButtonLink } from './Button';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { Statement } from './Statement';

/**
 * The close.
 *
 * Used to be a rounded panel floating inside the page. It's the last thing on
 * every route, so it now runs the full width and takes the grid backdrop with
 * it: the page opens on that texture in the hero and closes on it here, and
 * nothing in between needs decorating.
 */
export const ContactCta = () => {
	const { t } = useTranslation();
	const { ref: spotlightRef, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

	return (
		<section
			className='relative overflow-hidden border-border border-y bg-surface'
			id='contact'
			onPointerMove={onPointerMove}
		>
			{/* No edge fade here. The band has hard rules top and bottom, so the grid
			    running all the way into them is the point rather than a mistake. */}
			<div aria-hidden='true' className='absolute inset-0' ref={spotlightRef}>
				<div className='grid-backdrop absolute inset-0' />
				<div className='spotlight absolute inset-0' />
			</div>

			<div className='shell relative grid gap-x-16 gap-y-14 py-[var(--section-gap)] lg:grid-cols-12'>
				<div className='lg:col-span-7'>
					<Reveal>
						<Eyebrow className='mb-8'>{t('contact.eyebrow')}</Eyebrow>
					</Reveal>

					<Statement className='max-w-[13ch] text-statement' delay={0.06}>
						{t('contact.title')}
					</Statement>

					<Reveal delay={0.18}>
						<p className='mt-8 max-w-prose text-faded-text text-lede'>{t('contact.lede')}</p>
					</Reveal>

					<Reveal delay={0.24}>
						<div className='mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
							<ButtonLink className='w-full sm:w-auto' href={mailto()} magnetic>
								{t('actions.emailMe')}
							</ButtonLink>
							<ButtonLink className='w-full sm:w-auto' external href={site.linkedin} variant='ghost' withArrow={false}>
								{t('footer.linkedin')}
							</ButtonLink>
						</div>
					</Reveal>
				</div>

				<div className='flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9'>
					<Reveal delay={0.2}>
						<div className='flex flex-col gap-2.5 border-border border-t pt-6'>
							<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
								{t('contact.emailLabel')}
							</span>
							<a className='link link__accent break-all font-medium text-title' href={mailto()}>
								{site.email}
							</a>
						</div>
					</Reveal>

					{messagingChannels.length > 0 && (
						<Reveal delay={0.26}>
							<div className='flex flex-col gap-3 border-border border-t pt-6'>
								<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
									{t('contact.messagingLabel')}
								</span>
								<div className='flex flex-wrap items-center gap-x-8 gap-y-3'>
									{messagingChannels.map((channel) => (
										<ActionLink external href={channel.href} key={channel.id} label={t(channel.labelKey)} muted />
									))}
								</div>
							</div>
						</Reveal>
					)}

					<Reveal delay={0.32}>
						<p className='flex items-center gap-2.5 border-border border-t pt-6 text-body-sm text-faded-text'>
							<span aria-hidden='true' className='pulse' />
							{t('contact.availability')}
						</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
};
