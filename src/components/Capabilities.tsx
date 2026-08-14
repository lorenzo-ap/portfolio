import { useTranslation } from 'react-i18next';
import { capabilityKeys } from '../data/capabilities';
import { RevealGroup, RevealItem } from './Reveal';
import { Section, SectionHeader } from './Section';

export const Capabilities = () => {
	const { t } = useTranslation();

	return (
		<Section id='capabilities'>
			<SectionHeader
				eyebrow={t('capabilities.eyebrow')}
				lede={t('capabilities.lede')}
				title={t('capabilities.title')}
			/>

			<RevealGroup
				className='mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3'
				step={0.05}
			>
				{capabilityKeys.map((key, index) => (
					<RevealItem
						className='group relative bg-bg-color p-8 transition-colors duration-500 ease-expo hover:bg-accent-soft'
						key={key}
					>
						<span className='font-medium font-mono text-[0.6875rem] text-faded-text transition-colors duration-500 ease-expo group-hover:text-accent'>
							{String(index + 1).padStart(2, '0')}
						</span>

						<h3 className='mt-5 font-semibold text-[1.125rem] text-text tracking-tight'>
							{t(`capabilities.items.${key}.title`)}
						</h3>

						<p className='mt-3 text-[0.9375rem] text-faded-text leading-relaxed'>
							{t(`capabilities.items.${key}.body`)}
						</p>
					</RevealItem>
				))}
			</RevealGroup>
		</Section>
	);
};
