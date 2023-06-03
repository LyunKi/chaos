import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { action } from '@storybook/addon-actions';
import { Input } from '../input';
import { View } from '../view';
import { Button } from '../button';
import { FormField } from '.';

const meta = {
  title: 'Cloud-Design/FormField',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <View
        ts={{
          width: 375,
          padding: '$rem:1',
        }}
      >
        <FormField
          name="name"
          isRequired
          label="Name"
          renderField={(props) => (
            <Input {...props} placeholder="Please input your name" />
          )}
        />
      </View>
    );
  },
};

export const UsageWithFormik: Story = {
  render() {
    return (
      <View
        ts={{
          width: 375,
          padding: '$rem:1',
        }}
      >
        <Formik
          initialValues={{}}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name should not be empty'),
          })}
          onSubmit={action('Submit')}
        >
          {(formConfig) => {
            return (
              <View ts={{ width: '100%', flexDirection: 'column' }}>
                <FormField
                  tip="Try to submit"
                  name="name"
                  isRequired
                  label="Name"
                  formConfig={formConfig}
                  renderField={(props) => (
                    <Input {...props} placeholder="Please input your name" />
                  )}
                />
                <Button value={'Submit'} onPress={formConfig.handleSubmit} />
              </View>
            );
          }}
        </Formik>
      </View>
    );
  },
};
