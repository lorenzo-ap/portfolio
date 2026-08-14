import { useTranslation } from 'react-i18next';
import { ArchiveList, CaseStudyArticle, ContactCta, Eyebrow, PageHeader, Reveal } from '../components';
import { caseStudies } from '../data/projects';

export const WorkPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader eyebrow={t('work.eyebrow')} lede={t('work.pageLede')} title={t('work.pageTitle')} />

			<div className='shell flex flex-col gap-24 pb-24 lg:gap-32'>
				{caseStudies.map((caseStudy, index) => (
					<CaseStudyArticle caseStudy={caseStudy} index={index} key={caseStudy.key} />
				))}
			</div>

			<section className='shell pt-8 pb-[var(--section-gap)]'>
				<Reveal>
					<Eyebrow className='mb-7'>{t('work.archive.eyebrow')}</Eyebrow>
				</Reveal>

				<div className='grid gap-x-16 gap-y-6 lg:grid-cols-12'>
					<Reveal className='lg:col-span-7' delay={0.05}>
						<h2 className='max-w-[16ch] text-balance font-semibold text-headline text-text'>
							{t('work.archive.title')}
						</h2>
					</Reveal>
					<Reveal className='flex flex-col justify-end lg:col-span-5' delay={0.1}>
						<p className='max-w-prose text-[1.0625rem] text-faded-text leading-[1.65]'>{t('work.archive.lede')}</p>
					</Reveal>
				</div>

				<ArchiveList />
			</section>

			<div className='pb-[var(--section-gap)]'>
				<ContactCta />
			</div>
		</>
	);
};
