import { supportedLanguages, TLanguages } from '@src/languages';
import React, { useContext, useState } from 'react';

const LanguageSelector = () => {
    const [language, setLanguage] = useState(localStorage.getItem('l') && supportedLanguages.includes(localStorage.getItem('l') as TLanguages) ? localStorage.getItem('l')?.toLocaleLowerCase() : "en");

    const changeLanguage = (lang: string) => {
        localStorage.setItem('l', lang);
        setLanguage(lang);
    };

    return (
        <div className='flex items-center'>
            <img className={`h-[30px] my-auto ${language == "en" ? "bg-gray-800 rounded" : ""}`} src="./img/lang/en.png" alt="EN/US" onClick={() => { changeLanguage("en") }} />
            <img className={`h-[30px] my-auto ${language == "fr" ? "bg-gray-800 rounded" : ""}`} src="./img/lang/fr.png" alt="FR" onClick={() => { changeLanguage("fr") }} />
            <img className={`h-[30px] my-auto ${language == "no" ? "bg-gray-800 rounded" : ""}`} src="./img/lang/no.png" alt="NO" onClick={() => { changeLanguage("no") }} />
        </div>
    );
};

export default LanguageSelector;