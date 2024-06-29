import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';
import { motion } from 'framer-motion';

export default function NoPage() {
    useTheme();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="px-5">
                <div className="text-4xl text-faded-text mb-7 font-semibold">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                    <span className="text-text">The void is calling.</span> Contrary to popular belief, Lorem Ipsum is
                    not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it
                    over 2000 years old.
                </div>

                <Link
                    className="border-b border-solid border-faded-line hover:text-text hover:border-text transition-colors duration-150"
                    to="/">
                    Go back home
                </Link>
            </section>

            <Footer />
        </motion.div>
    );
}
