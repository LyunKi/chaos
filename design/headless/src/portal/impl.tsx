import ReactDOM from 'react-dom';
import { PortalProps } from './api';

export const Portal = ({
  container = document.body,
  children,
}: PortalProps) => {
  return ReactDOM.createPortal(children, container);
};
