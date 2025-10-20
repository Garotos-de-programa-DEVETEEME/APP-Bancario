import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, View } from 'react-native';
import { TextRow } from './rowText';

interface FundClassProps {
    fund: FundoInvestimento;
}

export function FundClass({ fund }: FundClassProps) {//componente de fundo classificação de risco do fundo para tela de investir e saiba mais
    const theme = useTheme();
    const styles = getStyles(theme);

    {/* //TODO: TROCAR PLACEHOLDERS */}
    return (
            <View>
                <TextRow left={'Classificação de risco'} right={'Muito Baixo'}  bold />
                <TextRow left={'Classificação CVM'} right={'Renda Fixa Simples'}  bold />
                <TextRow left={'Subclassse CVM'} right={'Renda Fixa Simples'}  bold />
                <TextRow left={'Tipo ANBIMA'} right={'Renda Fixa Simples'}  bold />
            </View>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        separator: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 10,
            marginTop: 10
        },
        className: {
            fontSize: 16,
            fontWeight: 500,
            color: theme.text,
        },
        classDetail: {
            fontSize: 15,
            fontWeight: 300,
            color: theme.text,
        },
    });
};