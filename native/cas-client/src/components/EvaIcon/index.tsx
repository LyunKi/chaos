import React, { LegacyRef } from 'react'
import { Icon, IconProps, useTheme } from '@ui-kitten/components'
import { StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import I18n from '../../i18n'

const CountriesIconProvider = (code: string) => ({
  toReactElement: (props: IconProps) => {
    const { style, ...rest } = props
    return I18n.isValidCountryCode(code) ? (
      <Image
        style={{
          ...style,
          padding: 8,
          tintColor: undefined,
        }}
        source={{ uri: I18n.getCountryByCode(code).flag }}
        {...rest}
      />
    ) : (
      <EvaIcon {...props} pack="eva" name="smartphone-outline" />
    )
  },
})

export const CountriesIconsPack = {
  name: 'countries',
  icons: (() => {
    return new Proxy(
      {},
      {
        get(_target, code: string) {
          return CountriesIconProvider(code)
        },
      }
    )
  })(),
}

const EvaIcon = React.forwardRef((props: IconProps, ref?: LegacyRef<any>) => {
  const {
    style = {},
    width,
    size,
    height,
    color,
    colorKey,
    onPress,
    status,
    pack = 'eva',
    ...rest
  } = props
  const theme = useTheme()
  let iconColor = color ?? theme[colorKey] ?? style.tintColor
  if (!iconColor && status) {
    iconColor = theme[`color-${status}-default`]
  }
  const mergedStyle = StyleSheet.flatten([
    style,
    {
      width: width ?? size ?? style?.width ?? 24,
      height: height ?? size ?? style?.height ?? 24,
      marginHorizontal: style?.marginHorizontal ?? 8,
      tintColor: iconColor,
    },
  ])
  const InnerIcon = <Icon ref={ref} pack={pack} style={mergedStyle} {...rest} />
  return onPress ? (
    <TouchableWithoutFeedback onPress={onPress}>
      {InnerIcon}
    </TouchableWithoutFeedback>
  ) : (
    InnerIcon
  )
})

export default EvaIcon
