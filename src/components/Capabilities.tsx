import { useTranslation } from 'react-i18next';
import { capabilityKeys } from '../data/capabilities';
import { RevealGroup, RevealItem } from './Reveal';
import { Section, SectionHeader } from './Section';

/**
 * Six problems people arrive with.
 *
 * These used to be six cards, which meant six boxes of equal weight and a wall
 * of body copy. As a hairline list the titles carry it: a visitor scans six
 * lines, recognises their own situation in one of them, and only then reads the
 * paragraph next to it. Pointing at a row draws an accent rule across its top
 * edge and leans the whole line into it, so the list responds without moving
 * anything a reader is trying to read.
 */
export const Capabilities = () => {
	const { t } = useTranslation();

	return (
		<Section id='capabilities'>
			<SectionHeader
				eyebrow={t('capabilities.eyebrow')}
				lede={t('capabilities.lede')}
				title={t('capabilities.title')}
			/>

			<RevealGroup as='ul' className='mt-20 lg:mt-28' step={0.06}>
				{capabilityKeys.map((key, index) => (
					<RevealItem as='li' key={key}>
						<div className='group row grid gap-x-12 gap-y-3 py-8 last:border-b last:border-b-border lg:grid-cols-12 lg:py-11'>
							<span className='relative font-medium font-mono text-eyebrow text-faded-text uppercase transition-colors duration-500 ease-expo group-hover:text-accent lg:col-span-1'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<h3 className='row__shift relative font-medium text-text text-title lg:col-span-5'>
								{t(`capabilities.items.${key}.title`)}
							</h3>

							<p className='relative max-w-prose text-body-sm text-faded-text lg:col-span-5 lg:col-start-8'>
								{t(`capabilities.items.${key}.body`)}
							</p>
						</div>
					</RevealItem>
				))}
			</RevealGroup>
		</Section>
	);
};
