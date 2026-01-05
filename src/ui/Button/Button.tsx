import './Button.scss';
import { Button as AntdButton, type ButtonProps } from 'antd';

export const Button = (props: ButtonProps) => {
  return (
    <AntdButton {...props} className={'button' + (props.className ? ' ' + props.className : '')}>
      {props.children}
    </AntdButton>
  );
};
