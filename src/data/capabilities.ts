import type { CapabilityKey, ProcessStepKey } from '../types';

/**
 * Situations a business recognises itself in, not a technology list.
 * Each one is a problem someone can arrive with, phrased the way they'd phrase it.
 */
export const capabilityKeys: CapabilityKey[] = [
	'manualWork',
	'customTool',
	'ideaToProduct',
	'systemsTalking',
	'aiWhereItPays',
	'outgrown'
];

export const processStepKeys: ProcessStepKey[] = ['understand', 'scope', 'build', 'handOver'];
