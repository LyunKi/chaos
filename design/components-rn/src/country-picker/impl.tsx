import { FlatList } from 'react-native';
import filter from 'lodash-es/filter';
import take from 'lodash-es/take';
import React from 'react';
import {
  CountriesManager,
  Country,
  COUNTRIES,
  SupportedCountryKeyProp,
} from '@cloud-dragon/world-countries';
import { View } from '../view';
import { Icon } from '../icon';
import { Text } from '../text';
import { Divider } from '../divider';
import { Input } from '../input';
import { Button } from '../button';
import { Image } from 'react-native';
import { CountryItemProps, CountryPickerProps } from './api';

function CountryItem(props: CountryItemProps) {
  const { country, selectedCountry, keyProp = 'callingCode' } = props;
  const { cca2 } = country;
  const keyPropValue = CountriesManager.getKeyPropValue(country, keyProp);
  const showName = CountriesManager.getShowName(country, selectedCountry);
  return (
    <View
      ts={{
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Icon
        icon={(iconProps) => (
          <Image
            {...iconProps}
            source={{ uri: CountriesManager.getFlagCdnUrl(country) }}
          />
        )}
      />
      <Text ts={{ marginLeft: '$rem:0.5', flex: 1 }} value={showName} />
      {keyPropValue && <Text value={keyPropValue} />}
      <View style={{ width: 40, justifyContent: 'center' }}>
        {cca2 === selectedCountry?.cca2 && (
          <Icon color="$color.status.success" icon="checkmark-outline" />
        )}
      </View>
    </View>
  );
}

const ITEM_HEIGHT = 10;

function useCountryItems(params: {
  searchValue?: string;
  selectedCountry?: Country;
  keyProp?: SupportedCountryKeyProp;
}) {
  const { searchValue, selectedCountry, keyProp } = params;
  return React.useMemo(() => {
    const countryItems = filter(take(COUNTRIES, 10), (country) => {
      const { cca2 } = country;
      return (
        !searchValue ||
        (cca2 !== selectedCountry?.cca2 &&
          !CountriesManager.matchSearch({
            keyProp,
            searchValue,
            country,
          }))
      );
    });
    if (selectedCountry) {
      countryItems.unshift(selectedCountry);
    }
    return countryItems;
  }, [searchValue, selectedCountry, keyProp]);
}

export function CountryPicker(props: CountryPickerProps) {
  console.log('COUNTRIES', COUNTRIES);
  const { value, keyProp, onChange, hideFilter, title } = props;
  const country = value ? CountriesManager.getCountryByCca2(value) : undefined;
  const [searchValue, setSearchValue] = React.useState<string | undefined>(
    undefined
  );
  const searchCountry = React.useCallback((inputText: string) => {
    setSearchValue(inputText);
  }, []);
  const countryItems = useCountryItems({
    searchValue,
    selectedCountry: country,
    keyProp,
  });
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {title}
      {!hideFilter && (
        <>
          <View ts={{ padding: '$rem:1' }}>
            <Input
              format={{ type: 'search' }}
              value={searchValue}
              onChange={searchCountry}
            />
          </View>
          <Divider />
        </>
      )}
      <View style={{ flex: 1 }}>
        <FlatList
          ItemSeparatorComponent={() => <Divider />}
          getItemLayout={(_data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          data={countryItems}
          renderItem={({ item }) => (
            <Button
              ts={{ borderRadius: 0 }}
              key={item.countryCode}
              variant="ghost"
              onPress={() => {
                onChange?.(item.countryCode);
              }}
              value={() => (
                <CountryItem
                  keyProp={keyProp}
                  country={item}
                  selectedCountry={country}
                />
              )}
            />
          )}
        />
      </View>
    </View>
  );
}
