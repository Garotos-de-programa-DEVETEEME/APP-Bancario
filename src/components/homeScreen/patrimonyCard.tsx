import { useTheme } from '@/src/hooks/useTheme';
import { StylesType } from '@/src/themes/Colors';
import { StyledText } from '../StyledText';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { coinFormat } from '@/src/utils/coinFormat';

type PatrimonyCardProps = {
  value: number;
  cointaned?: boolean;//variavel que quando verdadeira remove as margens
};

export default function PatrimonyCard({
  value,
  cointaned = false,
}: PatrimonyCardProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <View style={cointaned ? styles.contained : styles.container}>
      <View style={styles.div}>
        <View style={styles.left}>
          <StyledText
            style={{ fontWeight: 'bold', color: theme.text, fontSize: 18 }}
          >
            Meu Patrimônio
          </StyledText>
          <StyledText
            style={{
              fontWeight: 400,
              color: theme.textSecundary,
              fontSize: 15,
              marginTop: 4,
            }}
          >
            Saldo líquido
          </StyledText>
          <StyledText
            style={{ fontWeight: 'bold', color: theme.text, fontSize: 15 }}
          >
            {isVisible ? `${coinFormat(value)}` : 'R$ ••••••'}
          </StyledText>
        </View>
        <TouchableOpacity onPress={toggleVisibility} style={styles.visibility}>
          <MaterialCommunityIcons
            name={isVisible ? 'eye' : 'eye-off'}
            color={theme.alternativeIcon}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: 90,
      width: '100%',
      justifyContent: 'center',
      borderRadius: 15,
    },
    contained: {
      backgroundColor: 'transparent',
      height: 90,
      width: '100%',
      justifyContent: 'center',
    },
    div: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    left: {
      marginLeft: 15,
      gap: 2,
    },
    visibility: {
      marginRight: 15,
    },
  });
};
