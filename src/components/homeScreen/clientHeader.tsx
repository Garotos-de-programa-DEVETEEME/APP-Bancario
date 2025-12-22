import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import PatrimonyCard from './patrimonyCard';
import { Href, router } from 'expo-router';
import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';

type ClientHeaderProps = {
  userName: string;
  image: ImageSourcePropType;
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
              onPress={() => router.push("/PerfilCliente/page")}
            >
              <Image source={image} style={styles.image} />
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
      marginLeft:10,
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      marginRight: '5%',
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    textbox: {
      marginLeft: 10,
      gap: 2,
    },
  });
};