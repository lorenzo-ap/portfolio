import { useTranslation } from 'react-i18next';
import { capabilityKeys } from '../data/capabilities';
import { MarkerRow } from './MarkerRow';
import { RevealGroup } from './Reveal';
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

			<RevealGroup as='ul' className='mt-[var(--block-gap)]' step={0.06}>
				{capabilityKeys.map((key, index) => (
					<MarkerRow
						key={key}
						marker={String(index + 1).padStart(2, '0')}
						split
						title={t(`capabilities.items.${key}.title`)}
					>
						{t(`capabilities.items.${key}.body`)}
					</MarkerRow>
				))}
			</RevealGroup>
		</Section>
	);
};
