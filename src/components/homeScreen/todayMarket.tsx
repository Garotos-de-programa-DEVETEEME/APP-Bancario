import { useTheme } from "@/src/hooks/useTheme";
import { View } from "react-native";
import { StyledText } from "../StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { coinFormat } from "@/src/utils/coinFormat";

interface TodayMarketProps{
    fundoDestaque: {
        nome: string,
        porcentagem: number,
        valor: number,
    };
}

export const TodayMarket = ({fundoDestaque}:TodayMarketProps) =>{
    const theme = useTheme();

    return(
        <View style={{width:116, height:72, borderRadius:16}}>
            <View style={{backgroundColor:theme.background, borderTopEndRadius:16, borderTopLeftRadius:16, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', height:30}}>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <StyledText style={{fontSize:12}}>{fundoDestaque.nome}</StyledText>
                    {fundoDestaque.porcentagem > 0? 
                        <MaterialCommunityIcons name="arrow-top-right" color='#00C86B' />:
                        <MaterialCommunityIcons name="arrow-bottom-right" color='#FF5154'/>
                    }
                </View>
                <StyledText style={{color:fundoDestaque.porcentagem > 0? '#00C86B':'#FF5154'}} > {`${fundoDestaque.porcentagem}%`} </StyledText>
            </View>
            <View style={{backgroundColor:theme.tint, height:42, borderBottomEndRadius:16, borderBottomLeftRadius:16, justifyContent:'center',}}>
                    <StyledText style={{color:theme.background, fontSize:16, paddingLeft:8}}>{coinFormat(fundoDestaque.valor)}</StyledText>
            </View>
        </View>
    );
}