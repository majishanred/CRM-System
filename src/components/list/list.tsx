import './list.scss';
import type { ReactNode } from 'react';

type ListProps = { className?: string; children?: ReactNode | undefined };

export const List = ({ className, children }: ListProps) => {
  return <div className={'list' + className ? ' ' + className : ''}>{children}</div>;
};
