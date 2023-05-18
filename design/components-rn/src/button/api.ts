import { GestureResponderEvent, View } from 'react-native';
import { AccessoryRenderProp, CloudDesignWrap, ThemeStyle } from '../common';

export type ButtonStatus =
  | 'primary'
  | 'normal'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface BasicButtonProps {
  isActive?: boolean;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  status?: ButtonStatus;
  disabled?: boolean;
  value?: string | AccessoryRenderProp;
  textTs?: ThemeStyle;
  onPress?: (event?: any) => any;
  renderLeft?: AccessoryRenderProp;
  renderRight?: AccessoryRenderProp;
  onFocus?: (event: any) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onBlur?: (event: any) => void;
  viewRef?: React.Ref<View>;
  loading?: boolean;
  loadingText?: string;
}

export type ButtonProps = CloudDesignWrap<BasicButtonProps>;
