import { useTranslation } from 'react-i18next';
import { CaseStudyArticle, ContactCta, PageHeader } from '../components';
import { caseStudies } from '../data/projects';

export const WorkPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader eyebrow={t('work.eyebrow')} lede={t('work.pageLede')} title={t('work.pageTitle')} />

			<div className='shell flex flex-col gap-16 pb-[var(--section-gap)] sm:gap-24 lg:gap-32'>
				{caseStudies.map((caseStudy, index) => (
					<CaseStudyArticle caseStudy={caseStudy} index={index} key={caseStudy.key} />
				))}
			</div>

			<ContactCta />
		</>
	);
};
