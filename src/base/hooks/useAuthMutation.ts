import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from './useMutationCustom';
import { useSnackBar } from './useSnackBar';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mLogin = useMutationCustom(
    [queryKeys.auth_login],
    'auth/signin',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Login Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Login Fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false
  );

  return { mLogin };
};
