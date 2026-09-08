import { motion } from 'framer-motion';
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from 'react';
import { Eyebrow, Reveal } from '../../components';
import { duration, ease } from '../../lib/motion';
import { formatNumber, KWH_PER_KW, type Lookup, lookupStation, type StationRow } from './genergyData';

/**
 * A mockup built for one reader: the administrator of genergy.md, who publishes
 * two full price tables and, directly under them, a box telling the visitor to
 * divide his annual consumption by 1200 and work out his own kW. The arithmetic
 * is already on his page. This page does it.
 *
 * Three things make it different from the rest of the site, all deliberate:
 *
 * 1. **The copy is Romanian and doesn't go through i18next.** One reader, one
 *    language. The header's EN/RO/RU switcher moves the chrome around it and
 *    leaves the block alone, which is correct: the block is his page, not mine.
 * 2. **The colours are literal, not tokens.** Their table is an amber band over
 *    white rows, and it has to stay that in both of my themes, so he recognises
 *    it in one second. Pinning the values keeps their palette out of the design
 *    system, where there is exactly one accent and it is cobalt.
 * 3. **It is noindex, and `public/robots.txt` disallows `/demo/`.** The page
 *    reproduces their prices under my domain. An indexed copy competing with
 *    their own page would lose the client the moment the demo worked.
 */

const TITLE = 'Ce stație vă trebuie? | Machetă GENERGY';
const DESCRIPTION = 'Machetă pornind de la tabelul publicat pe pagina de instalare GENERGY.';

/**
 * Same job as `useSeo`, written out here because this route has no translated
 * title and never gets one. The robots tag is removed on the way out, since the
 * rest of the site is meant to be indexed.
 */
const useDemoSeo = () => {
	useEffect(() => {
		document.title = TITLE;
		document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', DESCRIPTION);

		const robots = document.createElement('meta');
		robots.name = 'robots';
		robots.content = 'noindex, nofollow';
		document.head.appendChild(robots);

		return () => robots.remove();
	}, []);
};

/** Their column headers, unchanged. */
const columns = ['Puterea stației', 'Nr. de panouri', 'Suprafața stației', 'Preț'];

const headCell = 'px-2 py-2.5 text-left align-bottom font-semibold text-[0.625rem] uppercase tracking-[0.06em] sm:px-3';
const bodyCell = 'whitespace-nowrap px-2 py-3.5 align-middle text-[0.875rem] sm:px-3 sm:text-[0.9375rem]';

interface ResultTableProps {
	caption: string;
	row: StationRow | null;
	notes?: string[];
}

