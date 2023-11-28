import { DefaultConfigProps } from '@base/types/config';
import Storage from '@base/utils/storages/ls';

export const drawerWidth = 240;
export const headerHeight = 48;
export const headerFontColor = '#f5f5f7';

export const defaultLayoutHeaderHeight = '80px';
export const defaultLayoutWidth = '1300px';
export const defaultLayoutHorizontalSpacer = '24px';

export const SPLIT_MIN_SIZE = 380;
export const SPLIT_MAX_SIZE = 380;

const Ls = new Storage();
const languageTranslator = Ls.get('language-translator') ? (Ls.get('language-translator') as string) : 'false';

const config: DefaultConfigProps = {
  defaultPath: '/',
  // fontFamily: `'Inter',sans-serif`,
  // fontFamily: `'Noto Sans KR',sans-serif`,
  fontFamily: 'Roboto,sans-serif',
  // i18n: currentLang,
  container: false,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
  enableTrans: languageTranslator === 'true',
};

export default config;
