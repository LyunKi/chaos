import { View } from './View';
import { Widget } from './Widget';

export interface Snippet<ChildType, TagName extends 'Widget' | 'View'> {
  name?: string;
  tag: TagName;
  children: ChildType[];
}

export type WidgetSnippet = Snippet<Widget, 'Widget'>;
