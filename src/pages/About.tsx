export const AboutPage = () => {
	return (
		<section className='flex flex-col gap-[14px] px-6 text-text'>
			<h1 className='mt-[28px] mb-[14px] font-semibold text-4xl'>Well, hi again!</h1>

			<p>
				I&#39;m Lorenzo, a software engineer and student at the University of Oradea, based in Oradea, Romania.
				Currently, I work as a Frontend Developer, helping companies build and promote their products. In addition, I am
				also engaged in freelance and personal projects like this one.
			</p>

			<p>
				My field of interests is quite extensive, ranging from web development and creative coding to interactive
				design, and human-computer interaction.
			</p>

			<p>During my career, I&#39;ve mostly worked with Frontend tools, my favorite frameworks are Next.js & React.</p>

			<h2 className='mt-7 font-semibold text-[21px]'>Tech Stack.</h2>

			<p>In my day-to-day work, I&#39;m using a variety of technologies, including but not limited to the following:</p>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>Frontend</strong>: Next.js, React, Solid.js, Angular.
				</li>
				<li>
					<strong>Backend</strong>: Express.
				</li>
			</ul>

			<h2 className='mt-7 font-semibold text-[21px]'>Tools I use.</h2>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>Editors</strong>: VSCode, IntelliJ.
				</li>

				<li>
					<strong>Browsers</strong>: Chrome, Safari.
				</li>

				<li>
					<strong>Terminal</strong>: Git Bash, CMD, Powershell.
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
