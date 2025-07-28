import { FundsCard } from "@/components/fundoCard";
import { tempFundos } from "@/constants/Types/fundos";
import { View, Text } from "react-native";

export const FundoInvestimento = () => {

    const investmentFunds = tempFundos;

    return(
        <View>
            {investmentFunds.map((fund)=>{
                return(
                    <>
                        <FundsCard fund={fund}/>
                    </>
                );
            })}
        </View>
    );
};