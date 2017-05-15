import { fade } from 'material-ui/utils/colorManipulator';
import {
  red900, teal800, fullWhite, red600, red400, green600, green400, grey600, grey400
} from 'material-ui/styles/colors';

import {

} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

export const commerzbankYellow = '#FFCC33';

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

    // TODO remove these or adapt them to positive & negative color (see below)?
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

    positiveColor1: green600,
    positiveColor2: green400,
    negativeColor1: red600,
    negativeColor2: red400,
    neutralColor1: grey600,
    neutralColor2: grey400,
    interactiveColor1: commerzbankYellow,
    interactiveColor2: fade(commerzbankYellow, 0.4)
  }
});

export default curationTheme;
