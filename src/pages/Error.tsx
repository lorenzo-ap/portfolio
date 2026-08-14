import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
	const { t } = useTranslation();

	return (
		<section className='flex flex-col items-start justify-center px-6 pt-12 sm:h-[calc(100vh-340px)] sm:pt-0'>
			<div className='mb-7 font-semibold text-4xl text-faded-text'>
				<Trans components={{ hl: <span className='text-text' /> }} i18nKey='error.text' t={t} />
			</div>

			<Link className='border-faded-line border-b border-solid hover:border-text hover:text-text' to='/'>
				{t('error.goHome')}
			</Link>
		</section>
	);
};
