import { atom } from 'recoil';

export const accessTokenAtom = atom<any>({
  key: 'accessTokenAtom',
  default: '',
});
