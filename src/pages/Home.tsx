import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';

export default function Home() {
    useTheme();

    return (
        <>
            <section className="flex flex-col justify-center h-[605px] px-5">
                <div className="text-4xl text-faded-text mb-7 font-semibold">
                    <span className="text-text">Hello, I am </span>
                    <Link className="big-link" to="about">
                        Lorenzo.
                    </Link>
                    <br />a software engineer and a tech enthusiast from Republic of Moldova. Currently working for{' '}
                    <Link className="big-link big-link__orange" to="https://www.globallogic.com/" target="_blank">
                        GlobalLogic.
                    </Link>{' '}
                    I like to write about software and try to create{' '}
                    <Link className="big-link" to="projects">
                        some stuff.
                    </Link>{' '}
                    Occasionally I travel and participate at coding events.
                </div>

                <div className="text-faded-text font-semibold text-[21.6px] leading-[1.3]">
                    My latest work is{' '}
                    <Link
                        className="big-link big-link__blue"
                        to="https://github.com/lorenzo-ap/weather-app"
                        target="_blank">
                        Weather App using React + TS
                    </Link>{' '}
                    and while you&apos;re here, you can check the latest news in{' '}
                    <Link
                        className="big-link big-link__yellow"
                        to="https://javascriptweekly.com/issues"
                        target="_blank">
                        JavaScript.
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