const ResultTable = ({ caption, row, notes }: ResultTableProps) => (
	<figure className='m-0'>
		<figcaption className='mb-2.5 font-semibold text-[#1d1d1f] text-[0.9375rem]'>{caption}</figcaption>

		<div className='overflow-x-auto rounded-lg border border-[#e4e1dc]'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-[#d3893c] text-white'>
						{columns.map((column) => (
							<th className={headCell} key={column} scope='col'>
								{column}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{row ? (
						<tr className='bg-white text-[#1d1d1f]'>
							<td className={bodyCell}>{row.kw} kW</td>
							<td className={bodyCell}>{row.panels}</td>
							<td className={bodyCell}>{row.area} m²</td>
							<td className={`${bodyCell} font-semibold`}>{formatNumber(row.price)} €</td>
						</tr>
					) : (
						<tr className='bg-white'>
							<td className={`${bodyCell} text-[#6b675f]`} colSpan={columns.length}>
								nu este în tabel
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>

		{notes?.map((note) => (
			<p className='mt-2 text-[#6b675f] text-[0.8125rem] leading-relaxed' key={note}>
				{note}
			</p>
		))}
	</figure>
);

/** Their own conditions, verbatim. Their prices without them would misrepresent them. */
const caveats = [
	'Instalarea panourilor fotovoltaice prețuri de referință. Vă vom oferi un calcul individual, ținând cont de necesitățile dvs. și de complexitatea proiectului.',
	'* Prețurile nu includ costuri suplimentare.',
	'** Modificarea rețelei externe – cost separat – 500 €.'
];

const hybridNotes = [
	'Prețul este al stației. Costul acumulatorului este separat – 1 200 € / 5 kW, unitate de comunicație (BMS) – 300 € / 25 kW.'
];

const fieldLabel = 'block font-medium text-[#4a463f] text-[0.8125rem]';
const filledField =
	'mt-1.5 w-full rounded-[6px] border border-[#e8c99f] bg-[#fdf4e9] px-3 py-2.5 font-semibold text-[#1d1d1f] text-[0.9375rem]';
const emptyField =
	'mt-1.5 w-full rounded-[6px] border border-[#ded9d1] bg-white px-3 py-2.5 text-[#1d1d1f] text-[0.9375rem] outline-none placeholder:text-[#a09a90] focus-visible:border-[#d3893c]';

/**
 * The second half of the point: the estimate request leaves with his figures in
 * it instead of empty. Shown filled and inert. It posts nowhere, not to their
 * endpoint and not to mine, and the line under the button says so.
 */
const QuoteRequest = ({ result }: { result: Lookup }) => {
	const id = useId();
	const station = result.kind === 'station' ? result.onGrid : null;

	return (
		<div className='mt-8 border-[#e4e1dc] border-t pt-7'>
			<h3 className='font-semibold text-[#1d1d1f] text-[1.0625rem]'>Solicitare de preț</h3>

			<div className='mt-5 grid gap-4 sm:grid-cols-2'>
				<div>
					<label className={fieldLabel} htmlFor={`${id}-kwh`}>
						Consum anual
					</label>
					<input className={filledField} id={`${id}-kwh`} readOnly value={`${formatNumber(result.kwh)} kWh`} />
				</div>

				<div>
					<label className={fieldLabel} htmlFor={`${id}-power`}>
						Puterea stației
					</label>
					<input
						className={filledField}
						id={`${id}-power`}
						readOnly
						value={station ? `${station.kw} kW` : 'peste 200 kW'}
					/>
				</div>

				<div>
					<label className={fieldLabel} htmlFor={`${id}-price`}>
						Preț din tabel
					</label>
					<input
						className={filledField}
						id={`${id}-price`}
						readOnly
						value={station ? `${formatNumber(station.price)} €` : 'nu este în tabel'}
					/>
				</div>

				<div>
					<label className={fieldLabel} htmlFor={`${id}-phone`}>
						Telefon
					</label>
					<input
						className={emptyField}
						id={`${id}-phone`}
						inputMode='tel'
						placeholder='Numărul dumneavoastră'
						type='tel'
					/>
				</div>
			</div>

			<button
				className='mt-5 w-full rounded-[6px] bg-[#d3893c] px-5 py-3 font-medium text-[0.9375rem] text-white sm:w-auto'
				type='button'
			>
				Solicită estimare de preț
			</button>

			<p className='mt-3 text-[#6b675f] text-[0.8125rem]'>În machetă butonul nu trimite nimic.</p>
		</div>
	);
};

const StationResult = ({ result }: { result: Extract<Lookup, { kind: 'station' }> }) => (
	<>
		<p className='font-serif text-[#1d1d1f] text-title'>
			Pentru {formatNumber(result.kwh)} kWh pe an vă trebuie o stație de {result.onGrid.kw} kW.
		</p>

		{result.note === 'smallest' && (
			<p className='mt-2.5 text-[#4a463f] text-[0.9375rem]'>
				Este cea mai mică stație din tabelul publicat. Consumul dumneavoastră intră sub ea.
			</p>
		)}

		{result.note === 'gap' && (
			<p className='mt-2.5 text-[#4a463f] text-[0.9375rem]'>
				Tabelul nu are niciun rând între 30 kW și 100 kW, așa că vi se arată 100 kW.
			</p>
		)}

		<div className='mt-6 flex flex-col gap-6'>
			<ResultTable caption='Stații On-grid (fără acumulatori)' row={result.onGrid} />
			<ResultTable
				caption='Stații Hybrid (cu acumulator)'
				notes={result.hybrid ? hybridNotes : ['Tabelul hibrid publicat se oprește la 30 kW.']}
				row={result.hybrid}
			/>
		</div>
	</>
);

const CeilingResult = ({ result }: { result: Extract<Lookup, { kind: 'ceiling' }> }) => (
	<>
		<p className='font-serif text-[#1d1d1f] text-title'>
			Pentru {formatNumber(result.kwh)} kWh pe an nu există un rând în tabel.
		</p>
		<p className='mt-2.5 text-[#4a463f] text-[0.9375rem]'>
			Tabelul publicat se oprește la 200 kW. Pentru o stație mai mare vă trebuie un calcul individual.
		</p>
	</>
);

export const GenergyDemoPage = () => {
	const id = useId();
	const [value, setValue] = useState('');
	const [query, setQuery] = useState<string | null>(null);

	useDemoSeo();

	const result = query === null ? null : lookupStation(query);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setQuery(value);
	};

	// Editing the field drops the old answer rather than leaving it under a
	// number it no longer belongs to.
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		setQuery(null);
	};

	return (
		<motion.main
			animate={{ opacity: 1, y: 0 }}
			className='pt-[var(--header-h)]'
			id='main'
			initial={{ opacity: 0, y: 18 }}
			lang='ro'
			transition={{ duration: duration.page, ease }}
		>
			<div className='shell py-14 sm:py-20'>
				<div className='mx-auto max-w-3xl'>
					<Reveal>
						<Eyebrow className='mb-6'>Machetă</Eyebrow>
					</Reveal>

					<Reveal delay={0.06}>
						<p className='max-w-prose text-faded-text text-lede'>
							Machetă pornind de la tabelul publicat pe pagina de instalare GENERGY. Prețurile și cifrele sunt ale lor.
						</p>
					</Reveal>

					<Reveal className='mt-10 sm:mt-12' delay={0.12}>
						<div className='rounded-xl border border-[#d3893c] bg-white p-4 sm:p-8'>
							<h1 className='font-serif text-[#1d1d1f] text-title'>Ce stație vă trebuie?</h1>

							<p className='mt-3 max-w-prose text-[#4a463f] text-[0.9375rem]'>
								Împărțim consumul anual la {KWH_PER_KW}, așa cum scrie pe pagina de instalare, și vă arătăm rândul din
								tabel.
							</p>

							<form className='mt-6' onSubmit={handleSubmit}>
								<label className='block font-medium text-[#1d1d1f] text-[0.9375rem]' htmlFor={`${id}-consum`}>
									Cât ați consumat într-un an, în kWh
								</label>

								<div className='mt-3 flex flex-col gap-3 sm:flex-row'>
									<input
										autoComplete='off'
										className='w-full rounded-[6px] border border-[#ded9d1] bg-white px-4 py-3 text-[#1d1d1f] text-[1.0625rem] outline-none placeholder:text-[#a09a90] focus-visible:border-[#d3893c] sm:max-w-[15rem]'
										id={`${id}-consum`}
										inputMode='numeric'
										onChange={handleChange}
										placeholder='6400'
										type='text'
										value={value}
									/>

									<button
										className='rounded-[6px] bg-[#d3893c] px-5 py-3 font-medium text-[0.9375rem] text-white'
										type='submit'
									>
										Arată-mi rândul meu
									</button>
								</div>
							</form>

							<div aria-live='polite'>
								{result && (
									<motion.div
										animate={{ opacity: 1, y: 0 }}
										className='mt-8 border-[#e4e1dc] border-t pt-7'
										initial={{ opacity: 0, y: 12 }}
										transition={{ duration: duration.base, ease }}
									>
										{result.kind === 'station' ? <StationResult result={result} /> : <CeilingResult result={result} />}

										<div className='mt-7 flex flex-col gap-2 border-[#e4e1dc] border-t pt-6'>
											{caveats.map((caveat) => (
												<p className='text-[#6b675f] text-[0.8125rem] leading-relaxed' key={caveat}>
													{caveat}
												</p>
											))}
										</div>

										<QuoteRequest result={result} />
									</motion.div>
								)}
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</motion.main>
	);
};
