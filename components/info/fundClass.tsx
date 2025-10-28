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

    return (
            <View style={styles.container}>
                <TextRow 
                    left={'Classificação de risco'} 
                    right={fund.classificacaoRisco}  
                    bold 
                />
                <TextRow 
                    left={'Classificação CVM'} 
                    right={fund.classificacaoCVM}  
                    bold 
                />
                <TextRow 
                    left={'Subclasse CVM'}
                    right={fund.subclasseCVM}  
                    bold 
                />
                <TextRow 
                    left={'Tipo ANBIMA'} 
                    right={fund.tipoANBIMA}  
                    bold 
                />
            </View>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
        },
    });
};