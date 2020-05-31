import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-community/async-storage';

import en from './locales/en';
import da from './locales/da';

const locales = RNLocalize.getLocales();

// let currentLang = AsyncStorage.getItem('currentLang');

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}
// en-GB
// fr-FR

I18n.fallbacks = true;
I18n.translations = {
  en,
  da,
};

export default I18n;
