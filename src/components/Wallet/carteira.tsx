import { StyleSheet, View } from "react-native";
import { StyledText } from "../StyledText";
import PatrimonyCard from "../homeScreen/patrimonyCard";
import { useTheme } from "@/src/hooks/useTheme";

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
          <View>
              <PatrimonyCard value={100} cointaned={true} />
          </View>
          <View>
              <View>
                  <StyledText>
                      valores
                  </StyledText>
                  {/** TODO grafico pizza component*/}
              </View>
              <View style={{}}>
                  {fundosInvestidos.map((e, index)=>{
                      return(
                          <View
                              key={index}
                              style={styles.fundoInfo}
                          >
                              <StyledText style={{backgroundColor: e.cor, width:18, height: 18, borderRadius: 18/2 }}></StyledText>
                              <StyledText style={styles.fundoTexto}> {e.nomeFundo} </StyledText>
                          </View>
                      )
                  })}
              </View>
          </View>
                  
      </View>
      <View style={{}}>
        {fundosInvestidos.map((e, index) => {
          return (
            <View key={index} style={styles.fundoInfo}>
              <StyledText
                style={{
                  backgroundColor: e.cor,
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                }}
              ></StyledText>
              <StyledText style={styles.fundoTexto}>{e.nomeFundo}</StyledText>
            </View>
          );
        })}
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
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingBottom: 8,
      marginTop: 10,
      gap: 9,
    },
    fundoTexto: {
      fontSize: 12,
      color: theme.text,
    },
  });
};
