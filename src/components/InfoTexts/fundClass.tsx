import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from 'react-native';

interface FundClassProps {
    fund: FundoInvestimento;
}

export function FundClass({ fund }: FundClassProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    {/* //TODO: TROCAR PLACEHOLDERS */}
    return (
            <View style={styles.classArea}>
                <View style={styles.separator} />
                <View style={styles.detailRow}>
                    <Text style={styles.className}>Classificação de risco</Text>
                    {/* Esse é PLACEHOLDER */}
                    <Text style={styles.classDetail}>Muito Baixo</Text> 
                </View>
                <View style={styles.separator} />

                <View style={styles.detailRow}>
                    <Text style={styles.className}>Classificação CVM</Text>
                    {/* Esse é PLACEHOLDER */}
                    <Text style={styles.classDetail}>Renda Fixa Simples</Text>
                </View>
                <View style={styles.separator} />

                <View style={styles.detailRow}>
                    <Text style={styles.className}>Subclasse CVM</Text>
                    {/* Esse é PLACEHOLDER */}
                    <Text style={styles.classDetail}>Renda Fixa Simples</Text>
                </View>
                <View style={styles.separator} />

                <View style={styles.detailRow}>
                    <Text style={styles.className}>Tipo ANBIMA</Text>
                    {/* Esse é PLACEHOLDER */}
                    <Text style={styles.classDetail}>Renda Fixa Simples</Text>
                </View>
                <View style={styles.separator} />
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
        classArea: {
            marginTop: 20
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