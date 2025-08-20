import { StylesType } from "../@Types/stylesType";

const tintColor = '#3E75BC'; //cor principal projeto

type ThemeType = {
  light: StylesType;
  dark: StylesType;
};

export const Styles: ThemeType = {
  light: {
    text: '#2A2A2A',
    textSecundary: '#A5A5A5',
    alternativeText: '#2A2A2A',
    whiteText: '#EDEDED',
    darkText: '#343434',
    background: '#FFFFFF',
    backgroundCards: '#EDEDED',
    tint: tintColor,
    alternativeIcon: '#A5A5A5',
    border: '#C9C9C9',
    risk: {
      veryLow: '#55ACE2',
      low: '#49BB4F',
      medium: '#FF9F46',
      high: '#FF4646',
    },
    fontFamily: 'Roboto_400Regular',
  },
  dark: {
    text: '#FFFFFF',
    textSecundary: '#EEEEEE',
    alternativeText: '#D5D5D5',
    whiteText: '#FFFFFF',
    darkText: '#343434',
    background: '#212121',
    backgroundCards: '#2A2A2A',
    tint: tintColor,
    alternativeIcon: '#ABABAB',
    border: '#3C3C3C',
    risk: {
      veryLow: '#55ACE2',
      low: '#49BB4F',
      medium: '#FF9F46',
      high: '#FF4646',
    },
    fontFamily: 'Roboto_400Regular',
  },
};
export { StylesType };

