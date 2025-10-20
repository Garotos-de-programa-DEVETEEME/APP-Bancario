import { StylesType } from '@/src/@Types/stylesType';
import { useFilters } from '@/src/Context/filterContext';
import { useTheme } from '@/src/hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FiltersSelected } from './FiltersSelected';

interface SearchBarProps {
  value: string; //variavel para controle
  onChangeText: (text: string) => void;
  onIconPress?: () => void;
  placeholder?: string;
  filter?: boolean;
  hasFilter?: boolean;
  transparent?: boolean; //se true, o fundo da search bar será transparente
}

export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onIconPress,
  filter = false, //variavel de controle se a filtragem já foi feita
  hasFilter = true,
  transparent = false,
}: SearchBarProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { filters, setFilters } = useFilters();

  return (
    <View
      style={[
        styles.container,
        transparent
          ? {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme.border,
            }
          : {
              backgroundColor: theme.backgroundCards,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
      ]}
    >
      <View style={styles.searchContainer}>
        {filter && filters.length > 0 ? ( //confere se a filtragem foi feita e caso sim se há filtros selecionados
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
        ) : (
          <>
            <Pressable onPress={onIconPress}>
              <MaterialIcons
                name='search'
                style={styles.searchIcon}
                size={24}
              />
            </Pressable>
            <TextInput
              style={styles.searchTextInput}
              placeholder={placeholder}
              placeholderTextColor={theme.alternativeIcon}
              value={value}
              onChangeText={onChangeText}
            />
          </>
        )}
      </View>
      {hasFilter && (
        <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:15 }}>
          {(filter && filters.length > 0) && (//caso a filtragem tenha sido feita adiciona o botão de remover filtros
            <Pressable onPress={() => setFilters([])}>
                <MaterialCommunityIcons name="close-circle-outline" color={theme.border} size={24} />
              </Pressable>
          )}
          <MaterialIcons
            name='filter-list'
            style={styles.filterIcon}
            size={24}
            onPress={() => router.push('/fundosInvestimentos/filter')}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      width: 380,
      height: 38,
      borderRadius: 10,
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      boxSizing: 'border-box',
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
  });
};
