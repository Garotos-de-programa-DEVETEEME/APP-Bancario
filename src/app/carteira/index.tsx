import { StylesType } from '@/src/@Types/stylesType';
import { WalletInfoCard } from '@/src/components/Wallet/carteira';
import { FundoInvestido } from '@/src/components/Wallet/fundoInvestido';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function WalletPage() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [fundosInvestidos, setFundosInvestidos] = useState<any[]>([]); //TODO fazer integração com base em API
  useEffect(() => {
    setFundosInvestidos(MOCK_FUNDOS);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cateira}>
        <WalletInfoCard fundosInvestidos={fundosInvestidos} />
      </View>
      <View>
        <View style={styles.fundosInvestidos}>
          {fundosInvestidos.map((e, index) => {
            return (
              <>
                <FundoInvestido key={index} fundoData={e} />
              </>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    },
    cateira: {
      backgroundColor: theme.backgroundCards,
      marginTop: 35,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 15,
      marginBottom:12
    },
    patrimonio: {
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    fundosInvestidos: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 15,
      paddingTop: 56,
      paddingBottom: 15,
      paddingHorizontal: 15,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width:'90%',
      alignSelf:'center'
    },
  });
};
