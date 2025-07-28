import { unsubscribeFromKeyboardEvents } from "react-native-reanimated/lib/typescript/core";

const tintColor = '#3E75BC';//cor principal projeto

export type stylesType = {
  text: string,
    textSecundary: string,
    alternativeText: string,
    background: string,
    backgroundCards: string,
    tint: string,
    icon: string,
    alternativeIcon: string,
    risk: {
      veryLow: string,
      low: string,
      medium: string,
      high: string,
    },
    fontFamily: string,
}

export const Styles = {
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
    fontFamily:'Roboto_400Regular',
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
    fontFamily:'Roboto_400Regular',
  },
};
