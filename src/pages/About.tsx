export const AboutPage = () => {
	return (
		<section className='flex flex-col gap-[14px] px-6 text-text'>
			<h1 className='mt-[28px] mb-[14px] font-semibold text-4xl'>Well, hi again!</h1>

			<p>
				I am Lorenzo, a software engineer and Master&#39;s student at the University of Oradea, based in Oradea,
				Romania. I currently work as a Frontend Developer, helping companies design, build, and promote digital
				products.
			</p>

			<p>
				Alongside my professional role, I take on freelance work and personal projects, where I experiment with ideas
				and refine my approach to modern web development.
			</p>

			<p>
				My interests include web development, creative coding, and interactive design, with a strong focus on building
				fast, responsive interfaces and smooth user experiences.
			</p>

			<p>
				Throughout my career, I have mainly worked with frontend technologies. I prefer React and Next.js, which I use
				to build scalable, high-performance web applications.
			</p>

			<h2 className='mt-7 font-semibold text-[21px]'>Tech Stack.</h2>

			<p>In my day-to-day work, I&#39;m using a variety of technologies, including but not limited to the following:</p>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>Frontend</strong>: React, Next.js, Solid.js, Angular.
				</li>
				<li>
					<strong>Backend</strong>: Fastify, Express.
				</li>
			</ul>

			<h2 className='mt-7 font-semibold text-[21px]'>Tools I use.</h2>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>Editors</strong>: VSCode, Cursor, IntelliJ.
				</li>

				<li>
					<strong>Browsers</strong>: Chrome, Safari.
				</li>

				<li>
					<strong>Design</strong>: Figma, Adobe XD.
				</li>

				<li>
					<strong>Communication</strong>: Telegram, Slack, Discord.
				</li>
			</ul>
		</section>
	);
};
