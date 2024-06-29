import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '../enums/theme.enum';

const Footer = () => {
    const [isDarkModeSelected, setIsDarkModeSelected] = useState<boolean>(true);

    useEffect(() => {
        if (!localStorage.length) {
            setTheme(Theme.Dark);
        } else {
            setIsDarkModeSelected(localStorage.getItem('theme') === Theme.Dark);
        }
    }, []);

    const setTheme = (theme: Theme) => {
        const oppositeTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;

        localStorage.setItem('theme', theme);

        document.documentElement.classList.remove(oppositeTheme);
        document.documentElement.classList.add(theme);

        setIsDarkModeSelected(theme === Theme.Dark);
    };

    return (
        <footer>
            <div className="flex justify-between items-center mt-[50px] pt-[14px] px-[21px] border-t-[1px] border-faded-line">
                <div className="flex justify-start items-center gap-x-[7px] text-[14px]">
                    <span>&copy; 2024.</span>
                    <span className="dot" />
                    <Link to="https://github.com/lorenzo-ap" target="_blank">
                        <svg
                            className="hover:text-[#000] dark:hover:text-[#fff] transition-colors duration-150"
                            strokeLinejoin="round"
                            height="16"
                            viewBox="0 0 16 16">
                            <g clipPath="url(#clip0_872_3147)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_872_3147">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                    <Link to="https://www.linkedin.com/in/lorenzo-apl/" target="_blank">
                        <svg
                            className="hover:text-[#000] dark:hover:text-[#fff] transition-colors duration-150"
                            role="img"
                            height="16"
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width="16">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="flex bg-faded-bg rounded-md">
                    <button
                        className={`${
                            !isDarkModeSelected && 'bg-faded-bg rounded-md'
                        } px-1.5 py-1 hover:bg-faded-bg rounded-md transition-colors duration-150`}
                        type="button"
                        onClick={() => setTheme(Theme.Light)}>
                        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.75 0.75V0H7.25V0.75V2V2.75H8.75V2V0.75ZM11.182 3.75732L11.7123 3.22699L12.0659 2.87344L12.5962 2.34311L13.6569 3.40377L13.1265 3.9341L12.773 4.28765L12.2426 4.81798L11.182 3.75732ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM13.25 7.25H14H15.25H16V8.75H15.25H14H13.25V7.25ZM0.75 7.25H0V8.75H0.75H2H2.75V7.25H2H0.75ZM2.87348 12.0659L2.34315 12.5962L3.40381 13.6569L3.93414 13.1265L4.28769 12.773L4.81802 12.2426L3.75736 11.182L3.22703 11.7123L2.87348 12.0659ZM3.75735 4.81798L3.22702 4.28765L2.87347 3.9341L2.34314 3.40377L3.4038 2.34311L3.93413 2.87344L4.28768 3.22699L4.81802 3.75732L3.75735 4.81798ZM12.0659 13.1265L12.5962 13.6569L13.6569 12.5962L13.1265 12.0659L12.773 11.7123L12.2426 11.182L11.182 12.2426L11.7123 12.773L12.0659 13.1265ZM8.75 13.25V14V15.25V16H7.25V15.25V14V13.25H8.75Z"
                                fill={`${isDarkModeSelected ? '#fff' : '#000'}`}
                            />
                        </svg>
                    </button>
                    <button
                        className={`${
                            isDarkModeSelected && 'bg-faded-bg rounded-md'
                        } px-1.5 py-1 hover:bg-faded-bg rounded-md transition-colors duration-150`}
                        type="button"
                        onClick={() => setTheme(Theme.Dark)}>
                        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.5 8.00005C1.5 5.53089 2.99198 3.40932 5.12349 2.48889C4.88136 3.19858 4.75 3.95936 4.75 4.7501C4.75 8.61609 7.88401 11.7501 11.75 11.7501C11.8995 11.7501 12.048 11.7454 12.1953 11.7361C11.0955 13.1164 9.40047 14.0001 7.5 14.0001C4.18629 14.0001 1.5 11.3138 1.5 8.00005ZM6.41706 0.577759C2.78784 1.1031 0 4.22536 0 8.00005C0 12.1422 3.35786 15.5001 7.5 15.5001C10.5798 15.5001 13.2244 13.6438 14.3792 10.9921L13.4588 9.9797C12.9218 10.155 12.3478 10.2501 11.75 10.2501C8.71243 10.2501 6.25 7.78767 6.25 4.7501C6.25 3.63431 6.58146 2.59823 7.15111 1.73217L6.41706 0.577759ZM13.25 1V1.75V2.75L14.25 2.75H15V4.25H14.25H13.25V5.25V6H11.75V5.25V4.25H10.75L10 4.25V2.75H10.75L11.75 2.75V1.75V1H13.25Z"
                                fill={`${isDarkModeSelected ? '#fff' : '#000'}`}
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
