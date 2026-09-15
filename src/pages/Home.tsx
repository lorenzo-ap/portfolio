import { Capabilities, ContactCta, Hero, Positioning, SelectedWork } from '../components';

/**
 * Proof first.
 *
 * The work sits directly under the hero, because five things somebody can go
 * and open is a stronger second impression than a list of what I could do for
 * them. Everything after it answers a question the work has already raised, and
 * anything that answers a question nobody has asked yet lives on /about.
 *
 * The five self-directed builds used to sit between the work and the
 * capabilities. Ten things to open before the page has said what it can do for
 * you is a portfolio, not a pitch, so they live on /work and the home page
 * carries one set of five.
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
