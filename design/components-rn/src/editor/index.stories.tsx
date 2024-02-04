import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { View } from '../view';
import { Text } from '../text';
import {
  actions,
  IconRecord,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { styles } from '@cloud-dragon/common-utils';

const meta = {
  title: 'Cloud-Design/Editor',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    const richText = useRef<RichEditor>(null);
    return (
      <View ts={{ width: 375, height: 667 }}>
        <RichEditor ref={richText} />
        <RichToolbar
          editor={richText}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]}
          iconMap={{
            [actions.foreColor]: () => <Text value="FC"></Text>,
            [actions.hiliteColor]: ({ tintColor }: IconRecord) => (
              <Text value="BC"></Text>
            ),
            [actions.heading1]: ({ tintColor }: IconRecord) => (
              <Text value={'H1'}></Text>
            ),
            [actions.heading4]: ({ tintColor }: IconRecord) => (
              <Text value={'H4'}></Text>
            ),
          }}
        />
      </View>
    );
  },
};
