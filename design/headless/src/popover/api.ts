import React from 'react';

export type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'
  | 'auto';

export type TriggerEvent = 'click' | 'hover' | 'focus';

export interface OverlayProps {
  style: React.CSSProperties;
  onHide: Function;
  ref: React.RefObject<HTMLElement>;
}

export interface OverlayPosition {
  left: number;
  top: number;
}

export type VisibleChangeHandler = (visible: boolean) => any;

export interface PopoverProps {
  /**
   * Trigger child component
   */
  children: React.ReactElement;

  /**
   * To render a overlay which accepts a ref and a style used for position props,
   */
  renderOverlay: (props: OverlayProps) => React.ReactNode;

  /**
   * Host defined to indicate where to render popover content, default is document.body
   */
  container?: HTMLElement;

  /**
   * Position where popover content will appear
   */
  placement?: Placement;

  /**
   * Trigger events, default is ['hover']
   */
  triggerEvents?: Array<TriggerEvent>;

  /**
   * Control popover content whether to display
   */
  visible?: boolean;

  /**
   * Triggered when popover content visibility changing
   */
  onVisibleChange?: VisibleChangeHandler;
}
