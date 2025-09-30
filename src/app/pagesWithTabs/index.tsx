import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import FundoInvestimento  from "../fundosInvestimentos";
import HeaderTabs from "@/src/components/customHeader/HeaderTabs";
import WalletPage from "../carteira";

export default function PageWithTabs(){
    const { defaultTab } = useLocalSearchParams();
    const [currentTab, setCurrentTab] = useState<string>('');

    useEffect(()=>{
        setCurrentTab(typeof defaultTab === 'string'? defaultTab:'')
    },[defaultTab])
    return(
        <>
            <HeaderTabs activeTab={currentTab} setActiveTab={(e) => setCurrentTab(e)} />
            {currentTab === 'fundos' && (
                <FundoInvestimento/>
            )}
            {currentTab === 'carteira' &&
                <WalletPage/>
            }

        </>
    );
}