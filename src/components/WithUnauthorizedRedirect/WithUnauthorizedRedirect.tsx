import { useSelector } from 'react-redux';
import { type ComponentType, type JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userSelector } from '../../store/user/selectors.ts';

export const withUnauthorizedRedirect = <P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>
) => {
  return (props: P) => {
    const { isAuthorized } = useSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthorized) {
        navigate('/user/login');
      }
    }, [isAuthorized]);

    return <Component {...props} />;
  };
};
