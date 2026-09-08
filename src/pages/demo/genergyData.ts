/**
 * GENERGY's own published figures, transcribed from
 * https://genergy.md/ro/instalare-panouri-fotovoltaice/ and changed in no way.
 *
 * Nothing here is derived. There is no price per kW, no interpolation between
 * two rows, and no total for a power they don't list. The demo either points at
 * a published row or it says there isn't one, because the whole value of the
 * page is that every number on it is theirs.
 */

export interface StationRow {
	kw: number;
	panels: number;
	area: number;
	price: number;
}

/** Stații On-grid (fără acumulatori). Ten rows, 5 kW to 200 kW. */
export const onGridRows: StationRow[] = [
	{ kw: 5, panels: 10, area: 25, price: 3900 },
	{ kw: 6, panels: 12, area: 30, price: 4500 },
	{ kw: 8, panels: 15, area: 40, price: 5600 },
	{ kw: 10, panels: 19, area: 50, price: 6500 },
	{ kw: 12, panels: 23, area: 60, price: 7800 },
	{ kw: 15, panels: 28, area: 75, price: 9750 },
	{ kw: 20, panels: 38, area: 100, price: 13_000 },
	{ kw: 30, panels: 56, area: 150, price: 19_500 },
	{ kw: 100, panels: 186, area: 500, price: 45_000 },
	{ kw: 200, panels: 370, area: 1000, price: 80_000 }
];

/** Stații Hybrid (cu acumulator). Eight rows, and it stops at 30 kW. */
export const hybridRows: StationRow[] = [
	{ kw: 5, panels: 10, area: 25, price: 4400 },
	{ kw: 6, panels: 12, area: 30, price: 5100 },
	{ kw: 8, panels: 15, area: 40, price: 6400 },
	{ kw: 10, panels: 19, area: 50, price: 7500 },
	{ kw: 12, panels: 23, area: 60, price: 9000 },
	{ kw: 15, panels: 28, area: 75, price: 11_250 },
	{ kw: 20, panels: 38, area: 100, price: 15_000 },
	{ kw: 30, panels: 56, area: 150, price: 22_500 }
];

/** Their divisor, published under the tables: one kW of station makes 1200 kWh a year. */
export const KWH_PER_KW = 1200;

/**
 * `smallest` when the answer lands under the first published row, `gap` when it
 * lands in the hole their on-grid table leaves between 30 kW and 100 kW. Both
 * are stated on the page rather than smoothed over.
 */
type RowNote = 'smallest' | 'gap' | null;

export type Lookup =
	| { kind: 'station'; kwh: number; onGrid: StationRow; hybrid: StationRow | null; note: RowNote }
	| { kind: 'ceiling'; kwh: number };

/** Thin space between thousands, the way their price column is set. */
export const formatNumber = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/**
 * Their three steps, done for the visitor: read the annual consumption, divide
 * it by 1200, take the smallest published on-grid row that covers the result.
 *
 * Returns null for anything that isn't a positive number, so an empty or
 * half-typed field simply shows nothing instead of an error.
 */
export const lookupStation = (raw: string): Lookup | null => {
	const kwh = Number(raw.replace(/\s+/g, '').replace(',', '.'));

	if (!Number.isFinite(kwh) || kwh <= 0) return null;

	const needed = kwh / KWH_PER_KW;
	const onGrid = onGridRows.find((row) => row.kw >= needed);

	if (!onGrid) return { kind: 'ceiling', kwh };

	let note: RowNote = null;
	if (onGrid.kw === onGridRows[0].kw) note = 'smallest';
	else if (onGrid.kw === 100) note = 'gap';

	return {
		kind: 'station',
		kwh,
		onGrid,
		hybrid: hybridRows.find((row) => row.kw === onGrid.kw) ?? null,
		note
	};
};
