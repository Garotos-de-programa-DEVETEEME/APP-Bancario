import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { converterNumeroParaHora } from '@/src/utils/hourFormat';
import { StyleSheet, View } from 'react-native';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';
import { StylesType } from '@/src/@Types/stylesType';

interface expandedProps {
  fund: FundoInvestimento;
  expanded: boolean;
  type?: 'default' | 'simular';
  onSimulate: () => void;
}

export const Expanded = ({
  fund,
  expanded,
  type,
  onSimulate,
}: expandedProps) => {
  //componente de fundo de investimento expandido
  const theme = useTheme();
  const styles = getStyles(theme, expanded);

  return (
    <View style={styles.expandedContentContainer}>
      <View style={styles.textContainer}>
        <StyledText style={styles.text}>Taxa global: </StyledText>
        <StyledText style={styles.text}>
          {' '}
          {`${fund.taxaAdministracao}% a.a.`}{' '}
        </StyledText>
      </View>
      <View style={styles.textContainer}>
        <StyledText style={styles.text}>Hora limite de aplicação: </StyledText>
        <StyledText style={styles.text}>
          {' '}
          {`${converterNumeroParaHora(fund.horaLimite)}`}
        </StyledText>
      </View>
      <View style={styles.textContainer}>
        <StyledText style={styles.text}>Movimentação (aplic/resg): </StyledText>
        <StyledText style={styles.text}>
          {' '}
          {'R$ 1,00' /*`${coinFormat(fund.movimentation)}`*/}
        </StyledText>
        {/*adicionar movimentação */}
      </View>
      <View style={styles.textContainer}>
        <StyledText style={styles.text}>Cotização de resgate: </StyledText>
        <StyledText style={styles.text}> {`D+30 (Dias Corridos)`} </StyledText>
      </View>
      <View style={styles.textContainer}>
        <StyledText style={styles.text}>Cotização de resgate: </StyledText>
        <StyledText style={styles.text}>
          {' '}
          {`D+${fund.prazoConversaoResgate} (Dias Úteis)`}{' '}
        </StyledText>
      </View>

      {type === 'simular' ? (
        <View style={styles.buttonContainer}>
          <NavigationButton onPress={onSimulate} text={'Simular'} />
        </View>
      ) : (
        <View style={styles.textContainer}>
          <NavigationButton
            onPress={() => console.log('Saiba mais')}
            text={'Saiba Mais'}
            transparentStyle
          />
          <NavigationButton
            onPress={() => console.log('Investir')}
            text={'Investir'}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (theme: StylesType, expanded: boolean) => {
  return StyleSheet.create({
    expandedContentContainer: {
      display: expanded ? 'flex' : 'none',
      flexDirection: 'column',
    },
    text: {
      color: theme.alternativeText,
      fontSize: 13,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  });
};
