/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Styles } from '@/src/themes/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Styles.light & keyof typeof Styles.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Styles[theme][colorName];
  }
}
