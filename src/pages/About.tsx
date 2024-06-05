import Footer from '../components/Footer';
import Header from '../components/Header';
import useTheme from '../hooks/useTheme';
import { motion } from 'framer-motion';

export default function About() {
    useTheme();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />

            <section className="flex flex-col gap-[14px] px-5 text-text">
                <h1 className="mt-[28px] mb-[14px] text-4xl font-semibold">Well, hi again!</h1>

                <p className="text-[18px]">
                    I&#39;m Lorenzo, a software engineer, educator and speaker based in Oradea, Romania. I&#39;m
                    currently working as a Frontend Developer, helping companies build and promote their products. In
                    the meantime, I&#39;m also doing some freelance and personal projects like this one.
                </p>

                <p className="text-[18px]">
                    My field of interests is quite extensive, ranging from web development and creative coding to IoT
                    applications, interactive design, and human-computer interaction.
                </p>

                <p className="text-[18px]">
                    During my career, I&#39;ve mostly worked with Frontend tools, my favorite frameworks are React &
                    Angular.
                </p>

                <h2 className="mt-7 text-[21px] font-semibold">Tech Stack.</h2>

                <p>
                    In my day-to-day work, I&#39;m using a variety of technologies, including but not limited to the
                    following:
                </p>

                <ul className="flex flex-col gap-y-[14px] ps-[18px] list-square">
                    <li>
                        <strong>Frontend</strong>: Angular, React, TypeScript, SCSS, TailwindCSS, Bootstrap.
                    </li>
                    <li>
                        <strong>Backend</strong>: Node.js.
                    </li>
                </ul>

                <h3 className="mt-7 text-[21px] font-semibold">Tools I use.</h3>

                <ul className="flex flex-col gap-y-[14px] ps-[18px] list-square">
                    <li>
                        <strong>Editors</strong>: VSCode, IntelliJ.
                    </li>
                    <li>
                        <strong>Browsers</strong>: Chrome, Safari.
                    </li>
                    <li>
                        <strong>Terminal</strong>: Git Bash, CMD.
                    </li>
                    <li>
                        <strong>Design</strong>: Figma.
                    </li>
                    <li>
                        <strong>Communication</strong>: Telegram, Discord.
                    </li>
                </ul>
            </section>

            <Footer />
        </motion.div>
    );
}
