import { FundosInvestidos } from "@/src/@Types/fundosInvestidos";
import { WalletInfoCard } from "@/src/components/Wallet/carteira";
import { MOCK_FUNDOS } from "@/src/data/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { FormatarFundosInvestimento } from "@/src/utils/fundosInvestimentoFormat";
import { useEffect, useState } from "react";
import { View, StyleSheet, } from "react-native";

export default function WalletPage (){

    const theme = useTheme();
    const styles = getStyles(theme);
    const [fundosInvestidos, setFundosInvestidos] = useState<FundosInvestidos[]>([]);//TODO fazer integração com base em API
    useEffect(()=>{
        const fundosFormatados = FormatarFundosInvestimento(MOCK_FUNDOS)
        setFundosInvestidos(fundosFormatados);
    },[])

  return (
    <View style={styles.container}>
      <View style={styles.cateira}>
        <WalletInfoCard fundosInvestidos={fundosInvestidos} />
      </View>
      <View>
        <View>
          {fundosInvestidos.map((e) => {
            return <>{/*TODO criar componente de fundo investido */}</>;
          })}
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
    },
    cateira: {
      backgroundColor: theme.backgroundCards,
      marginTop: 35,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 15,
    },
    patrimonio: {
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
  });
};
