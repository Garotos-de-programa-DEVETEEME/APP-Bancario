import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { StyleSheet, View } from 'react-native';
import { TextRow } from './rowText';

interface FundClassProps {
    fund: FundoDetalhe;
}

export function FundClass({ fund }: FundClassProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const classData = [
        { left: 'Classificação de risco', right: fund.classificacaoRisco },
        { left: 'Classificação CVM', right: fund.classificacaoCVM },
        { left: 'Subclasse CVM', right: fund.subclasseCVM },
        { left: 'Tipo ANBIMA', right: fund.tipoANBIMA },
    ];

    return (
        <View style={styles.container}>
            {classData.map((item) => (
                <TextRow
                    key={item.left}
                    left={item.left}
                    right={item.right}
                    bold
                />
            ))}
        </View>
    );
}

const getStyles = (_: StylesType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
        },
    });
};