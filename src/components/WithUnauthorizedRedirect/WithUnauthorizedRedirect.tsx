import { useSelector } from 'react-redux';
import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userSelector } from '../../store/user/selectors.ts';

export const WithUnauthorizedRedirect = ({ children }: PropsWithChildren) => {
  const { isAuthorized } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/user/signin');
    }
  }, [isAuthorized]);

  if (!isAuthorized) return null;

  return <>{children}</>;
};
