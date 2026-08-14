import { useTranslation } from 'react-i18next';

export const AboutPage = () => {
	const { t } = useTranslation();

	return (
		<section className='flex flex-col gap-[14px] px-6 text-text'>
			<h1 className='mt-[28px] mb-[14px] font-semibold text-4xl'>{t('about.title')}</h1>

			<p>{t('about.intro')}</p>

			<p>{t('about.freelance')}</p>

			<p>{t('about.interests')}</p>

			<p>{t('about.career')}</p>

			<h2 className='mt-7 font-semibold text-[21px]'>{t('about.techStack.title')}</h2>

			<p>{t('about.techStack.intro')}</p>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>{t('about.techStack.frontend')}</strong>: React, Next.js, Solid.js, Angular.
				</li>
				<li>
					<strong>{t('about.techStack.backend')}</strong>: Fastify, Express.
				</li>
				<li>
					<strong>{t('about.techStack.agentic')}</strong>: Claude Code.
				</li>
			</ul>

			<h2 className='mt-7 font-semibold text-[21px]'>{t('about.tools.title')}</h2>

			<ul className='flex list-square flex-col gap-y-[14px] ps-[18px]'>
				<li>
					<strong>{t('about.tools.editors')}</strong>: VS Code, Cursor, IntelliJ.
				</li>

				<li>
					<strong>{t('about.tools.browsers')}</strong>: Chrome, Safari.
				</li>

				<li>
					<strong>{t('about.tools.design')}</strong>: Figma.
				</li>

				<li>
					<strong>{t('about.tools.communication')}</strong>: Telegram, Slack, Discord.
				</li>
			</ul>
		</section>
	);
};
