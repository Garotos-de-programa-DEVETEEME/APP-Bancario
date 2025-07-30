import { useTheme } from '@/hooks/useTheme';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type EntrarButtonProps = {
  title: string;
  onPress: () => void;
};

export default function EntrarButton({
  title,
  onPress,
}: EntrarButtonProps) {

  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          shadowColor: theme.text,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: theme.text,
            fontFamily: theme.fontFamily,
          },
        ]}
      >
        Olá,{' '}
        <Text style={{ fontWeight: 'bold', color: 'theme.text' }}>
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
            { backgroundColor: theme.alternativeIcon },
          ]}
        />

        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Text
            style={[
              styles.entrarText,
              {
                color: theme.tint,
                fontFamily: theme.fontFamily,
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
