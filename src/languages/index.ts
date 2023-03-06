import fr from './translations/fr.json';
import en from './translations/en.json';
import no from './translations/no.json';

export type TLanguages = 'en' | 'fr' | 'no';
export const supportedLanguages: TLanguages[] = ['en', 'fr', 'no'];

const translations: { [key in TLanguages]: any } = {
    'en': en,
    'fr': fr,
    'no': no
}

export const getTranslation = (text: string): any => {
    if (!localStorage.getItem('l')) {
        const browserLang = navigator.language.split('-')[0] as TLanguages;
        if (supportedLanguages.includes(browserLang)) {
            localStorage.setItem('l', browserLang);
            return text.split('.').reduce((o, i) => o?.[i], translations[browserLang]) ?? text.split('.').reduce((o, i) => o?.[i], translations["en"]) ?? "* Missing translation *";
        } else {
            localStorage.setItem('l', 'en');
            return text.split('.').reduce((o, i) => o?.[i], translations["en"]) ?? "* Missing translation *";
        }
    } else {
        const lang = localStorage.getItem('l') as TLanguages;
        if (supportedLanguages.includes(lang)) { 
            return text.split('.').reduce((o, i) => o?.[i], translations[lang]) ?? text.split('.').reduce((o, i) => o?.[i], translations["en"]) ?? "* Missing translation *";
        } else {
            localStorage.setItem('l', 'en');
            return text.split('.').reduce((o, i) => o?.[i], translations["en"]) ?? "* Missing translation *";
        }
    }
}