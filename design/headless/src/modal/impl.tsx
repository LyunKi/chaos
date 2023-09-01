import isNil from 'lodash/isNil';
import React, { useEffect } from 'react';
import { ZIndex } from '../common/constants';
import { Portal } from '../portal';
import { ModalProps } from './api';

export const Modal = ({
  children,
  container = document.body,
  visible: visibleProp,
  onVisibleChange: onVisibleChangeProp,
  renderOverlay,
  disabledScroll = true,
}: ModalProps) => {
  const [computedVisible, setVisible] = React.useState(visibleProp ?? false);
  const isControl = !isNil(visibleProp);
  const child = children && React.Children.only(children);
  useEffect(() => {
    setVisible(!!visibleProp);
  }, [visibleProp]);
  const onVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next !== computedVisible) {
        onVisibleChangeProp?.(next);
      }
      if (!isControl) {
        setVisible(next);
      }
    },
    [computedVisible, isControl]
  );
  const overlayRef = React.useRef<HTMLElement>(null);
  const originContainerOverflowValue = React.useRef(container.style.overflow);
  React.useEffect(() => {
    if (disabledScroll && computedVisible) {
      container.style.overflow = 'hidden';
    } else {
      container.style.overflow = originContainerOverflowValue.current;
    }
  }, [computedVisible, disabledScroll]);
  return (
    <>
      {child &&
        React.cloneElement(child, {
          onClick: () => {
            child.props?.onClick?.();
            onVisibleChange(!computedVisible);
          },
        })}
      {computedVisible && (
        <Portal container={container}>
          {renderOverlay({
            ref: overlayRef,
            style: {
              zIndex: ZIndex.Modal,
            },
            onHide: () => {
              onVisibleChange(false);
            },
          })}
        </Portal>
      )}
    </>
  );
};
