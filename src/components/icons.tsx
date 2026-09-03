interface IconProps {
	title?: string;
	className?: string;
	size?: number;
}

const base = (size: number) => ({ height: size, width: size, viewBox: '0 0 16 16' });

export const ArrowIcon = ({ title, className, size = 14 }: IconProps) => (
	<svg aria-hidden={title ? undefined : 'true'} className={className} fill='none' {...base(size)}>
		<title>{title ?? 'Arrow'}</title>
		<path d='M3 8h10m0 0-4-4m4 4-4 4' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const ArrowUpRightIcon = ({ title, className, size = 14 }: IconProps) => (
	<svg aria-hidden={title ? undefined : 'true'} className={className} fill='none' {...base(size)}>
		<title>{title ?? 'Opens in a new tab'}</title>
		<path d='M5 11 11 5m0 0H6m5 0v5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const GithubIcon = ({ title, className, size = 16 }: IconProps) => (
	<svg className={className} strokeLinejoin='round' {...base(size)}>
		<title>{title ?? 'GitHub'}</title>
		<path
			clipRule='evenodd'
			d='M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z'
			fill='currentColor'
			fillRule='evenodd'
		/>
	</svg>
);

export const LinkedinIcon = ({ title, className, size = 16 }: IconProps) => (
	<svg className={className} strokeLinejoin='round' {...base(size)}>
		<title>{title ?? 'LinkedIn'}</title>
		<path
			clipRule='evenodd'
			d='M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z'
			fill='currentColor'
			fillRule='evenodd'
		/>
	</svg>
);

export const WhatsappIcon = ({ title, className, size = 16 }: IconProps) => (
	<svg className={className} height={size} viewBox='0 0 24 24' width={size}>
		<title>{title ?? 'WhatsApp'}</title>
		<path
			d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413'
			fill='currentColor'
		/>
	</svg>
);

export const TelegramIcon = ({ title, className, size = 16 }: IconProps) => (
	<svg className={className} height={size} viewBox='0 0 24 24' width={size}>
		<title>{title ?? 'Telegram'}</title>
		<path
			d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0m4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635'
			fill='currentColor'
		/>
	</svg>
);

export const ChevronIcon = ({ title, className, size = 12 }: IconProps) => (
	<svg aria-hidden={title ? undefined : 'true'} className={className} fill='none' {...base(size)}>
		<title>{title ?? 'Expand'}</title>
		<path d='m4 6.5 4 4 4-4' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.4' />
	</svg>
);

export const CheckIcon = ({ title, className, size = 13 }: IconProps) => (
	<svg aria-hidden={title ? undefined : 'true'} className={className} fill='none' {...base(size)}>
		<title>{title ?? 'Selected'}</title>
		<path
			d='m3 8.5 3.2 3.2L13 4.8'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.6'
		/>
	</svg>
);
