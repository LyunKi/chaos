import { FlatList, TouchableHighlight, View } from 'react-native'
import {
  Divider,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components'
import filter from 'lodash/filter'
import React from 'react'
import { remToPx } from 'polished'
import styled from 'styled-components/native'
import I18n, { COUNTRIES } from '../../i18n'
import EvaIcon from '../EvaIcon'
import SafeArea from '../SafeArea'
import BackAction from '../BackAction'
import { Country, CountryCurrentPropKey } from '../../i18n/countries'

interface CountryItemProps {
  country: Country
  selectedCountry?: Country
}
const CountryItemContainer = styled(View)`
  flex-flow: row;
  height: ${remToPx(3)};
  align-items: center;
`

const CountryName = styled(Text)`
  margin-left: ${remToPx(1)}
  flex: 1;
`

const Checkbox = styled(View)`
  width: 40px;
`

const CountryKeyProp = styled(Text)``

function CountryItem(props: CountryItemProps) {
  const { country, selectedCountry } = props
  const { countryCode, name, callingCode } = country
  return (
    <CountryItemContainer>
      <EvaIcon name={countryCode} pack="countries" />
      <CountryName>{name[I18n.currentLocale]}</CountryName>
      <CountryKeyProp>{callingCode}</CountryKeyProp>
      <Checkbox>
        {countryCode === selectedCountry?.countryCode && (
          <EvaIcon name="checkmark-outline" />
        )}
      </Checkbox>
    </CountryItemContainer>
  )
}

const ITEM_HEIGHT = 10

export interface CountryPickerProps {
  country?: Country
  keyProp?: CountryCurrentPropKey
}

function useCountryItems(params: {
  searchValue?: string
  selectedCountry?: Country
  keyProp?: CountryCurrentPropKey
}) {
  const { searchValue, selectedCountry, keyProp } = params
  return React.useMemo(() => {
    const countryItems = filter(COUNTRIES, (country) => {
      const { countryCode, name } = country
      const { common, zh, en } = name
      return (
        countryCode !== selectedCountry?.countryCode &&
        (!searchValue ||
          common.includes(searchValue) ||
          en.includes(searchValue) ||
          zh.includes(searchValue) ||
          !!(keyProp && country[keyProp].includes(searchValue)))
      )
    })
    if (selectedCountry) {
      countryItems.unshift(selectedCountry)
    }
    return countryItems
  }, [searchValue, selectedCountry, keyProp])
}

export function CountryPicker(props: CountryPickerProps) {
  const { country, keyProp } = props
  const [searchValue, setSearchValue] = React.useState(undefined)
  const seachCountry = React.useCallback((inputText) => {
    setSearchValue(inputText)
  }, [])
  const countryItems = useCountryItems({
    searchValue,
    selectedCountry: country,
    keyProp,
  })
  return (
    <SafeArea>
      <TopNavigation
        alignment="center"
        title={I18n.t('countryPicker.title')}
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout>
        <View style={{ padding: remToPx(1) }}>
          <Input
            accessoryLeft={(props) => (
              <EvaIcon {...props} name="search-outline" />
            )}
            placeholder={I18n.t('countryPicker.placeholder')}
            value={searchValue}
            onChangeText={seachCountry}
          />
        </View>
        <Divider />
        <View>
          <FlatList
            ItemSeparatorComponent={() => <Divider />}
            getItemLayout={(_data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            data={countryItems}
            renderItem={({ item, separators }) => (
              <TouchableHighlight
                key={item.countryCode}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <CountryItem country={item} selectedCountry={country} />
              </TouchableHighlight>
            )}
          />
        </View>
      </Layout>
    </SafeArea>
  )
}
