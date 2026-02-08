import { Link } from 'react-router-dom';

export const ErrorPage = () => {
	return (
		<section className='flex flex-col items-start justify-center px-6 pt-12 sm:h-[calc(100vh-340px)] sm:pt-0'>
			<div className='mb-7 font-semibold text-4xl text-faded-text'>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
				<span className='text-text'>The void is calling.</span> Contrary to popular belief, Lorem Ipsum is not simply
				random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
			</div>

			<Link
				className='border-faded-line border-b border-solid transition-colors duration-150 hover:border-text hover:text-text'
				to='/'
			>
				Go back home
			</Link>
		</section>
	);
};
