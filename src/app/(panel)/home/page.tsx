import { FundoInvestimento } from '@/@Types/fundos';
import { StylesType } from '@/@Types/stylesType';
import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import ComingSoon from '@/components/coming-soon/ComingSoon';
import ClientHeader from '@/components/homeScreen/clientHeader';
import { HighlightFund } from '@/components/homeScreen/highligthFund';
import { TodayMarket } from '@/components/homeScreen/todayMarket';
import { SearchBar } from '@/components/SearchBar/searchBar';
import { StyledText } from '@/components/StyledText';
import { useTheme } from '@/hooks/useTheme';
import { consultarListaFundosAFA } from '@/services/afa-fundos.service';
import { consultarSaldo } from '@/services/fundos.service';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function TelaInicial() {
  const theme = useTheme();
  const styles = getStyles(theme);

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
    },
  ];
  
  const iconsFundoDestaque = [
    { name: 'trophy', color: '#FFAC33' },
    { name: 'chart-line-variant', color: '#00FF6A' },
    { name: 'leaf', color: '#00CC55' },
  ];
  
  const imagesCard = [
    require('../../../../assets/images/home/image-34.png'),
    require('../../../../assets/images/home/banestes-56-anos.png')
  ];
  
  const [fundosEmDestaque, setFundoEmDestaque] = useState<any>();
  const [screenState, setScreenState] = useState(ScreenStates.loading())
  const [saldo, setSaldo]  = useState<number>(0);
  
  useEffect(() => {
    setScreenState(ScreenStates.content())
    const getData = async () =>{
      try{
        const saldo = await consultarSaldo();
        setSaldo(saldo.totalGeral);

        const fundos = await consultarListaFundosAFA();
        setFundoEmDestaque(fundos);
      }catch (error) {
        console.error("Falha ao carregar dados da tela inicial:", error);
        // setScreenState(ScreenStates.error(error)); // <-- Você deve ter um estado de erro
      }
    }
    getData();

  }, []);


  return (
     BaseScreen({
        state: screenState,
        children: (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <ClientHeader
                        userName={"Cliente"}
                        image='https://legacy.reactjs.org/logo-og.png'
                        value={saldo}
                    />
                    <View style={styles.buttonContainer}>
                        <ButtonIcon
                            key={1}
                            route={() =>{/*router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'carteira'}})*/}}
                            text='Minha Carteira'
                            iconName='wallet'
                            IconHeight={30}
                        />
                        <ButtonIcon
                            key={2}
                            route={() => {/*router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'fundos'}})*/}}
                            text='Fundos de Investimento'
                            iconName='inventory'
                            IconHeight={25}
                        />
                        <ButtonIcon
                            key={3}
                            route={() => {/*router.push('/simularInvestimento')*/}}
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
                            onIconPress={() => {/*router.push({pathname:'/pagesWithTabs', params: {defaultTab: 'fundos', filter: searchText}})*/}}
                            transparent
                        />
                    </View>
                    <View>
                        <StyledText style={styles.titleText}>Fundos em Destaque</StyledText>
                        <View style={styles.buttonContainer}>
                            {fundosEmDestaque && fundosEmDestaque.map((fund:FundoInvestimento, index:number) => (
                                <HighlightFund
                                    key={index}
                                    data={fund}
                                    iconName={iconsFundoDestaque[index].name}
                                    color={iconsFundoDestaque[index].color}
                                />
                            ))}
                        </View>
                    </View>
                    <View>
                        <StyledText style={styles.titleText}>Mercado Hoje</StyledText>
                        <View style={styles.buttonContainer}>
                            {marketToday.map((fund, index) => (
                                <TodayMarket key={index} fundoDestaque={fund} />
                            ))}
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {imagesCard.map((image, index) => (
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
                    <View style={{ marginHorizontal: 15, marginTop: 25 }}>
                        <ComingSoon />
                    </View>
                </View>
            </ScrollView>
        )
    })
    );

}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      backgroundColor:theme.background,
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
      marginBottom:12
    },
    line: {
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
  });
};
