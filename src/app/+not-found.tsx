import { Styles, StylesType } from '@/src/themes/Colors';
import { Text, useColorScheme, } from 'react-native';


export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const theme:StylesType = colorScheme === 'dark'? Styles.dark:Styles.light;
  return (
    <>
      <Text style={{color: theme.text}}>Page not found</Text>
      <Text style={{color: theme.text}}>Sorry, the page you are looking for does not exist.</Text>
    </>
  );
}
