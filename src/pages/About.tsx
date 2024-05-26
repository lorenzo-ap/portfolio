import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';

export default function About() {
    useTheme();

    return (
        <>
            <div className="flex flex-col gap-[14px] px-5 text-text">
                <h1 className="mt-[28px] mb-[14px] text-4xl font-semibold">Well, hi again!</h1>

                <p className="text-[18px]">
                    I’m Lorenzo, a software engineer, educator and speaker based in Oradea, Romania. I’m currently
                    working as an independent engineer, helping companies build and promote their products. In the
                    meantime, I’m also developing Proxima Analytics - an open source, privacy-first analytics platform.
                </p>

                <p className="text-[18px]">
                    My field of interests is quite extensive, ranging from web development and creative coding to IoT
                    applications, interactive design, and human-computer interaction.
                </p>

                <p className="text-[18px]">
                    During my career, I’ve worked with a variety of technologies, from frontend to backend, from mobile
                    to desktop. Recently, I’ve been focusing on exploring how modern web technologies can get combined
                    with the different mediums of art, electronics and various forms of communication. You may find some
                    pieces of generative art I’ve created on the Art section.
                </p>
            </div>

            <Footer />
        </>
    );
}
