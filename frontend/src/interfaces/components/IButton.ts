export interface IButtonProps {
  children: JSX.Element | string;
  className?: string;
  textColor?: string;
  isDisabled?: boolean;
  formElement?: boolean;
  primary?: boolean;
  secondary?: boolean;
  transparent?: boolean;
  modalElement?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmation?: boolean;
  decline?: boolean;
}
