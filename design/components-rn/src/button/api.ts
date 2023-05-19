import { GestureResponderEvent, View } from 'react-native';
import { AccessoryRenderProp, CloudDesignWrap, ThemeStyle } from '../common';

export type ButtonStatus =
  | 'primary'
  | 'normal'
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
  onFocus?: (event: any) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onBlur?: (event: any) => void;
  renderLeft?: AccessoryRenderProp;
  renderRight?: AccessoryRenderProp;
  viewRef?: React.Ref<View>;
  loading?: boolean;
  loadingText?: string;
}

export type ButtonProps = CloudDesignWrap<BasicButtonProps>;
