import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selectors.ts';
import type { Roles } from '../../types/admin.ts';

type Props = {
  checkRoles: (roles: Roles[]) => boolean;
};

export const WithoutAdminRightsRedirect = ({ children, checkRoles }: PropsWithChildren<Props>) => {
  const { userRoles } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkRoles(userRoles)) {
      navigate('/');
    }
  }, [userRoles]);

  if (!userRoles.length) return null;

  return <>{children}</>;
};
