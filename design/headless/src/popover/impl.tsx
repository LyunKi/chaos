import React, { useEffect } from 'react';
import invoke from 'lodash/invoke';
import isNil from 'lodash/isNil';
import isEqual from 'lodash/isEqual';
import { combineRefs } from '@cloud-dragon/react-utils';
import { SizeObserver } from '../size-observer';
import {
  OverlayPosition,
  Placement,
  PopoverProps,
  VisibleChangeHandler,
} from './api';
import { Portal } from '../portal';
import { ZIndex } from '../common/constants';

/**
 * 根据 container,trigger,overlay,placement来确定overlay的位置
 */
function calcPosition({
  placement,
  overlayNode,
  triggerNode,
  container,
}: {
  placement: Placement;
  overlayNode?: HTMLElement;
  triggerNode?: HTMLElement;
  container?: HTMLElement;
}) {
  const initialPosition = {
    top: 0,
    left: 0,
    display: 'none',
  };
  if (!overlayNode || !triggerNode || !container) {
    return initialPosition;
  }
  const calcPositionByPlacement = (
    passedPlacement: Placement
  ): OverlayPosition => {
    const overlayRect = overlayNode.getBoundingClientRect();
    const triggerRect = triggerNode.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offsetTop = triggerRect.top - containerRect.top;
    const offsetLeft = triggerRect.left - containerRect.left;
    switch (passedPlacement) {
      case 'top': {
        return {
          top: offsetTop - overlayRect.height,
          left: offsetLeft + (triggerRect.width - overlayRect.width) / 2,
        };
      }
      case 'right': {
        return {
          top: offsetTop + (triggerRect.height - overlayRect.height) / 2,
          left: offsetLeft + triggerRect.width,
        };
      }
      case 'bottom': {
        return {
          top: offsetTop + triggerRect.height,
          left: offsetLeft + (triggerRect.width - overlayRect.width) / 2,
        };
      }
      case 'left': {
        return {
          top: offsetTop + (triggerRect.height - overlayRect.height) / 2,
          left: offsetLeft - overlayRect.width,
        };
      }
      case 'topLeft': {
        return {
          top: offsetTop - overlayRect.height,
          left: offsetLeft,
        };
      }
      case 'topRight': {
        return {
          top: offsetTop - overlayRect.height,
          left: offsetLeft + (triggerRect.width - overlayRect.width),
        };
      }
      case 'bottomLeft': {
        return {
          top: offsetTop + triggerRect.height,
          left: offsetLeft,
        };
      }
      case 'bottomRight': {
        return {
          top: offsetTop + triggerRect.height,
          left: offsetLeft + (triggerRect.width - overlayRect.width),
        };
      }
      case 'leftTop': {
        return {
          top: offsetTop,
          left: offsetLeft - overlayRect.width,
        };
      }
      case 'leftBottom': {
        return {
          top: offsetTop + (triggerRect.height - overlayRect.height),
          left: offsetLeft - overlayRect.width,
        };
      }
      case 'rightTop': {
        return {
          top: offsetTop,
          left: offsetLeft + triggerRect.width,
        };
      }
      case 'rightBottom': {
        return {
          top: offsetTop + (triggerRect.height - overlayRect.height),
          left: offsetLeft + triggerRect.width,
        };
      }
      default:
        // auto
        const orders: Placement[] = [
          'top',
          'left',
          'right',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
          'leftTop',
          'leftBottom',
          'rightTop',
          'rightBottom',
        ];
        let fallbackResult;
        for (const order of orders) {
          const resultPosition = calcPositionByPlacement(order);
          if (!fallbackResult) {
            fallbackResult = resultPosition;
          }
          if (
            resultPosition.left >= 0 &&
            resultPosition.top >= 0 &&
            resultPosition.left + overlayRect.width <= containerRect.width &&
            resultPosition.top + overlayRect.height <= containerRect.height
          ) {
            return resultPosition;
          }
        }
        return fallbackResult as OverlayPosition;
    }
  };
  return calcPositionByPlacement(placement);
}

/**
 * 确定popover的位置，并返回重新定位位置的方法
 */
