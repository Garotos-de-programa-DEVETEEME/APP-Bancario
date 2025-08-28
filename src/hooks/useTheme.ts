import { useColorScheme } from 'react-native';
import { Styles } from '../themes/Colors';
import { StylesType } from '../@Types/stylesType';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme: StylesType = colorScheme === 'dark' ? Styles.dark : Styles.light;
  return theme;
};
