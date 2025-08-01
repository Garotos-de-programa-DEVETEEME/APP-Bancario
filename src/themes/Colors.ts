const tintColor = '#3E75BC';//cor principal projeto

export type stylesType = {
  text: string,
  textSecundary: string,
  alternativeText: string,
  whiteText: string,
  background: string,
  backgroundCards: string,
  tint: string,
  alternativeIcon: string,
  border: string,
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
    alternativeText: '#2A2A2A',
    whiteText:'#EDEDED',
    background: '#FFFFFF',
    backgroundCards: '#EDEDED',
    tint: tintColor,
    alternativeIcon:'#A5A5A5',
    border: '#C9C9C9',
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
    whiteText:'#FFFFFF',
    background: '#212121',
    backgroundCards: '#2A2A2A',
    tint: tintColor,
    alternativeIcon:'#ABABAB',
    border: '#3C3C3C',
    risk: {
      veryLow: '#46FF59',
      low: '#CFFF46',
      medium: '#FF9F46',
      high: '#FF4646',
    },
    fontFamily:'Roboto_400Regular',
  },
};
