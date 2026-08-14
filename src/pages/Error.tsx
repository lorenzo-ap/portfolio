import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components';
import { usePointerSpotlight } from '../hooks';

export const ErrorPage = () => {
	const { t } = useTranslation();
	const { ref: spotlightRef, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

	return (
		<section className='relative overflow-hidden' onPointerMove={onPointerMove}>
			<div aria-hidden='true' className='absolute inset-0' ref={spotlightRef}>
				<div className='grid-backdrop mask-fade-y absolute inset-0' />
				<div className='spotlight absolute inset-0' />
			</div>

			<div className='shell relative flex min-h-[calc(100svh-68px)] flex-col justify-center py-24'>
				<p className='font-medium font-mono text-[0.6875rem] text-accent uppercase tracking-[0.2em]'>
					{t('error.code')}
				</p>

				<h1 className='mt-6 max-w-[14ch] text-balance font-semibold text-display-sm text-text'>{t('error.title')}</h1>

				<p className='mt-6 max-w-prose text-faded-text text-lede'>{t('error.text')}</p>

				<div className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
					<ButtonLink className='w-full sm:w-auto' to='/'>
						{t('error.goHome')}
					</ButtonLink>
					<ButtonLink className='w-full sm:w-auto' to='/work' variant='ghost' withArrow={false}>
						{t('actions.allWork')}
					</ButtonLink>
				</div>
			</div>
		</section>
	);
};
