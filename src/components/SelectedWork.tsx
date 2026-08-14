import { useTranslation } from 'react-i18next';
import { featuredCaseStudies } from '../data/projects';
import { ButtonLink } from './Button';
import { FeaturedCaseStudy } from './CaseStudy';
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

			<div className='mt-20 flex flex-col gap-24 lg:gap-32'>
				{featuredCaseStudies.map((caseStudy, index) => (
					<FeaturedCaseStudy caseStudy={caseStudy} index={index} key={caseStudy.key} />
				))}
			</div>
		</Section>
	);
};
