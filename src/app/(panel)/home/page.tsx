import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import CardButton from "@/components/buttons/CardButton";
import ComingSoon from "@/components/coming-soon/ComingSoon";
import FundHighlightCard from "@/components/fundo/FundHighlightCard";
import Header from '@/components/home/Header';
import PatrimonyCard from "@/components/home/PatrimonyCard";
import SearchBar from "@/components/search/SearchBar";
import { navigateToSimulacaoLista } from '@/utils/navigation.utils';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const [screenState, setScreenState] = useState(ScreenStates.loading())
    
    useEffect(() => {
        setScreenState(ScreenStates.content())
    }, []);

    const handleSearch = (text: string) => {
        Alert.alert('Busca realizada', `Você buscou por: ${text}`);
        console.log('Texto de busca:', text);
    };

    return ( 
        BaseScreen({
            state: screenState,
            children: (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <Header />
                    <PatrimonyCard />

                    <View style={styles.buttonsContainer}>
                        <CardButton
                            iconName="wallet"
                            text="Minha Carteira"
                            onPress={() => console.log('Botão Minha Carteira pressionado')}
                        />
                        <CardButton
                            iconName="folder1"
                            text="Fundos de Investimento"
                            onPress={() => console.log('Botão Fundos de Investimento pressionado')}
                        />
                        <CardButton
                            iconName="line-chart"
                            text="Simular Investimento"
                            onPress={navigateToSimulacaoLista} 
                        />
                    </View>

                    <SearchBar onSearch={handleSearch}/>

                    <View style={styles.highlightSection}>
                        <Text style={styles.highlightTitle}>Fundos em Destaque</Text>
                        <View style={styles.cardsContainer}>
                            <FundHighlightCard
                                iconName="trophy"
                                title="Banestes VIP DI FIC de FI"
                                percentage="+76,38 %"
                                color="#007aff"
                            />
                            <FundHighlightCard
                                iconName="line-chart"
                                title="Banestes Invest Money FI Renda Fixa"
                                percentage="+13,50 %"
                                color="#00C853" // Exemplo de cor verde
                            />
                            <FundHighlightCard
                                iconName="leaf-circle"
                                title="Banestes Reserva Climática"
                                percentage="+9,00 %"
                                color="#007aff"
                            />
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 15, marginTop: 25 }}>
                        <ComingSoon />
                    </View>
                </SafeAreaView>
            </View>)
        })
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    safeArea: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginHorizontal: 15,
    },
    highlightSection: {
        marginTop: 25,
        marginHorizontal: 15,
    },
    highlightTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
