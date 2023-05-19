import { ImageSourcePropType } from 'react-native';
import { CloudDesignWrap } from '../common';

export interface BasicAvatarProps {
  src?: ImageSourcePropType;
  size?: number | string;
}
export type AvatarProps = CloudDesignWrap<BasicAvatarProps>;
