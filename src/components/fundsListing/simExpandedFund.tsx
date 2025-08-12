import { fundsType } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { converterNumeroParaHora } from "@/src/utils/hourFormat";
import { StyleSheet, View } from "react-native";
import { NavigationButton } from "../Buttons/navigationButton";
import { StyledText } from "../StyledText";

interface simExpandedProps{
    fund: fundsType;
    expanded:boolean
}

export const SimExpanded = ({fund, expanded}:simExpandedProps) =>{
    const theme = useTheme();
    const styles = getStyles(theme, expanded);

    return (
        <View style={styles.expandedContentContainer}>
            {/* As outras Views com styles.textContainer permanecem iguais */}
            <View style={styles.textContainer}>
                <StyledText style={styles.text}>Taxa global: </StyledText>
                <StyledText style={styles.text}> {`${fund.taxaAdministracao}% a.a.`} </StyledText>
            </View>
            <View style={styles.textContainer}>
                <StyledText style={styles.text}>Hora limite de aplicação: </StyledText>
                <StyledText style={styles.text}> {`${converterNumeroParaHora(fund.horaLimite)}`}</StyledText>
            </View>
            <View style={styles.textContainer}>
                <StyledText style={styles.text}>Movimentação (aplic/resg): </StyledText>
                <StyledText style={styles.text}>  {'R$ 1,00'/*`${coinFormat(fund.movimentation)}`*/}</StyledText>
            </View>
            <View style={styles.textContainer}>
                <StyledText style={styles.text}>Cotização de resgate: </StyledText>
                <StyledText style={styles.text}> {`D+30 (Dias Corridos)`} </StyledText>
            </View>
            <View style={styles.textContainer}>
                <StyledText style={styles.text}>Cotização de resgate: </StyledText>
                <StyledText style={styles.text}> {`D+${fund.prazoConversaoResgate} (Dias Úteis)`} </StyledText>
            </View>
            
            {/* PASSO 2: APLIQUE O NOVO ESTILO AQUI */}
            <View style={styles.buttonContainer}>
                <NavigationButton onPress={() => console.log('temporario')} text={"Simular"}/>
            </View>
        </View>
    );
};

const getStyles = (theme: StylesType, expanded:boolean) =>{
    return StyleSheet.create({
        expandedContentContainer:{
            display: expanded? 'flex':'none',
            flexDirection:'column',
            marginTop: 8, // Adicionei um espaço acima da seção
        },
        text:{
            color:theme.alternativeText,
            fontSize:13,
            fontFamily:theme.fontFamily,
        },
        textContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between' // Este estilo continua o mesmo para os textos
        },
        // PASSO 1: CRIE O NOVO ESTILO PARA O BOTÃO
        buttonContainer: {
            justifyContent: 'center', // Centraliza na horizontal
            alignItems: 'center',     // Centraliza na vertical
            marginTop: 10,            // Adiciona um espaço acima do botão
        }
    });
};