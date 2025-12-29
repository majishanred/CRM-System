import './Input.scss';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <input {...props} className={'input' + (props.className ? ' ' + props.className : '')} />;
};
