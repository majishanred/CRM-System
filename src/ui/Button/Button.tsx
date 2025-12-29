import './Button.scss';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: IconButtonProps) => {
  return (
    <button {...props} className={'button' + (props.className ? ' ' + props.className : '')}>
      {props.children}
    </button>
  );
};
