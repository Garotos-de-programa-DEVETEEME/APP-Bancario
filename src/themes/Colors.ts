const tintColor = '#3E75BC' //cor principal projeto

export type StylesType = {
  text: string
  textSecundary: string
  alternativeText: string
  whiteText: string
  darkText: string
  background: string
  backgroundCards: string
  tint: string
  alternativeIcon: string
  border: string
}

type ThemeType =  {
  light: StylesType,
  dark: StylesType,
}

export const Styles:ThemeType = {
  light:  {
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
  },
}
