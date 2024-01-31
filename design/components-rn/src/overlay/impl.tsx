import React, { useRef, useState } from 'react';
import { Modal, View as RnView } from 'react-native';
import { View } from '../view';
import { OverlayProps } from './api';

export const Overlay = ({
  renderTrigger,
  mask,
  contentContainerTs,
  getContentPosition,
  renderContent,
}: OverlayProps) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<RnView>(null);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });
  const toggle = () => {
    if (!visible && getContentPosition) {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setPosition(getContentPosition({ x, y, width, height, pageX, pageY }));
      });
    }
    setVisible((prev) => !prev);
  };
  const ModalContent = (
    <View
      ts={{
        position: 'absolute',
        ...position,
        ...contentContainerTs,
      }}
      stopPropagation
    >
      {renderContent({ onPress: toggle })}
    </View>
  );
  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={toggle}
      >
        <View
          onPress={mask?.disableCloseOnPress ? undefined : toggle}
          ts={{
            backgroundColor: 'transparent',
            width: '$vw:100',
            height: '$vh:100',
            ...mask?.ts,
          }}
        >
          {ModalContent}
        </View>
      </Modal>
      {renderTrigger?.({
        viewRef: triggerRef,
        onPress: toggle,
        isActive: !!visible,
      })}
    </>
  );
};
