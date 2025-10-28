import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { StyleSheet, Text, View } from 'react-native';

const formatCurrency = (value: number) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatHour = (hourNumber: number): string => {
  if (hourNumber == null || isNaN(hourNumber)) {
    return '--:--'; 
  }
  const hourString = String(hourNumber).padStart(4, '0'); 
  const hours = hourString.substring(0, 2);
  const minutes = hourString.substring(2, 4);
  return `${hours}:${minutes}`;
};

interface FundDetailsProps {
    fund: FundoDetalhe;
}

export function FundDetails({fund}: FundDetailsProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
                    <Text style={styles.title}>{fund.nome}</Text>
                    <View style={styles.separator} />
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Aplicação Inicial:</Text>
                        <Text style={styles.value}>
                            {formatCurrency(fund.valorAplicacaoInicial)}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Rentabilidade (12 meses):</Text>
                        <Text style={styles.rentabilidade}>{fund.taxaRentabilidade}%</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Taxa Global:</Text>
                        <Text style={styles.value}>{fund.taxaAdministracao}% a.a.</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Hora limite da aplicação:</Text>
                        <Text style={styles.value}>
                            {formatHour(fund.horaLimite)}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Movimentação (aplic/resg):</Text>
                        <Text style={styles.value}>
                            {`${formatCurrency(fund.valorMinimoAplicacaoInternet)} / ${formatCurrency(fund.valorMinimoResgateInternet)}`}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Cotização de resgate:</Text>
                        <Text style={styles.value}>
                            {fund.cotizacaoResgate}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Liquidação de resgate:</Text>
                        <Text style={styles.value}>
                            {fund.liquidacaoResgate}
                        </Text>
                    </View>
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
            marginBottom: 2,
        },
        separator: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 10,
            marginTop: 10
        },
        label: {
            fontSize: 15, color: theme.text
        },
        value: {
            fontSize: 13, fontWeight: '600', color: theme.text
        },
        rentabilidade: {
            fontSize: 15, color: '#4C9AFE'
        }
    });
};