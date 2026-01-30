import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selectors.ts';

export const WithoutAdminRightsRedirect = ({ children }: PropsWithChildren) => {
  const { isAdmin } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin]);

  if (!isAdmin) return null;

  return <>{children}</>;
};
