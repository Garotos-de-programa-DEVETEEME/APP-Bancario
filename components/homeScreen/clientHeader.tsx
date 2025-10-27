import { useTheme } from '@/hooks/useTheme';
import { useAlanaContext, UserProfileType } from '@/src/contexts/alanaContext';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import PatrimonyCard from './patrimonyCard';
import { StylesType } from '@/@Types/stylesType';

type ClientHeaderProps = {
  title: string;
  image: string;
  value: number;
};

export default function ClientHeader({
  title,
  image,
  value,
}: ClientHeaderProps) {
  const theme = useTheme();
  const userProfile = useAlanaContext().userProfile;
  const styles = getStyles(theme, userProfile);
  
  return (
    <View style={styles.outerbox}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Pressable
              onPress={() => router.push({pathname:'(panel)/PerfilCliente/page', params:{clientImage:image}})}
            >
              <Image src={image} alt='Foto Cliente' style={styles.image} />
            </Pressable>
            <View style={styles.textbox}>
              <StyledText
                style={{
                  fontWeight: 'bold',
                  color: theme.whiteText,
                }}
              >
                {title}
              </StyledText>
              {userProfile === 'Default' && (
                <StyledText style={{ color: theme.whiteText }}>
                  Veja seu perfil
                </StyledText>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardcontainer}>
        <PatrimonyCard value={100} />
      </View>
    </View>
  );
}

const getStyles = (theme:StylesType, userProfile:UserProfileType) => {
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
      backgroundColor: userProfile === "Default"? theme.tint:theme.textSecundary,
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