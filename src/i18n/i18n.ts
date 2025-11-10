import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { translations } from './translations';

const i18n = new I18n(translations);

i18n.defaultLocale = 'pt-BR';

const locale = Localization.getLocales()[0].languageTag;

if (i18n.translations.hasOwnProperty(locale)) {
    i18n.locale = locale;
} else {
    const languageCode = locale.split('-')[0];
    i18n.locale = languageCode;
}

i18n.enableFallback = true; 

export const t = (scope: string) => i18n.t(scope);