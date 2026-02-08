import { Link } from 'react-router-dom';

export const HomePage = () => {
	return (
		<section className='flex flex-col justify-center px-6 max-md:mt-20 sm:h-[calc(100vh-400px)]'>
			<div className='mb-7 font-semibold text-4xl text-faded-text'>
				<span className='text-text'>Hello, I am </span>
				<Link className='link' to='about'>
					Lorenzo.
				</Link>
				<br />A software engineer and a tech enthusiast from Republic of Moldova. Currently working for{' '}
				<Link className='link link__orange' target='_blank' to='https://www.globallogic.com/ro/about/'>
					GlobalLogic
				</Link>
				. I like everything related to software and try to create{' '}
				<Link className='link' to='projects'>
					some stuff
				</Link>{' '}
				for the web.
			</div>

			<div className='font-semibold text-[21.6px] text-faded-text leading-[1.3]'>
				My latest project is{' '}
				<Link className='link link__purple' target='_blank' to='https://ainterest.live/'>
					AInterest
				</Link>
				, while you&apos;re here, you can check the latest{' '}
				<Link className='link link__yellow' target='_blank' to='https://javascriptweekly.com/issues'>
					JavaScript
				</Link>{' '}
				news.
			</div>
		</section>
	);
};
