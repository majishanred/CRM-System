import { useSelector } from 'react-redux';
import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userSelector } from '../../store/user/selectors.ts';
import { initAuthorizationSelector } from '../../store/api/selectors/user.ts';

export const WithUnauthorizedRedirect = ({ children }: PropsWithChildren) => {
  const { status } = useSelector(initAuthorizationSelector);
  const { isAuthorized } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized && (status === 'fulfilled' || status === 'rejected')) {
      navigate('/user/signin');
    }
  }, [isAuthorized]);

  if (!isAuthorized) return null;

  return <>{children}</>;
};
