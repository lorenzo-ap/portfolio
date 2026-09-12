import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buildGroups } from '../data/projects';
import type { BuildGroupModel } from '../types';
import { ActionLink } from './ActionLink';
import { ArrowUpRightIcon } from './icons';
import { Reveal, RevealGroup, RevealItem } from './Reveal';
import { Section, SectionHeader } from './Section';

/**
 * The five builds, as two topics rather than five entries.
 *
 * Nine separate things under one heading is a list nobody finishes. Grouped by
 * what they are, the reader takes in two ideas and can go deeper on either, and
 * the pairing is the point on its own: the same invented restaurant group seen
 * from the dining room and from the office.
 */

/** Label over title over supporting line. Shared by both treatments. */
const GroupHeading = ({ group, stacked = false }: { group: BuildGroupModel; stacked?: boolean }) => {
	const { t } = useTranslation();
	const label = (
		<p className='font-medium font-mono text-eyebrow text-faded-text uppercase'>
			{t(`builds.groups.${group.key}.label`)}
		</p>
	);
	const title = (
		<h3 className='mt-5 max-w-[24ch] font-medium text-text text-title'>{t(`builds.groups.${group.key}.title`)}</h3>
	);
	const lede = <p className='max-w-prose text-body-sm text-faded-text'>{t(`builds.groups.${group.key}.lede`)}</p>;

	if (stacked) {
		return (
			<div>
				{label}
				{title}
				<div className='mt-4'>{lede}</div>
			</div>
		);
	}

	return (
		<div className='grid gap-x-16 gap-y-4 lg:grid-cols-12'>
			<div className='lg:col-span-5'>
				{label}
				{title}
			</div>

			<div className='lg:col-span-6 lg:col-start-7 lg:self-end'>{lede}</div>
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

/**
 * The home page version: both topics side by side, names only.
 *
 * The home page already spends a whole pinned stage on four case studies, so
 * this one stays at two blocks. A visitor reads what the two groups are and
 * opens whichever name they recognise; the sentence explaining each build waits
 * on /work for somebody who wants it.
 */
export const Builds = () => {
	const { t } = useTranslation();

	return (
		<Section id='builds'>
			<SectionHeader eyebrow={t('builds.eyebrow')} lede={t('builds.lede')} title={t('builds.title')} />

			<div className='mt-[var(--block-gap)] grid gap-x-16 gap-y-12 lg:grid-cols-2'>
				{buildGroups.map((group, index) => (
					<Reveal delay={index * 0.1} key={group.key}>
						<div className='border-border border-t pt-7 sm:pt-9'>
							<GroupHeading group={group} stacked />

							{/*
							 * The same treatment every other external project link on the
							 * site gets, so the arrow says these open somewhere else before
							 * anybody has to hover to find out.
							 */}
							<ul className='mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 sm:mt-9'>
								{group.builds.map((build) => (
									<li key={build.key}>
										<ActionLink external href={build.link} label={build.name} />
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
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
