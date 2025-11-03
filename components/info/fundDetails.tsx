import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { coinFormat } from '@/utils/coinFormat';
import { convertNumberToTime } from '@/utils/hourFormat';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

interface DetailRowProps {
    label: string;
    value: string;
    valueStyle?: StyleProp<TextStyle>;
}

const DetailRow = ({ label, value, valueStyle }: DetailRowProps) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.detailRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, valueStyle]}>{value}</Text>
        </View>
    );
};

interface FundDetailsProps {
    fund: FundoDetalhe;
}

export function FundDetails({ fund }: FundDetailsProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const details = [
        { label: 'Aplicação Inicial:', value: coinFormat(fund.valorAplicacaoInicial) },
        { label: 'Rentabilidade (12 meses):', value: `${fund.taxaRentabilidade}%`, style: styles.rentabilidade },
        { label: 'Taxa Global:', value: `${fund.taxaAdministracao}% a.a.` },
        { label: 'Hora limite da aplicação:', value: convertNumberToTime(fund.horaLimite) },
        { label: 'Movimentação (aplic/resg):', value: `${coinFormat(fund.valorMinimoAplicacaoInternet)} / ${coinFormat(fund.valorMinimoResgateInternet)}` },
        { label: 'Cotização de resgate:', value: fund.cotizacaoResgate },
        { label: 'Liquidação de resgate:', value: fund.liquidacaoResgate },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{fund.nome}</Text>
            <View style={styles.separator} />
            {details.map((detail) => (
                <DetailRow
                    key={detail.label}
                    label={detail.label}
                    value={detail.value}
                    valueStyle={detail.style}
                />
            ))}
        </View>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        title: {
            fontSize: 28,
            color: theme.text,
            fontFamily: "Roboto",
            marginBottom: 15,
            fontWeight: 'bold'
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        separator: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 15,
            marginTop: 10
        },
        label: {
            fontSize: 15,
            color: theme.text
        },
        value: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text
        },
        rentabilidade: {
            fontSize: 15,
            color: '#4C9AFE',
            fontWeight: 'bold'
        }
    });
};