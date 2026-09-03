import { useTranslation } from 'react-i18next';
import type { CaseStudyModel } from '../types';
import { ArrowIcon } from './icons';
import { RevealGroup, RevealItem } from './Reveal';

interface WorkIndexProps {
	caseStudies: CaseStudyModel[];
}

/**
 * The four projects as a list you can jump from, under the work page header.
 *
 * The header alone was a title and a paragraph with most of a screen of
 * nothing beneath them. This gives that space a job: the reader sees what's
 * on the page and how long it is before the first poster, and each row is an
 * anchor to its article, which the smooth-scroll layer picks up as a glide.
 */
export const WorkIndex = ({ caseStudies }: WorkIndexProps) => {
	const { t } = useTranslation();

	return (
		<nav aria-label={t('work.index.label')} className='mt-14 sm:mt-20 lg:mt-24'>
			<RevealGroup as='ol' delay={0.3} step={0.08}>
				{caseStudies.map((caseStudy, index) => (
					<RevealItem as='li' className='group row' key={caseStudy.key}>
						<a
							className='grid grid-cols-[1.75rem_1fr_auto] items-center gap-x-4 py-5 sm:grid-cols-12 sm:gap-x-8 sm:py-6'
							href={`#${caseStudy.key}`}
						>
							<span className='relative font-medium font-mono text-accent text-eyebrow sm:col-span-2'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<span className='row__shift relative flex min-w-0 flex-col gap-1 sm:col-span-7 sm:flex-row sm:items-baseline sm:gap-x-6'>
								<span className='font-medium text-text text-title'>{caseStudy.name}</span>
								<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
									{t(`work.kinds.${caseStudy.kind}`)}
								</span>
							</span>

							<span className='relative flex items-center justify-end gap-3 text-faded-text text-label transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-3'>
								<span className='hidden sm:inline'>{t('work.index.jump')}</span>
								<span aria-hidden='true' className='rotate-90'>
									<ArrowIcon />
								</span>
							</span>
						</a>
					</RevealItem>
				))}
			</RevealGroup>
		</nav>
	);
};
