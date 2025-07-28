/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColor = '#3E75BC';


export type colorType = {
  text:  string,
    textSecundary:  string,
    alternativeText:  string,
    background:  string,
    backgroundCards:  string,
    tint: string,
    icon:  string,
    alternativeIcon: string,
    risk: {
      veryLow:  string,
      low:  string,
      medium:  string,
      high:  string,
    },
}

export const Colors = {
  light:  {
    text: '#2A2A2A',
    textSecundary: '#A5A5A5',
    alternativeText: '#EDEDED',
    background: '#FFFFFF',
    backgroundCards: '#C9C9C9',
    tint: tintColor,
    icon: '#3E75BC',
    alternativeIcon:'#A5A5A5',
    risk: {
      veryLow: '#46FF59',
      low: '#CFFF46',
      medium: '#FF9F46',
      high: '#FF4646',
    },
  },
  dark: {
    text: '#FFFFFF',
    textSecundary: '#EEEEEE',
    alternativeText: '#D5D5D5',
    background: '#212121',
    backgroundCards: '#2A2A2A',
    tint: tintColor,
    icon: '#3E75BC',
    alternativeIcon:'#A5A5A5',
    risk: {
      veryLow: '#46FF59',
      low: '#CFFF46',
      medium: '#FF9F46',
      high: '#FF4646',
    },
  },
};
