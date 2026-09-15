import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buildGroups } from '../data/projects';
import type { BuildGroupModel } from '../types';
import { ArrowUpRightIcon } from './icons';
import { Reveal, RevealGroup, RevealItem } from './Reveal';
import { Section, SectionHeader } from './Section';

/**
 * The five builds, as two topics rather than five entries.
 *
 * Five separate things under one heading is a list nobody finishes. Grouped by
 * what they are, the reader takes in two ideas and can go deeper on either, and
 * the pairing is the point on its own: the same invented restaurant group seen
 * from the dining room and from the office.
 *
 * This only runs on /work. The home page used to carry a names-only version of
 * it directly under the case studies, which meant ten things to open before the
 * page had made its case.
 */

/** Label over title, with the supporting line in the second column. */
const GroupHeading = ({ group }: { group: BuildGroupModel }) => {
	const { t } = useTranslation();

	return (
		<div className='grid gap-x-16 gap-y-4 lg:grid-cols-12'>
			<div className='lg:col-span-5'>
				<p className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
					{t(`builds.groups.${group.key}.label`)}
				</p>
				<h3 className='mt-5 max-w-[24ch] font-medium text-text text-title'>{t(`builds.groups.${group.key}.title`)}</h3>
			</div>

			<div className='lg:col-span-6 lg:col-start-7 lg:self-end'>
				<p className='max-w-prose text-body-sm text-faded-text'>{t(`builds.groups.${group.key}.lede`)}</p>
			</div>
		</div>
	);
};

/**
 * One group on the work page: the heading, then a row per build.
 *
 * The row is the site's list row rather than a poster, because these aren't
 * case studies and dressing them as case studies would say they are. The whole
 * row is the link, so the name, the sentence and the arrow are one target.
 */
const BuildGroup = ({ group }: { group: BuildGroupModel }) => {
	const { t } = useTranslation();

	return (
		<div>
			<Reveal>
				<GroupHeading group={group} />
			</Reveal>

			<RevealGroup as='ul' className='mt-9 sm:mt-12' delay={0.1} step={0.07}>
				{group.builds.map((build) => (
					<RevealItem as='li' className='group row' key={build.key}>
						<Link
							className='grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-3 py-6 sm:grid-cols-12 sm:gap-x-8 sm:py-8 lg:gap-x-12'
							target='_blank'
							to={build.link}
						>
							<span className='row__shift relative flex min-w-0 flex-col gap-1.5 sm:col-span-4'>
								<span className='font-medium text-text text-title'>{build.name}</span>
								<span className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
									{t(`builds.items.${build.key}.tag`)}
								</span>
							</span>

							<span className='relative flex items-center justify-end gap-3 text-faded-text text-label transition-colors duration-500 ease-expo group-hover:text-accent sm:col-span-2 sm:col-start-11 sm:pt-1'>
								<span className='hidden sm:inline'>{t('builds.open')}</span>
								<span aria-hidden='true'>
									<ArrowUpRightIcon />
								</span>
							</span>

							<span className='relative col-span-2 max-w-prose text-body-sm text-faded-text sm:col-span-6 sm:col-start-5 sm:row-start-1'>
								{t(`builds.items.${build.key}.body`)}
							</span>
						</Link>
					</RevealItem>
				))}
			</RevealGroup>
		</div>
	);
};

/** The work page version: every build with the sentence that explains it. */
export const BuildCollection = () => {
	const { t } = useTranslation();

	return (
		<Section id='builds'>
			<SectionHeader eyebrow={t('builds.eyebrow')} lede={t('builds.lede')} title={t('builds.title')} />

			<div className='mt-[var(--block-gap)] flex flex-col gap-14 sm:gap-20 lg:gap-24'>
				{buildGroups.map((group) => (
					<BuildGroup group={group} key={group.key} />
				))}
			</div>
		</Section>
	);
};
