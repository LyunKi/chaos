import type { Meta, StoryObj } from '@storybook/react';
import { PortalHost } from '@gorhom/portal';
import React from 'react';
import { View } from '../view';
import { Button } from '../button';
import { Toast, ToastRoot } from '.';

const meta = {
  title: 'Cloud-Design/ToastRoot',
  component: ToastRoot,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof ToastRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render() {
    const TOAST_HOST = 'TOAST_HOST';
    return (
      <View ts={{ width: 200, flexDirection: 'column', gap: 16 }}>
        <PortalHost name={TOAST_HOST} />
        <ToastRoot host={TOAST_HOST} ref={Toast.init} />
        <Button
          value="simple info"
          status="info"
          onPress={() =>
            Toast.info({
              description: 'description',
            })
          }
        />
        <Button
          value="info"
          status="info"
          onPress={() =>
            Toast.info({ title: 'title', description: 'description' })
          }
        />
        <Button
          value="warning"
          status="warning"
          onPress={() =>
            Toast.warning({ title: 'title', description: 'description' })
          }
        />
        <Button
          value="error"
          status="error"
          onPress={() =>
            Toast.error({ title: 'title', description: 'description' })
          }
        />
        <Button
          value="success"
          status="success"
          onPress={() =>
            Toast.success({ title: 'title', description: 'description' })
          }
        />
        <Button
          value="loading"
          onPress={() =>
            Toast.loading({ title: 'title', description: 'description' })
          }
        />
      </View>
    );
  },
} as any as Story;
