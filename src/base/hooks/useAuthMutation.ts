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

  const mChangePassword = useMutationCustom([queryKeys.auth_changePassword], `auth/reset-password`, 'PUT', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Change password Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      console.log(error);
      enqueueErrorBar('Change password Fail');
    },
  });

  return { mLogin, mChangePassword };
};
