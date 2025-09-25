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
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function TelaInicial() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const icons = [{name: 'trophy', color:'#FFAC33' }, {name: 'chart-line-variant', color:'#00FF6A' }, {name: 'leaf', color:'#00CC55' }]

  const fundosDestaque = MOCK_FUNDOS;//TODO substituir por fundos em destaque

  const [searchText, setSearchText] = useState(''); 
  const marketToday = [
    {
      nome: 'Dolar',
      porcentagem: -3.4,
      valor: 200,
    },
    {
      nome: 'IBOVESTA',
      porcentagem: 10.3,
      valor: 185.9,
    },
    {
      nome: 'BCRI11',
      porcentagem: -5,
      valor: 10,
    }
  ]

  const images = [require('../../assets/Images/image-34.png'), require('../../assets/Images/banestes-56-anos.png')];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
    >
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
            IconHeight={30}
          />
          <ButtonIcon
            key={2}
            route={() => router.push('/fundosInvestimentos')}
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
          {marketToday.map((fund, index) => (
            <TodayMarket key={index} fundoDestaque={fund}/>
          ))}
        </View>
        <View style={styles.line}></View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {images.map((image, index) => (
            <Image source={image} key={index} style={{borderRadius:16, width:280, height:136, marginLeft:16}}/>
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
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      backgroundColor:theme.background
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
    },
    line:{
      borderBottomColor:theme.border,
      borderBottomWidth:1
    }
  });
};
