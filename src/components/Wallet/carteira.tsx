import { StyleSheet, View } from "react-native";
import { StyledText } from "../StyledText";
import PatrimonyCard from "../homeScreen/patrimonyCard";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/@Types/stylesType";
import { fundsColor } from "@/src/themes/fundosInvestdos";
import { FundoInvestimento } from "@/src/@Types/fundos";

interface walletInfoCardProps{
    fundosInvestidos: any[];
}

export const WalletInfoCard = ({ fundosInvestidos }: walletInfoCardProps) => {
  //componente de patrimonio dentro de carteira de investimentos
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <View>
          <View style={{borderBottomWidth:1, borderBottomColor: theme.border}}>
              <PatrimonyCard value={100} cointaned={true} />
          </View>
          <View>
              <View >
                  <StyledText>
                      valores
                  </StyledText>
                  {/*TODO grafico pizza component*/}
              </View>
              <View>
                  {fundosInvestidos.map((fundo:FundoInvestimento, index)=>{
                      const cor:string | undefined = fundsColor.find((i)=> i.nome === fundo.nome)?.cor;
                      return(
                          <View
                              key={index}
                              style={[styles.fundoInfo, index !== fundosInvestidos.length - 1 && styles.border,]}
                          >
                              <StyledText style={{backgroundColor: cor, width:18, height: 18, borderRadius: 18/2 }}></StyledText>
                              <StyledText style={styles.fundoTexto}> {fundo.nome} </StyledText> {/*não adiciona borda inferior caso seja o ultimo elemento */}
                          </View>
                      )
                  })}
              </View>
          </View>    
      </View>
    </View>
);
};

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    fundoInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'center',
      width: 312,
      paddingBottom: 8,
      marginTop: 10,
      gap: 9,
    },
    border: {
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    fundoTexto: {
      fontSize: 12,
      color: theme.text,
    },
  });
};
