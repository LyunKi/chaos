import { FlatList, Platform, TouchableHighlight, View } from 'react-native'
import {
  Divider,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components'
import { SafeArea, EvaIcon, BackAction } from '../components'
import { CountryList } from '../constants'
import I18n, { Country, CountryCode } from '../i18n'
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
            data={[
              { title: 'Title Text', key: 'item1' },
              { title: 'Title Text', key: 'item2' },
              { title: 'Title Text', key: 'item3' },
              { title: 'Title Text', key: 'item4' },
            ]}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.key}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <View>
                  <Text>{item.title}</Text>
                </View>
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
