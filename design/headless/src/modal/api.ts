import React from 'react';

export type VisibleChangeHandler = (visible: boolean) => any;

export interface OverlayProps {
  onHide: Function;
  style: React.CSSProperties;
  ref: React.Ref<HTMLElement>;
}

export interface ModalProps {
  /**
   * Optional trigger child component, or you can control it by visible prop.
   */
  children?: React.ReactElement;

  /**
   * To render a overlay which accepts a ref and a style used for position props,
   */
  renderOverlay: (props: OverlayProps) => React.ReactNode;

  /**
   * Host defined to indicate where to render popover content, default is document.body
   */
  container?: HTMLElement;

  /**
   * Control popover content whether to display
   */
  visible?: boolean;

  /**
   * Triggered when popover content visibility changing
   */
  onVisibleChange?: VisibleChangeHandler;

  /**
   * Whether to disable scroll, default is true
   */
  disabledScroll?: boolean;
}
