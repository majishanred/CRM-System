import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/rootStore.ts';
import { type PropsWithChildren, useEffect } from 'react';
import { initAuthorization } from '../../store/user/actions.ts';
import { initAuthorizationSelector } from '../../store/api/selectors/user.ts';

export const AuthInitializer = ({ children }: PropsWithChildren) => {
  const { status } = useSelector(initAuthorizationSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuthorization());
  }, []);

  if (status === 'pending') return null;

  return <>{children}</>;
};
