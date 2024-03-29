import { Fn, KV } from '@cloud-dragon/common-types';
import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { CloudDesignWrap, ThemeStyle } from '../common';

export interface FormConfig {
  errors?: KV<any>;
  touched?: KV<any>;
  handleChange?: Fn;
  handleBlur?: Fn;
  values?: KV<any>;
}

export interface FieldProps {
  value?: any;
  error?: string;
  name: string;
  onChange?: Fn;
  formConfig: FormConfig;
}

export interface BasicFormFieldProps {
  name: string;
  renderField: (props: FieldProps) => ReactElement;
  label?: string;
  tip?: string;
  tipTs?: ThemeStyle<ViewStyle>;
  isRequired?: boolean;
  /**
   * It's designed to be used with formik
   */
  formConfig?: FormConfig;
}

export type FormFieldProps = CloudDesignWrap<BasicFormFieldProps, ViewStyle>;
