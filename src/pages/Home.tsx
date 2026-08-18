import { Approach, Capabilities, ContactCta, Hero, SelectedWork, WorkTicker } from '../components';

/**
 * Proof first.
 *
 * The work sits directly under the hero, because four things somebody can go
 * and open is a stronger second impression than a list of what I could do for
 * them. Everything after it answers a question the work has already raised.
 */
export const HomePage = () => (
	<>
		<Hero />
		<SelectedWork />
		<WorkTicker />
		<Capabilities />
		<Approach />
		<ContactCta />
	</>
);
