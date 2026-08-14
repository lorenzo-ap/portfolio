import { AboutTeaser, Capabilities, ContactCta, Hero, Process, SelectedWork } from '../components';

export const HomePage = () => (
	<>
		<Hero />
		<Capabilities />
		<SelectedWork />
		<Process />
		<AboutTeaser />
		{/* AboutTeaser's Section already supplies the top gap. */}
		<div className='pb-[var(--section-gap)]'>
			<ContactCta />
		</div>
	</>
);
