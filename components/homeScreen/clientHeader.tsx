import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { useAlanaContext, UserProfileType } from '@/src/contexts/alanaContext';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import PatrimonyCard from './patrimonyCard';
import { UserResponse } from '@/services/dadosAvatar.service';

type ClientHeaderProps = {
  userName: string;
  image: string;
  value: number;
  userData?: UserResponse | null;
};

export default function ClientHeader({
  userName,
  image,
  value,
  userData
}: ClientHeaderProps) {
  const theme = useTheme();
  const userProfile = useAlanaContext().userProfile;
  const styles = getStyles(theme, userProfile);
  
  return (
    <View style={styles.outerbox}>
      <View style={styles.header}>
        <Pressable
          onPress={() => }
        >
        <View style={styles.container}>
          <View style={styles.left}>
              <Image source={require('../../assets/images/home/banestes-home.jpg')} alt='foto cliente' style={styles.image} />{/*TODO alterar conforme API*/}
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
              {userProfile === 'Default' && (
                <StyledText style={{ color: theme.whiteText }}>
                  Veja seu perfil
                </StyledText>
              )}
            </View>
          </View>
        </View>
      </Pressable>
      </View>
      <View style={styles.cardcontainer}>
        <PatrimonyCard value={value} />
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
      height: 50,
      width: 50,
      borderRadius: 25,
      marginLeft: '10%',
    },
    textbox: {
      marginLeft: 10,
      gap: 2,
    },
  });
};