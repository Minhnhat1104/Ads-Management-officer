import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from './useMutationCustom';
import { useSnackBar } from './useSnackbar';

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
        enqueueErrorBar(error.response.data.message);
      },
    },
    undefined,
    undefined,
    undefined,
    false
  );

  return { mLogin };
};
