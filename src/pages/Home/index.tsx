import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import useTheme from '../../hooks/useTheme';

const Home = () => {
  useTheme();

  return (
    <>
      <section className='flex flex-col justify-center sm:h-[calc(100vh-300px)] px-5 pt-12 sm:pt-0 mb-24 sm:mb-0'>
        <div className='text-4xl text-faded-text mb-7 font-semibold'>
          <span className='text-text'>Hello, I am </span>
          <Link className='link' to='about'>
            Lorenzo.
          </Link>
          <br />a software engineer and a tech enthusiast from Republic of Moldova. Currently working for{' '}
          <Link className='link link__orange' to='https://www.globallogic.com/ro/about/' target='_blank'>
            GlobalLogic Romania.
          </Link>{' '}
          I like to write about software and try to create{' '}
          <Link className='link' to='projects'>
            some stuff
          </Link>{' '}
          for the web. Occasionally I travel and participate at coding events.
        </div>

        <div className='text-faded-text font-semibold text-[21.6px] leading-[1.3]'>
          My latest projects are{' '}
          <Link className='link link__blue' to='https://lorenzo-ap.github.io/weather-app/' target='_blank'>
            Weather App
          </Link>{' '}
          and{' '}
          <Link className='link link__blue' to='https://image-generator-lorenzo.vercel.app/' target='_blank'>
            Image Generator*
          </Link>
          , also while you&apos;re still here, you can check the latest news in{' '}
          <Link className='link link__yellow' to='https://javascriptweekly.com/issues' target='_blank'>
            JavaScript
          </Link>
          .
        </div>

        <p className='text-sm mt-2'>* - in development, but still usable.</p>
      </section>

      <Footer />
    </>
  );
};

export default Home;
