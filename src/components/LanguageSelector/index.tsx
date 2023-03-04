import { supportedLanguages, TLanguages } from '@src/languages';
import React, { useContext, useState } from 'react';

const LanguageSelector = () => {
    const [language, setLanguage] = useState(localStorage.getItem('l') && supportedLanguages.includes(localStorage.getItem('l') as TLanguages) ? localStorage.getItem('l')?.toLocaleLowerCase() : "en");

    const changeLanguage = (lang: string) => {
        localStorage.setItem('l', lang);
        setLanguage(lang);
        window.location.reload();
    };

    return (
        <div className='flex items-center mr-5'>
            <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "en" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/en.png" alt="EN/US" onClick={() => { changeLanguage("en") }} />
            <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "fr" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/fr.png" alt="FR" onClick={() => { changeLanguage("fr") }} />
            <img className={`h-[30px] my-auto transition-all duration-300 rounded ${language == "no" ? "bg-gray-800 hover:bg-gray-800 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`} src="./img/lang/no.png" alt="NO" onClick={() => { changeLanguage("no") }} />
        </div>
    );
};

export default LanguageSelector;