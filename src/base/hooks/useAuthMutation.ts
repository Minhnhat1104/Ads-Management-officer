import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from './useMutationPost';
import { useSnackBar } from './useSnackBar';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mLogin = useMutationPost(
    [queryKeys.auth_login],
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
