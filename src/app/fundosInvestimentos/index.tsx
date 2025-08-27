import { StylesType } from '@/src/@Types/stylesType';
import { FundsCard } from '@/src/components/fundCard/fundCard';
import { SearchBar } from '@/src/components/SearchBar/searchBar';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function FundoInvestimento() {
  const investmentFunds = MOCK_FUNDOS; //TODO : Fetch real data from API or context
  const theme = useTheme();
  const styles = getStyles(theme);

  const [currentExpanded, setCurrentExpanded] = useState(-1); //variavel que controla o fundo expandido com base no seu ID

  const changeCurrentExpanded = (key: number) => {
    //controla qual fundo esta expandido
    if (key === currentExpanded) {
      //caso clique em um fundo já expandido fecha o mesmo
      setCurrentExpanded(-1);
      return;
    }
    setCurrentExpanded(key);
  };

  const [searchBarValue, setSearchBarValue] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Buscar fundo'
        value={searchBarValue}
        onChangeText={(e) => setSearchBarValue(e)}
        filter
      />

      {investmentFunds.map((fund, index) => {
        return (
          <>
            <FundsCard
              fund={fund}
              key={index}
              onPress={() => changeCurrentExpanded(fund.codigo)}
              expanded={currentExpanded === fund.codigo}
            />
          </>
        );
      })}
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: '100%',
      gap: 20,
    },
  });
};
