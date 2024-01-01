import { useRecoilState } from 'recoil';
// types
import { DefaultConfigProps, PresetColor, ThemeDirection, ThemeMode } from '@base/types/config';
import { configAtom } from '@base/store/atoms/config';
import Storages from '@base/utils/storages/ls';
import _ from 'lodash';
// import { useAppSetting } from './user-setting/useAppSetting';

// ==============================|| CONFIG - HOOKS  ||============================== //

export interface UseConfigProps {
  onChange: (nConfig: DefaultConfigProps) => void;
}

const useConfig = () => {
  // const { saveAppSetting } = useAppSetting();
  const [config, setConfig] = useRecoilState<DefaultConfigProps>(configAtom);
  // console.log('🚀 ~ file: useConfig.ts:11 ~ useConfig ~ config', config);

  const Ls = new Storages();
  const languageTranslator = Ls.get('language-translator') ? (Ls.get('language-translator') as string) : 'false';

  // save app config
  const handleAppSetting = (nConfig: DefaultConfigProps) => {
    setConfig(nConfig);
  };

  return {
    ...config,
    onChangeContainer: () => {},

    onChangeMode: (mode: ThemeMode) => {
      const nConfig = { ...config, mode: mode };
      handleAppSetting(nConfig);
    },
    onChangePresetColor: (theme: PresetColor) => {
      const nConfig = { ...config, presetColor: theme };
      handleAppSetting(nConfig);
    },
    onChangeDirection: (direction: ThemeDirection) => {},

    onChangeFontFamily: (fontFamily: string) => {},
    enableTrans: languageTranslator === 'true',
    onLanguageTranslator: (enableTrans: boolean) => {
      Ls.set('language-translator', enableTrans.toString());
      const nConfig = { ...config, enableTrans: enableTrans };
      setConfig(nConfig);
    },
    initAppSetting: (nConfig: DefaultConfigProps) => {
      if (!_.eq(nConfig, config)) {
        setConfig(nConfig);
      }
    },
  };
};

export default useConfig;
