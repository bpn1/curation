import { fade } from 'material-ui/utils/colorManipulator';
import {
  grey600, amber200, amber700, red900, teal800, fullWhite, pinkA200, cyan700, pinkA400, pinkA100, blueA100, blueA400,
  blueA200, grey700, grey900, indigoA400, indigoA200, indigoA100, tealA400, tealA200, tealA100, teal100, teal400,
  teal200
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

const commerzbankYellow = '#FFCC33';

const curationTheme = getMuiTheme({
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
    accent1Color: commerzbankYellow,
    accent2Color: fade(commerzbankYellow, 0.2),
    accent3Color: commerzbankYellow,

    acceptColor: teal800,
    denyColor: red900,

    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  }
});

export default curationTheme;
