import { useFilters } from '@/src/Context/filterContext'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { router } from 'expo-router'
import { StyleSheet, TextInput, View, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FiltersSelected } from './FiltersSelected'

interface SearchBarProps {
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  filter?: boolean
}

export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  filter: hasFilter = false,
}: SearchBarProps) => {
  const theme = useTheme()
  const styles = getStyles(theme, hasFilter)
  const { filters } = useFilters()

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {hasFilter && filters.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxWidth: 306, flexGrow: 0 }}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            {filters.map((filter) => (
              <FiltersSelected data={filter} key={filter.id} />
            ))}
          </ScrollView>
        )}
        {(!hasFilter || filters.length < 1) && (
          <>
            <MaterialIcons name='search' style={styles.searchIcon} size={24} />
            <TextInput
              style={styles.searchTextInput}
              placeholder={placeholder}
              placeholderTextColor={theme.alternativeIcon}
              value={filters[0]?.value}
              onChangeText={onChangeText}
            />
          </>
        )}
      </View>
      <MaterialIcons
        name='filter-list'
        style={styles.filterIcon}
        size={24}
        onPress={() => router.push('/fundosInvestimentos/filter')}
      />
    </View>
  )
}

const getStyles = (theme: StylesType, filter: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundCards,
      width: 380,
      height: 38,
      borderRadius: 10,
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      boxSizing: 'border-box',
      marginTop: 24,
    },
    searchContainer: {
      alignSelf: 'center',
      marginLeft: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    searchTextInput: {
      color: theme.alternativeIcon,
      fontFamily: 'Whitney-Regular',
    },
    searchIcon: {
      color: theme.alternativeIcon,
    },
    filterIcon: {
      color: theme.alternativeIcon,
      alignSelf: 'center',
      marginRight: 18,
    },
  })
}
