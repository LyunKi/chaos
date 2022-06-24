import { FlatList, Platform, TouchableHighlight, View } from 'react-native'
import {
  Divider,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components'
import { SafeArea, EvaIcon, BackAction } from '../components'
import { COUNTRY_LIST } from '../constants'
import I18n, { Country } from '../i18n'
import React from 'react'
import { remToPx } from 'polished'

interface CountryItemProps {
  country: Country
}

function CountryItem(props: CountryItemProps) {
  const { country } = props
  const { countryCode, name } = country
  return (
    <View>
      <EvaIcon name={countryCode} pack="countries" />
      <Text>{name.common}</Text>
    </View>
  )
}

const ITEM_HEIGHT = 10

export interface CountryPickerProps {}

export default function CountryPicker(props: CountryPickerProps) {
  const {} = props
  const [searchValue, setSearchValue] = React.useState(undefined)
  const seachCountry = React.useCallback((inputText) => {}, [])
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
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({ highlighted }) => (
                <View
                  style={[
                    { backgroundColor: 'black', height: 5 },
                    highlighted && { marginLeft: 0 },
                  ]}
                />
              ))
            }
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            data={COUNTRY_LIST}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.countryCode}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <CountryItem country={item} />
              </TouchableHighlight>
            )}
          />
          {/* {Object.entries(countries).map(([countryCode, country]) => (
            <CountryItem
              country={{ countryCode: countryCode as CountryCode, ...country }}
            />
          ))} */}
        </View>
      </Layout>
    </SafeArea>
  )
}
