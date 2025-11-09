import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { translations } from './translations';

// 1. Cria a instância do i18n-js
const i18n = new I18n(translations);

// 2. Define o idioma de fallback para caso o idioma do usuário não esteja na lista.
i18n.defaultLocale = 'pt-BR';

// 3. Define o idioma baseado no dispositivo.
// O 'locale' retornado pelo Expo é no formato 'pt-BR' ou 'es-ES'. 
// O i18n.locale aceita 'pt-BR' (match exato) ou 'pt' (match geral).
// Vamos usar o locale do Expo (ex: 'pt-BR') e, se não encontrar, usa apenas a língua (ex: 'pt').
const locale = Localization.getLocales()[0].languageTag;

if (i18n.translations.hasOwnProperty(locale)) {
    i18n.locale = locale;
} else {
    // Tenta usar apenas a parte do idioma (ex: 'pt')
    const languageCode = locale.split('-')[0];
    i18n.locale = languageCode;
}

// Quando `true`, se a tradução para a chave não existir no idioma atual, 
// ele tentará o defaultLocale.
i18n.enableFallback = true; 

// A função 't' será usada em todo o app para traduzir strings.
export const t = (scope: string) => i18n.t(scope);