import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const HomePage = () => {
	const { t } = useTranslation();

	return (
		<section className='flex flex-col justify-center px-6 max-md:mt-20 sm:h-[calc(100vh-400px)]'>
			<div className='mb-7 font-semibold text-4xl text-faded-text'>
				<Trans
					components={{
						hl: <span className='text-text' />,
						me: <Link className='link' to='about' />,
						barca: <Link className='link link__barca' target='_blank' to='https://www.barcamobile.com/' />,
						things: <Link className='link' to='projects' />
					}}
					i18nKey='home.intro'
					t={t}
				/>
			</div>

			<div className='font-semibold text-[21.6px] text-faded-text leading-[1.3]'>
				<Trans
					components={{
						ainterest: <Link className='link link__purple' target='_blank' to='https://ainterest.me/' />,
						js: <Link className='link link__yellow' target='_blank' to='https://javascriptweekly.com/issues' />
					}}
					i18nKey='home.latest'
					t={t}
				/>
			</div>
		</section>
	);
};
