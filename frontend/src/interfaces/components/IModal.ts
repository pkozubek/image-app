export interface IModalProps {
  isVisible: boolean;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: JSX.Element | JSX.Element[] | string;
  actions?: JSX.Element;
  header?: string;
}

export interface IConfirmationModalProps extends Omit<IModalProps, "children"> {
  question: string;
  onConfirm: () => void;
}

export interface IErrorModalProps extends Pick<IModalProps, "onCancel"> {
  error: string;
}
