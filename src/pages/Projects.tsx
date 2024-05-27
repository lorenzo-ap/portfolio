import Footer from '../components/Footer';
import Header from '../components/Header';
import useTheme from '../hooks/useTheme';

export default function Projects() {
    useTheme();

    return (
        <>
            <Header />

            <section className="flex flex-col gap-[14px] px-5 text-text">
                <h1 className="mt-[28px] mb-[14px] text-4xl font-semibold">Projects</h1>

                <p>
                    Here are some of the projects I’ve worked on in past as a maintainer, contributor or just for fun.
                </p>
            </section>

            <Footer />
        </>
    );
}
