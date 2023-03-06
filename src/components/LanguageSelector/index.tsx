import { supportedLanguages, TLanguages } from '@src/languages';
import React, { useContext, useState } from 'react';

const LanguageSelector = () => {
    const [inSelection, setInSelection] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('l') && supportedLanguages.includes(localStorage.getItem('l') as TLanguages) ? localStorage.getItem('l')?.toLocaleLowerCase() : "en");

    const changeLanguage = (lang: string) => {
        if (localStorage.getItem('l') === lang) return;
        localStorage.setItem('l', lang);
        setLanguage(lang);
        window.location.reload();
    };

    return (
        <>
            {inSelection && <div className='flex items-center mr-3' onClick={() => setInSelection(!inSelection)}>
                <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "en" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/en.png" alt="EN/US" onClick={() => { changeLanguage("en") }} />
                <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "fr" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/fr.png" alt="FR" onClick={() => { changeLanguage("fr") }} />
                <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "no" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/no.png" alt="NO" onClick={() => { changeLanguage("no") }} />
            </div>}
            {!inSelection && <div className='flex items-center mr-3 text-center' onClick={() => setInSelection(!inSelection)}>
                <svg className='w-6 h-6 text-slate-700 dark:text-slate-300' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
            </div>}
        </>

    );
};

export default LanguageSelector;