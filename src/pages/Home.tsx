import { Capabilities, ContactCta, Hero, Positioning, SelectedWork } from '../components';

/**
 * Proof first.
 *
 * The work sits directly under the hero, because four things somebody can go
 * and open is a stronger second impression than a list of what I could do for
 * them. Everything after it answers a question the work has already raised, and
 * anything that answers a question nobody has asked yet lives on /about.
 */
export const HomePage = () => (
	<>
		<Hero />
		<SelectedWork />
		<Capabilities />
		<Positioning />
		<ContactCta />
	</>
);
