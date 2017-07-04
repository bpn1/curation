import { fade, darken } from 'material-ui/utils/colorManipulator';
import {
  fullWhite, red600, green600, grey600, orange600, cyan500, cyan700, grey400, pinkA200, grey100, grey500, darkBlack,
  white, grey300, fullBlack, cyan600, teal600, yellow500, green500, yellow600, yellow700, teal500, lightBlue500, grey50
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

export const commerzbankYellow = '#FFCC33';

const highlightFade = 0.6;

export const curationDarkTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  appBar: {
    height: 84
  },
  palette: {
    primary1Color: commerzbankYellow,
    primary2Color: commerzbankYellow,
    primary3Color: grey600,
    accent1Color: fade(commerzbankYellow, 0.7),
    accent2Color: fade(commerzbankYellow, 0.2),
    accent3Color: commerzbankYellow,

    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.6),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
    shadowColor: fullBlack,

    selectedListItemColor: fade(fullWhite, 0.2),

    positiveColor1: green600,
    positiveColor2: fade(green600, highlightFade),
    negativeColor1: red600,
    negativeColor2: fade(red600, highlightFade),
    semiNegativeColor1: orange600,
    semiNegativeColor2: fade(orange600, highlightFade),
    neutralColor1: grey600,
    neutralColor2: fade(grey600, highlightFade),
    interactiveColor1: commerzbankYellow,
    interactiveColor2: fade(commerzbankYellow, highlightFade)
  }
});

export const curationLightTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  appBar: {
    height: 84
  },
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue500,
    primary3Color: grey400,
    accent1Color: lightBlue500,
    accent2Color: fade(lightBlue500, 0.2),
    accent3Color: lightBlue500,

    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.5),
    alternateTextColor: fullWhite,
    canvasColor: fullWhite,
    backgroundColor: darken(grey100, 0.01),
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,

    selectedListItemColor: fade(lightBlue500, 0.6),

    positiveColor1: green600,
    positiveColor2: fade(green600, highlightFade),
    negativeColor1: red600,
    negativeColor2: fade(red600, highlightFade),
    semiNegativeColor1: orange600,
    semiNegativeColor2: fade(orange600, highlightFade),
    neutralColor1: grey600,
    neutralColor2: fade(grey600, highlightFade),
    interactiveColor1: yellow700,
    interactiveColor2: fade(yellow700, highlightFade),
    secondInteractiveColor1: teal600,
    secondInteractiveColor2: fade(teal600, highlightFade),
  }
});

export default curationLightTheme;