function usePosition({
  container,
  triggerNode,
  overlayNode,
  placement,
}: {
  container?: HTMLElement;
  triggerNode?: HTMLElement;
  overlayNode?: HTMLElement;
  placement: Placement;
}) {
  const [currentPosition, setPosition] = React.useState(
    calcPosition({
      placement,
      overlayNode,
      triggerNode,
      container,
    })
  );
  const adjustPosition = React.useCallback(() => {
    const newPosition = calcPosition({
      placement,
      overlayNode,
      triggerNode,
      container,
    });
    if (!isEqual(currentPosition, newPosition)) {
      setPosition(newPosition);
    }
  }, [currentPosition, placement, overlayNode, triggerNode, container]);
  return {
    positionStyles: currentPosition,
    adjustPosition,
  };
}

/**
 * 根据triggers为child绑定相应的事件
 */
function useBindEventTriggers({
  triggers,
  childProps,
  onVisibleChange,
  visible,
  overlayNode,
  triggerNode,
}: {
  triggers: string[];
  childProps: any;
  visible: boolean;
  onVisibleChange: VisibleChangeHandler;
  overlayNode?: HTMLElement;
  triggerNode?: HTMLElement;
}) {
  // 帮助绑定相关trigger事件
  const addEvent = (target: any, eventKey: string, nextVisible?: boolean) => {
    target[eventKey] = (event: any) => {
      invoke(childProps, eventKey, event);
      onVisibleChange(nextVisible ?? !visible);
    };
  };
  const triggerProps = {};
  if (triggers.includes('hover')) {
    if (!window.PointerEvent && !window.TouchEvent) {
      addEvent(triggerProps, 'onMouseEnter', true);
      addEvent(triggerProps, 'onMouseLeave', false);
    } else {
      addEvent(triggerProps, 'onPointerEnter', true);
      addEvent(triggerProps, 'onPointerLeave', false);
    }
  }
  if (triggers.includes('focus')) {
    addEvent(triggerProps, 'onFocus', true);
    addEvent(triggerProps, 'onBlur', false);
  }
  if (triggers.includes('click')) {
    addEvent(triggerProps, 'onClick');
  }
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target &&
        triggerNode &&
        target !== triggerNode &&
        !overlayNode?.contains(target)
      ) {
        // should notify component to hide overlay when clicking out side the overlay
        onVisibleChange(false);
      }
    };
    if (triggers.includes('click')) {
      document.addEventListener('click', onClickOutside);
    }
    return () => document.removeEventListener('click', onClickOutside);
  }, [triggerNode, overlayNode, onVisibleChange]);

  return triggerProps;
}

export const Popover = React.forwardRef(
  (
    {
      children,
      container = document.body,
      placement = 'auto',
      visible: visibleProp,
      onVisibleChange: onVisibleChangeProp,
      renderOverlay,
      triggerEvents = ['hover'],
    }: PopoverProps,
    forwardRef
  ) => {
    const triggerRef = React.useRef<any>(null);
    const overlayRef = React.useRef<any>(null);
    const child = React.Children.only(children);
    const [computedVisible, setVisible] = React.useState(visibleProp ?? false);
    const isControl = !isNil(visibleProp);
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
    const triggerProps = useBindEventTriggers({
      triggers: triggerEvents,
      childProps: child.props,
      onVisibleChange,
      visible: computedVisible,
      overlayNode: overlayRef.current,
      triggerNode: triggerRef.current,
    });
    const { positionStyles, adjustPosition } = usePosition({
      container,
      triggerNode: triggerRef.current,
      overlayNode: overlayRef.current,
      placement,
    });
    return (
      <>
        <SizeObserver
          ref={combineRefs(triggerRef, forwardRef, (child as any).ref)}
          onResize={adjustPosition}
        >
          {React.cloneElement(child, triggerProps)}
        </SizeObserver>
        {computedVisible && (
          <Portal container={container}>
            {renderOverlay({
              style: {
                position: 'absolute',
                zIndex: ZIndex.Popover,
                ...positionStyles,
              },
              ref: overlayRef,
              onHide: () => {
                onVisibleChange(false);
              },
            })}
          </Portal>
        )}
      </>
    );
  }
);
