import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType as themeType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import { useState } from 'react';
import { NavigationButton } from '../Buttons/navigationButton';
import { coinFormat } from '@/src/utils/coinFormat';
import { converterNumeroParaHora as hourFormater } from '@/src/utils/hourFormat';
import { router } from 'expo-router';

interface FundoInvestidoProps {
  fundoData: FundoInvestimento;
}

export const FundoInvestido = ({ fundoData }: FundoInvestidoProps) => {
  const theme = useTheme();
  const styles = getStyle(theme);
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setExpanded((prev) => !prev)}>
        <View style={styles.titleContainer}>
          <View style={styles.titleContainerText}>
            <StyledText style={styles.subTitle}>
              {'Fundo Simples'}
              {/*TODO alterar para tipo do fundo*/}
            </StyledText>
            <StyledText style={styles.title}>
              {fundoData.nomeReduzido}
            </StyledText>
          </View>
        </View>
        <View style={styles.textContainer}>
          <StyledText style={styles.textContainerTitle}>
            Saldo resgate automático
          </StyledText>
          <StyledText style={styles.textContainerValue}>
            {coinFormat(fundoData.valorMinimoResgatavel)}
          </StyledText>
        </View>
        <View style={[styles.textContainer, { marginTop: 5 }]}>
          <StyledText style={styles.textContainerTitle}>
            Valor mínimo de resgate
          </StyledText>
          <StyledText style={styles.textContainerValue}>
            {coinFormat(fundoData.valorMinimoResgatavel)}
          </StyledText>
        </View>
        <View style={[styles.textContainer, { borderBottomWidth: 0 }]}>
          <StyledText style={styles.textContainerTitle}>
            Horário limite de resgate
          </StyledText>
          <StyledText style={styles.textContainerValue}>
            {hourFormater(fundoData.horaLimite)}
          </StyledText>
        </View>
      </Pressable>
      {expanded && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <NavigationButton
            onPress={() =>
              router.push({
                pathname: 'carteira/resgatar',
                params: {
                  saldo: 10,
                  valorMinimoPermanencia: fundoData.valorAplicacaoInicial,
                  valorMinimoResgate: fundoData.valorMinimoResgateInternet,
                },
              })
            }
            text={'Resgatar'}
          />
        </View>
      )}
    </View>
  );
};

const getStyle = (theme: themeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundCards,
      borderRadius: 15,
      borderColor: theme.border,
      borderWidth: 1,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingLeft: 12,
      paddingVertical: 6,
    },
    titleContainerText: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 500,
    },
    subTitle: {
      color: theme.tint,
      fontSize: 12,
      fontWeight: 500,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 8,
      paddingBottom: 2,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      marginHorizontal: 15,
    },
    textContainerTitle: {
      color: theme.text,
      fontSize: 13,
    },
    textContainerValue: {
      color: theme.text,
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
};
