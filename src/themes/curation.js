import { fade } from 'material-ui/utils/colorManipulator';
import {
  darkBlack, fullBlack, lightGreen500, teal200, teal500, teal400, grey600, white, grey400, grey900, grey800, grey500
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

const curationTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal500,
    primary3Color: teal200,
    accent1Color: lightGreen500,
    accent2Color: grey600,
    accent3Color: teal400,
    textColor: white,
    alternateTextColor: grey900,
    canvasColor: grey800,
    contentColor: grey500,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    clockCircleColor: fade(darkBlack, 0.07),
    pickerHeaderColor: teal500,
    shadowColor: fullBlack
  }, appBar: {
    height: 84
  },
  spacing: spacing
});

export default curationTheme;
