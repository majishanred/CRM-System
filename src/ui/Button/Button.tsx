import './Button.scss';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant?: 'primary' | 'danger' };

export const Button = ({ variant, ...props }: IconButtonProps) => {
  const applyClassNames = () => {
    const classNames: string[] = ['button', props.className || ''];
    classNames.push(variant || '');
    return classNames.join(' ');
  };

  return (
    <button {...props} className={applyClassNames()}>
      {props.children}
    </button>
  );
};
