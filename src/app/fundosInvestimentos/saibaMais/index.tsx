import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { FundDetails } from '@/src/components/InfoTexts/fundDetails';
import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SaibaMais() {
  const { fundData } = useLocalSearchParams();
  const theme = useTheme();
  const styles = getStyles(theme);

  const fund: FundoInvestimento | null = typeof fundData === 'string' ? JSON.parse(fundData) : null;

  return (
    <>
      {fund ? (
        <>
          <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>

              <FundDetails fund={fund} />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.container}>
          <Text>Erro: Dados do fundo não encontrados.</Text>
        </View>
      )}
    </>
  )
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    scrollView: {
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: 25,
      paddingVertical: 20,
    },
    containerError: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorText: {
      color: theme.text,
      fontSize: 16
    },
    buttonContainer: {
      marginTop: 40,
      paddingBottom: 20,
      alignItems: 'center',
      gap: 4,
    }
  });
};

