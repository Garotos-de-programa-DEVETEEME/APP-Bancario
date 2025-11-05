import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { FundsCard } from '@/components/fundo/fundCard';
import { SearchBar } from '@/components/SearchBar/searchBar';
import { useFundos } from '@/hooks/useFundos';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FundosInvestimento() {
  const [screenState, setScreenState] = useState(ScreenStates.loading());
  const theme = useTheme();
  
  const { fundos, isLoading, error } = useFundos(); 
  
  const [currentExpanded, setCurrentExpanded] = useState(-1);
  const [searchText, setSearchText] = useState('');

  const changeCurrentExpanded = useCallback((key: number) => {
    setCurrentExpanded(current => (current === key ? -1 : key));
  }, []);

  useEffect(() => {
    if (isLoading) {
      setScreenState(ScreenStates.loading());
    } else if (error) {
      setScreenState(ScreenStates.error(error));
    } else {
      setScreenState(ScreenStates.content());
    }
  }, [isLoading, error]);

  const filteredFundos = useMemo(() => {
    if (!searchText) {
      return fundos;
    }
    return fundos.filter((fund: FundoDetalhe) =>
      fund.nome.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [fundos, searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <BaseScreen state={screenState}>
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
        <View style={styles.searchBarContainer}>
          <SearchBar 
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Buscar fundos por nome..."
            hasFilter={false}
          />
        </View>
          <View style={styles.listContainer}>
            <Text
              style={[styles.title, { color: theme.darkText || theme.text }]}
            >
              Fundos Disponíveis
            </Text>

            <View style={styles.cardList}>
              {filteredFundos.map((fund: FundoDetalhe) => (
                <FundsCard
                  fund={fund}
                  key={fund.codigoFundo}
                  onPress={() => changeCurrentExpanded(fund.codigoFundo)}
                  expanded={currentExpanded === fund.codigoFundo}
                  expandedType="default" 
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  searchBarContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40, 
  },
  listContainer: {
    width: '90%', 
    maxWidth: 380,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
  },
  cardList: {
    gap: 20,
    width: '100%', 
  },
});