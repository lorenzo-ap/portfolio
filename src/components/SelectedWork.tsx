import { useTranslation } from 'react-i18next';
import { productCaseStudies, teachingCaseStudy } from '../data/projects';
import { ButtonLink } from './Button';
import { FeaturedCaseStudy, FeaturedTeaching } from './CaseStudy';
import { Reveal } from './Reveal';
import { Section, SectionHeader } from './Section';

export const SelectedWork = () => {
	const { t } = useTranslation();

	return (
		<Section id='work'>
			<SectionHeader
				aside={
					<Reveal delay={0.18}>
						<ButtonLink to='/work' variant='ghost'>
							{t('actions.allWork')}
						</ButtonLink>
					</Reveal>
				}
				eyebrow={t('work.eyebrow')}
				lede={t('work.lede')}
				title={t('work.title')}
			/>

			<div className='mt-20 flex flex-col gap-24 lg:mt-24 lg:gap-32'>
				{productCaseStudies.map((caseStudy, index) => (
					<FeaturedCaseStudy caseStudy={caseStudy} index={index} key={caseStudy.key} />
				))}

				{/* Same weight, different shape: the visitor should read it as a different kind of work. */}
				<FeaturedTeaching caseStudy={teachingCaseStudy} index={productCaseStudies.length} />
			</div>
		</Section>
	);
};
