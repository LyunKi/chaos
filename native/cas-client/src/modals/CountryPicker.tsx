import { FlatList, Platform, TouchableHighlight, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { SafeArea, EvaIcon } from '../components'
import { CountryList } from '../constants'
import { Country, CountryCode } from '../i18n'
import React from 'react'

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

export default function CountryPicker() {
  return (
    <SafeArea>
      <Layout>
        <View></View>
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
