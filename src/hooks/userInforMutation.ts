import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';

export const userProfileMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mEditInfo = useMutationCustom([queryKeys.info], `accounts/profile`, 'PATCH', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Edit Profile Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Edit Profile Fail');
    },
  });

  return { mEditInfo };
};
