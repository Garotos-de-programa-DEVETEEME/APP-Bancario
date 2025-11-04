import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import PatrimonyCard from './patrimonyCard';

type ClientHeaderProps = {
  userName: string;
  image: string;
  value: number;
};

export default function ClientHeader({
  userName,
  image,
  value,
}: ClientHeaderProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.outerbox}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Pressable
              onPress={() => {/*TODO criar tela de perfil cliente */} }
            >
              <Image src={image} alt='Foto Cliente' style={styles.image} />
            </Pressable>
            <View style={styles.textbox}>
              <StyledText
                style={{
                  fontWeight: 'bold',
                  color: theme.whiteText,
                  maxWidth:230,
                }}
              >
                {userName}
              </StyledText>
              <StyledText style={{ color: theme.whiteText }}>
                Veja seu perfil
              </StyledText>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardcontainer}>
        <PatrimonyCard value={value} />
      </View>
    </View>
  );
}

const getStyles = (theme:StylesType) => {
  const headerHeight = 138;
  const cardHeight = 80;

  return StyleSheet.create({
    outerbox: {
      alignItems: 'center',
      height: headerHeight + cardHeight - 40,
    },
    cardcontainer: {
      position: 'absolute',
      top: headerHeight - cardHeight / 2,
      width: '90%',
      alignItems: 'center',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 8,
    },
    header: {
      backgroundColor: theme.tint,
      width: '100%',
      height: 125,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      justifyContent: 'center',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      marginRight: '5%',
    },
    image: {
      height: 40,
      width: 40,
      borderRadius: 25,
      marginLeft: '10%',
    },
    textbox: {
      marginLeft: 10,
      gap: 2,
    },
  });
};