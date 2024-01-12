// Create a custom hook to get the access token
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '@base/store/atoms/accessTokenAtom';

export const useAccessTokenAtom = () => {
  return useRecoilValue(accessTokenAtom);
};
