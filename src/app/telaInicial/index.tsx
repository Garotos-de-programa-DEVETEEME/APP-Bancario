import { StylesType } from '@/src/@Types/stylesType';
import { ButtonIcon } from '@/src/components/Buttons/ButtonIcon';
import ClientHeader from '@/src/components/homeScreen/clientHeader';
import { HighlightFund } from '@/src/components/homeScreen/highligthFund';
import { TodayMarket } from '@/src/components/homeScreen/todayMarket';
import { SearchBar } from '@/src/components/SearchBar/searchBar';
import { StyledText } from '@/src/components/StyledText';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TelaInicial() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const icons = [{name: 'trophy', color:'#FFAC33' }, {name: 'chart-line-variant', color:'#00FF6A' }, {name: 'leaf', color:'#00CC55' }]

  const fundosDestaque = MOCK_FUNDOS;//TODO substituir por fundos em destaque

  const [searchText, setSearchText] = useState(''); 
  const marketToday = {
    nome: 'Dolar',
    porcentagem: -3.4,
    valor: 200,
  }

  return (
    <View style={styles.container}>
      <ClientHeader
        title='Cliente'
        image='https://legacy.reactjs.org/logo-og.png'
        value={-1}
      />
      <View style={styles.buttonContainer}>
        <ButtonIcon
          key={1}
          route={() => router.push('/carteira')}
          text='Minha Carteira'
          iconName='wallet'
          IconHeigth={24}
        />
        <ButtonIcon
          key={2}
          route={() => router.push('/fundosInvestimentos')}
          text='Fundos de Investimento'
          iconName='inventory'
          IconHeigth={24}
        />
        <ButtonIcon
          key={3}
          route={() => router.push('/simularInvestimento')}
          text='Simular Investimento'
          iconName='timeline'
          IconHeigth={24}
        />
      </View>
      <View>
        <SearchBar value={searchText} onChangeText={setSearchText} placeholder='Buscar fundos por nome ou categoria' hasFilter={false} />
      </View>

      <StyledText style={styles.titleText}>Fundos em Destaque</StyledText>
      <View style={styles.buttonContainer}>
        {fundosDestaque.map((fund, index) => (
          <HighlightFund key={index} data={fund} iconName={icons[index % icons.length]} />
        ))}
      </View>
      <StyledText style={styles.titleText}>Mercado Hoje</StyledText>
      <View style={styles.buttonContainer}>
        {fundosDestaque.map((fund, index) => (
          <TodayMarket key={index} fundoDestaque={marketToday}/>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: '100%',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    titleText:{
      fontSize: 20,
      color: theme.text,
      marginLeft: 8,
    }
  });
};
