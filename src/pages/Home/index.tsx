import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import useTheme from '../../hooks/useTheme';

const Home = () => {
  useTheme();

  return (
    <>
      <section className='flex flex-col justify-center sm:h-[calc(100vh-400px)] px-6 max-md:mt-20'>
        <div className='text-4xl text-faded-text mb-7 font-semibold'>
          <span className='text-text'>Hello, I am </span>
          <Link className='link' to='about'>
            Lorenzo.
          </Link>
          <br />A software engineer and a tech enthusiast from Republic of Moldova. Currently working for{' '}
          <Link className='link link__orange' to='https://www.globallogic.com/ro/about/' target='_blank'>
            GlobalLogic
          </Link>
          . I like everything related to software and try to create{' '}
          <Link className='link' to='projects'>
            some stuff
          </Link>{' '}
          for the web. Occasionally I travel and participate at coding events.
        </div>

        <div className='text-faded-text font-semibold text-[21.6px] leading-[1.3]'>
          My latest project is{' '}
          <Link className='link link__blue' to='https://ainterest.live/' target='_blank'>
            AInterest
          </Link>
          , while you&apos;re here, you can check the latest{' '}
          <Link className='link link__yellow' to='https://javascriptweekly.com/issues' target='_blank'>
            JavaScript
          </Link>{' '}
          news.
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
