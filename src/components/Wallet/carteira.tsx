import { View } from "react-native";
import { StyledText } from "../StyledText";
import PatrimonyCard from "../homeScreen/patrimonyCard";
import { fundsType } from "@/src/@Types/fundos";

interface walletInfoCardProps{
    fundosInvestidos: fundsType;

}

export const WalletInfoCard = ({fundosInvestidos, }:walletInfoCardProps) => {
    
    return (
        <View>
            <View>
                <PatrimonyCard value={"1000"} cointaned={true} />
            </View>
            <View>
                <View>
                    <StyledText>
                        valores
                    </StyledText>
                    {/** TODO grafico pizza component*/}
                </View>
                <View>


                </View>
            </View>
                    
        </View>
    )
}