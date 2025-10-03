import { useTheme } from '@/src/hooks/useTheme';
import { Image, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyledText } from '../StyledText';
import PatrimonyCard from './patrimonyCard';

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
  const styles = getStyles();

  return (
    <View style={styles.outerbox}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Image src={image} alt='Foto Cliente' style={styles.image} />
            <View style={styles.textbox}>
              <StyledText
                style={{
                  fontWeight: 'bold',
                  color: theme.whiteText,
                }}
              >
                {title}
              </StyledText>
              <StyledText style={{ color: theme.whiteText }}>
                Veja seu perfil
              </StyledText>
            </View>
          </View>
          <View style={styles.right}>
            <MaterialCommunityIcons
              name='bell-outline'
              color='#FFF'
              size={24}
            />
            <MaterialCommunityIcons name='exit-to-app' color='#FFF' size={24} />
          </View>
        </View>
      </View>
      <View style={styles.cardcontainer}>
        <PatrimonyCard value={100} />
      </View>
    </View>
  );
}

const getStyles = () => {
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
      backgroundColor: '#3E75BC',
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
