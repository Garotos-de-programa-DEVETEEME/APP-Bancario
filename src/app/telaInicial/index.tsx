import { StylesType } from '@/src/@Types/stylesType';
import { ButtonIcon } from '@/src/components/Buttons/ButtonIcon';
import ClientHeader from '@/src/components/homeScreen/clientHeader';
import { HighlightFund } from '@/src/components/homeScreen/highligthFund';
import { TodayMarket } from '@/src/components/homeScreen/todayMarket';
import { SearchBar } from '@/src/components/SearchBar/searchBar';
import { StyledText } from '@/src/components/StyledText';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { iconsFundoDestaque } from '@/src/data/fundosDestaqueIcon';
import { marketTodayData } from '@/src/data/MarketToday';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function TelaInicial() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const icons = iconsFundoDestaque;

  const fundosDestaque = MOCK_FUNDOS.listaFundos.filter(fundo => fundo.codigoFundo <= 3); //Pega os três primeiros fundos
  let pratrimonio = 0;
  fundosDestaque.map(fundo => pratrimonio += fundo.valorSaldoResgatavelCliente)
  const [searchText, setSearchText] = useState('');
  const marketToday = marketTodayData;

  const images = [
    require('../../assets/Images/image-34.png'),
    require('../../assets/Images/banestes-56-anos.png'),
  ];

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <ClientHeader
          userName='Cliente'
          image={require('../../assets/Images/banestes-home.jpg')}
          value={pratrimonio}
        />
        <View style={styles.buttonContainer}>
          <ButtonIcon
            key={1}
            route={() => router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'carteira'}})}
            text='Minha Carteira'
            iconName='wallet'
            IconHeight={30}
          />
          <ButtonIcon
            key={2}
            route={() => router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'fundos'}})}
            text='Fundos de Investimento'
            iconName='inventory'
            IconHeight={25}
          />
          <ButtonIcon
            key={3}
            route={() => router.push('/simularInvestimento')}
            text='Simular Investimento'
            iconName='timeline'
            IconHeight={25}
          />
        </View>
        <View style={{width:'90%', alignSelf:'center'}}>
          <SearchBar
            value={searchText}
            onChangeText={(e) => setSearchText(e)}
            placeholder='Buscar fundos por nome ou categoria'
            hasFilter={false}
            onIconPress={() => router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'fundos', filter: searchText}})}
            transparent
          />
        </View>

        <StyledText style={styles.titleText}>Fundos em Destaque</StyledText>
        <View style={styles.buttonContainer}>
          {fundosDestaque.map((fund, index) => (
            <HighlightFund
              key={index}
              data={fund}
              iconName={icons[index % icons.length]}
            />
          ))}
        </View>
        <StyledText style={styles.titleText}>Mercado Hoje</StyledText>
        <View style={styles.buttonContainer}>
          {marketToday.map((fund, index) => (
            <TodayMarket key={index} fundoDestaque={fund} />
          ))}
        </View>
        <View style={styles.line}></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <Image
              source={image}
              key={index}
              style={{
                borderRadius: 16,
                width: 280,
                height: 136,
                marginLeft: 16,
              }}
            />
          ))}
        </ScrollView>
        <View style={styles.line}></View>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      gap: 24,
      backgroundColor: theme.background,
      height:'100%'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:'100%',
      alignSelf:'center',
      paddingHorizontal:10,
    },
    titleText: {
      fontSize: 20,
      color: theme.text,
      marginLeft: 24,
    },
    line: {
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
  });
};
