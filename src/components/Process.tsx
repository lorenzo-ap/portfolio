import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { processStepKeys } from '../data/capabilities';
import { ease, fadeUp, inView, stagger } from '../lib/motion';
import { Section, SectionHeader } from './Section';

export const Process = () => {
	const { t } = useTranslation();

	return (
		<Section id='process'>
			<SectionHeader eyebrow={t('process.eyebrow')} lede={t('process.lede')} title={t('process.title')} />

			<motion.ol
				className='mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4'
				initial={inView.initial}
				variants={stagger(0.09)}
				viewport={inView.viewport}
				whileInView={inView.whileInView}
			>
				{processStepKeys.map((key, index) => (
					<motion.li className='relative' key={key} variants={fadeUp}>
						<motion.span
							aria-hidden='true'
							className='block h-px origin-left bg-border-strong'
							transition={{ duration: 0.8, ease, delay: 0.1 + index * 0.09 }}
							variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
						/>

						<span className='mt-5 block font-medium font-mono text-[0.6875rem] text-accent tracking-[0.14em]'>
							{String(index + 1).padStart(2, '0')}
						</span>

						<h3 className='mt-4 font-semibold text-[1.0625rem] text-text tracking-tight'>
							{t(`process.steps.${key}.title`)}
						</h3>

						<p className='mt-3 text-[0.9375rem] text-faded-text leading-relaxed'>{t(`process.steps.${key}.body`)}</p>
					</motion.li>
				))}
			</motion.ol>
		</Section>
	);
};
