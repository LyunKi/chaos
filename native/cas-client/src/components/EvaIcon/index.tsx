import React, { LegacyRef } from 'react'
import { Icon, IconProps } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const EvaIcon = React.forwardRef((props: IconProps, ref?: LegacyRef<any>) => {
  const { style, width, size, height, color, ...rest } = props
  const mergedStyle = StyleSheet.compose(style, {
    width: width ?? size ?? style?.width,
    height: height ?? size ?? style?.height,
    tintColor: color ?? style.tintColor,
  })
  return <Icon ref={ref} pack="eva" style={mergedStyle} {...rest} />
})

export default EvaIcon
