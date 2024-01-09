import { useSnackBar } from '@base/hooks/useSnackbar';
import { profileAtom } from '@base/store/atoms/profileAtom';
import React, { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface NotificationContextProps {
  children: ReactNode;
}

const NotificationContext = (props: NotificationContextProps) => {
  const { children } = props;

  const { enqueuePrimaryBar } = useSnackBar();

  const profile = useRecoilValue(profileAtom);

  useEffect(() => {
    const userId = profile?.id;

    const eventSource = new EventSource(`http://localhost:8000/notification/account/${userId}/report`);

    eventSource.onopen = () => {
      console.log(`Connection to server opened with userID: ${profile?.id}`);
    };

    eventSource.onmessage = ({ data }) => {
      console.log(data);
      enqueuePrimaryBar(data);
    };

    eventSource.onerror = (e) => {
      console.log('EventSource failed.', e);
    };

    return () => {
      eventSource.close();
    };
  }, [profile]);

  return <>{children}</>;
};

export default NotificationContext;
