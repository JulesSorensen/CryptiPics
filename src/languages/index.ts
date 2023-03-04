import fr from './traductions/fr.json';
import en from './traductions/en.json';
import no from './traductions/no.json';

export type TLanguages = 'en' | 'fr' | 'no';
export const supportedLanguages: TLanguages[] = ['en', 'fr', 'no'];

const languages: { code: TLanguages, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'no', name: 'Norwegian' }
]

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
            return translations[browserLang][text];
        } else {
            localStorage.setItem('l', 'en');
            return translations['en'][text];
        }
    } else {
        const lang = localStorage.getItem('l') as TLanguages;
        if (supportedLanguages.includes(lang)) {
            return translations[lang][text];
        } else {
            localStorage.setItem('l', 'en');
            return translations['en'][text];
        }
    }
}