import { useTranslation } from 'react-i18next';
import { ButtonLink, Statement } from '../components';
import { usePointerSpotlight } from '../hooks';

export const ErrorPage = () => {
	const { t } = useTranslation();
	const { ref: spotlightRef, onPointerMove } = usePointerSpotlight<HTMLDivElement>();

	return (
		<section className='relative overflow-hidden' onPointerMove={onPointerMove}>
			<div aria-hidden='true' className='absolute inset-0' ref={spotlightRef}>
				<div className='edge-fade grid-backdrop absolute inset-0' />
				<div className='spotlight absolute inset-0' />
			</div>

			<div className='shell relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-20 sm:py-24'>
				<p className='font-medium font-mono text-accent text-eyebrow uppercase'>{t('error.code')}</p>

				<Statement as='h1' className='mt-8 max-w-[14ch] text-statement' immediate>
					{t('error.title')}
				</Statement>

				<p className='mt-8 max-w-prose text-faded-text text-lede'>{t('error.text')}</p>

				<div className='mt-10 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap'>
					<ButtonLink className='w-full sm:w-auto' magnetic to='/'>
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
