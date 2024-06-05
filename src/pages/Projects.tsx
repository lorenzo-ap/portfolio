import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useTheme from '../hooks/useTheme';
import Project from '../components/Project';
import { misc, projects } from '../data/projects';

export default function Projects() {
    useTheme();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />

            <section className="flex flex-col gap-[14px] px-5 text-text">
                <h1 className="mt-[28px] mb-[14px] text-4xl font-semibold">Projects</h1>

                <p>
                    Here are some of the projects I&#39;ve worked on in past as a maintainer, contributor or just for
                    fun.
                </p>

                {projects.map((project, index) => (
                    <Project key={index} {...project} index={index} />
                ))}
            </section>

            <section className="flex flex-col gap-[14px] px-5 text-text">
                <h2 className="mt-[42px] text-[21px] font-semibold">Misc & Experiments.</h2>

                <p>
                    This is a collection of small projects, experiments and interesting things I’ve worked on. Not
                    particularly useful, maintained or actively developed.
                </p>

                {misc.map((project, index) => (
                    <Project key={index} {...project} index={index} />
                ))}
            </section>

            <Footer />
        </motion.div>
    );
}
