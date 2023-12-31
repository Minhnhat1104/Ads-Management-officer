import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from './useMutationCustom';
import { useSnackBar } from './useSnackBar';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mLogin = useMutationCustom(
    [queryKeys.auth_login],
    'POST',
    'auth/signin',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Login Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueSuccessBar('Login Fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false
  );

  return { mLogin };
};
