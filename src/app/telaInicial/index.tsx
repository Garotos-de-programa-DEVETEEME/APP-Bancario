import { ButtonIcon } from '@/src/components/Buttons/ButtonIcon'
import ClientHeader from '@/src/components/homeScreen/clientHeader'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function TelaInicial() {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <ClientHeader
        title='Cliente'
        image='https://legacy.reactjs.org/logo-og.png'
        value={-1}
      />
            <View style={styles.buttonbox}>
                <ButtonIcon
                    key={1}
                    route={()=> router.push('/fundosInvestimentos')}//TODO: criar a funcionalidade
                    text="Minha Carteira"
                    iconName="wallet"
                    IconHeigth={24}
                />
                <ButtonIcon
                    key={2}
                    route={()=> router.push('/fundosInvestimentos')}
                    text="Fundos de Investimento"
                    iconName="inventory"
                    IconHeigth={24}
                />
                <ButtonIcon
                    key={3}
                    route={()=> router.push('/fundosInvestimentos')}//TODO: criar a funcionalidade
                    text="Simular Investimento"
                    iconName="timeline"
                    IconHeigth={24}
                />
            </View>

        </View>
    );
};

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
        },
        buttonbox: {
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',
        }
    });
};
