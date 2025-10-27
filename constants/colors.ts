import { StylesType } from '@/@Types/stylesType'

export default {
    zinc: '#0c0c1b',
    black: '#000',
    white: '#fff',
    green: '#99cf1d',
    gray: '#dddddd',
}

const tintColorAsset = '#3E75BC' //cor principal projeto

type ThemeType = {
    light: StylesType
    dark: StylesType
}

export const StylesAsset: ThemeType = {
    light: {
        text: '#2A2A2A',
        textSecundary: '#A5A5A5',
        alternativeText: '#2A2A2A',
        whiteText: '#EDEDED',
        darkText: '#343434',
        background: '#FFFFFF',
        backgroundCards: '#EDEDED',
        tint: tintColorAsset,
        alternativeIcon: '#A5A5A5',
        border: '#C9C9C9',
        disabledButton: '#9BD1FF',
    },
    dark: {
        text: '#FFFFFF',
        textSecundary: '#EEEEEE',
        alternativeText: '#D5D5D5',
        whiteText: '#FFFFFF',
        darkText: '#343434',
        background: '#212121',
        backgroundCards: '#2A2A2A',
        tint: tintColorAsset,
        alternativeIcon: '#ABABAB',
        border: '#3C3C3C',
        disabledButton: '#9BD1FF',
    },
}

const tintColorAlana = '#E8E6FF'; //cor principal projeto


export const StylesAlana: StylesType = {
  text: '#003366',
  textSecundary: '#6200EA',
  alternativeText: '#2A2A2A',
  whiteText: '#EDEDED',
  darkText: '#343434',
  background: '#FFFFFF',
  backgroundCards: '#E8E6FF',
  tint: tintColorAlana,
  alternativeIcon: '#A5A5A5',
  border: '#C9C9C9',
  disabledButton: '#9BD1FF',
};