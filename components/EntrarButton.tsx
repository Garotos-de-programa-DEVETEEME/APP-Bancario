import { Styles, stylesType } from '@/constants/Colors';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type EntrarButtonProps = {
  theme?: 'light' | 'dark';
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function EntrarButton({
  theme = 'light',
  title,
  onPress,
}: EntrarButtonProps) {
  const current: stylesType = Styles[theme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: current.background,
          shadowColor: current.text,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: current.text,
            fontFamily: current.fontFamily,
          },
        ]}
      >
        Olá,{' '}
        <Text style={{ fontWeight: 'bold', color: 'current.text' }}>
          {title}
        </Text>
      </Text>

      <View
        style={[
          styles.dividerbox,
        ]} >

        <View
          style={[
            styles.divider,
            { backgroundColor: current.alternativeIcon },
          ]}
        />

        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Text
            style={[
              styles.entrarText,
              {
                color: current.tint,
                fontFamily: current.fontFamily,
              },
            ]}
          >
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: 251,
    height: 53,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between'

  },
  text: {
    fontSize: 16,
  },
  entrarText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 2,
    height: 26,
    marginHorizontal: 12,
  },
  dividerbox: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

/* const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 500,
    margin: 50,
  },
  text: {
    fontSize: 16,
  },
  entrarText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 20,
    marginHorizontal: 12,
  },
}); */
