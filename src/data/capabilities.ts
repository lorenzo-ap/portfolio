import type { CapabilityKey, ProcessStepKey } from '../types';

/**
 * Framed as outcomes a business can buy, not as a technology list.
 * Every item is backed by work that exists on the work page.
 */
export const capabilityKeys: CapabilityKey[] = [
	'productsFromScratch',
	'internalTools',
	'automation',
	'integrations',
	'aiWorkflows',
	'modernisation'
];

export const processStepKeys: ProcessStepKey[] = ['understand', 'scope', 'build', 'handOver'];
