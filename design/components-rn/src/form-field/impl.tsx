import React, { useMemo } from 'react';
import get from 'lodash-es/get';
import { styles } from '@cloud-dragon/common-utils';
import { TextStyle, ViewStyle } from 'react-native';
import { View } from '../view';
import { Text } from '../text';
import { ThemeStyle } from '../common';
import { FormConfig, FormFieldProps } from './api';

function renderLabel({ label, isRequired }: any) {
  const basicTextTs: ThemeStyle<TextStyle> = {
    fontWeight: '$fontWeight.semibold',
  };
  return (
    <View ts={{ marginBottom: '$space.2' }}>
      <Text ts={basicTextTs} value={label}></Text>
      {isRequired && (
        <Text
          ts={{
            ...basicTextTs,
            marginLeft: '$space.1',
            color: '$color.status.error',
          }}
          value="*"
        />
      )}
    </View>
  );
}

function renderTip({ tip, error, tipTs }: any) {
  const text = error || tip;
  const basicTextTs: ThemeStyle<TextStyle> = {
    fontSize: '$fontSize.sm',
    ...styles([
      !!error,
      {
        color: '$color.status.error',
      },
    ]),
  };
  return (
    <View
      ts={{
        height: '$rem:1.5',
        alignItems: 'center',
        paddingHorizontal: '$rem:1',
        ...tipTs,
      }}
    >
      <Text ts={basicTextTs} value={text}></Text>
    </View>
  );
}

function useFieldProps(name: string, formConfig: FormConfig = {}) {
  return useMemo(() => {
    const { errors, values, handleChange, handleBlur, touched } = formConfig;
    return {
      name,
      formConfig,
      error: get(errors, name),
      touched: get(touched, name),
      value: get(values, name),
      onChange: handleChange?.(name),
      onBlur: handleBlur?.(name),
    };
  }, [name, formConfig]);
}

export const FormField = ({
  label,
  renderField,
  name,
  tip,
  isRequired,
  formConfig,
  ts,
  style,
  tipTs,
}: FormFieldProps) => {
  const containerTs: ThemeStyle<ViewStyle> = {
    flexDirection: 'column',
    width: '100%',
    ...ts,
  };
  const fieldProps = useFieldProps(name, formConfig);
  const error = fieldProps.error;
  return (
    <View style={style} ts={containerTs}>
      {label && renderLabel({ label, isRequired })}
      {renderField(fieldProps)}
      {(error || tip) && renderTip({ tip, error, tipTs })}
    </View>
  );
};
