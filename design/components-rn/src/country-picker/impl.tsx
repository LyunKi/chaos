import { FlatList, StyleSheet } from 'react-native';
import filter from 'lodash-es/filter';
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
import { CountryItemProps, CountryPickerProps } from './api';
import { ThemeManager } from '../common';

const CountryItem = React.memo(
  (props: CountryItemProps) => {
    const {
      country,
      selectedCountry,
      keyProp = 'callingCode',
      onChange,
    } = props;
    const { cca2 } = country;
    const keyPropValue = CountriesManager.getKeyPropValue(country, keyProp);
    const showName = CountriesManager.getShowName(country, selectedCountry);
    return (
      <Button
        ts={{ borderRadius: 0 }}
        variant="ghost"
        onPress={() => {
          onChange?.(country.cca2);
        }}
        value={() => (
          <View
            ts={{
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text value={CountriesManager.getFlagEmoji(country)} />
            <Text
              ts={{ marginHorizontal: '$rem:0.5', flex: 1 }}
              value={showName}
              numberOfLines={1}
            />
            <Text value={keyPropValue ?? ''} />
            <View style={{ width: 40, justifyContent: 'center' }}>
              {cca2 === selectedCountry?.cca2 && (
                <Icon color="$color.brand.default" icon="check" />
              )}
            </View>
          </View>
        )}
      />
    );
  },
  (prev, next) => {
    return (
      prev.country.cca2 === next.country.cca2 &&
      prev.onChange === next.onChange &&
      prev.selectedCountry?.cca2 === next.selectedCountry?.cca2 &&
      prev.keyProp === next.keyProp
    );
  }
);

function useCountryItems(params: {
  searchValue?: string;
  selectedCountry?: Country;
  keyProp?: SupportedCountryKeyProp;
}) {
  const { searchValue, selectedCountry, keyProp } = params;
  return React.useMemo(() => {
    const countryItems = filter(COUNTRIES, (country) => {
      const { cca2 } = country;
      return (
        cca2 !== selectedCountry?.cca2 &&
        (!searchValue ||
          CountriesManager.matchSearch({
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
  const { style, ts, testID, value, keyProp, onChange, hideFilter, title } =
    props;
  const country = value ? CountriesManager.getCountryByCca2(value) : undefined;
  const [searchValue, setSearchValue] = React.useState<string>('');
  const searchCountry = React.useCallback((inputText: string) => {
    setSearchValue(inputText);
  }, []);
  const countryItems = useCountryItems({
    searchValue,
    selectedCountry: country,
    keyProp,
  });
  const itemHeight = ThemeManager.themedValue('$size.10') + 1;
  return (
    <View
      ts={ts}
      style={StyleSheet.flatten([{ flex: 1, flexDirection: 'column' }, style])}
      testID={testID}
    >
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
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          data={countryItems}
          renderItem={({ item }) => (
            <CountryItem
              key={item.cca2}
              keyProp={keyProp}
              country={item}
              selectedCountry={country}
              onChange={onChange}
            />
          )}
        />
      </View>
    </View>
  );
}
