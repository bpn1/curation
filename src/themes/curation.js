import { fade } from 'material-ui/utils/colorManipulator';
import {
  darkBlack, fullBlack, grey600, white, grey400, grey900, grey800, grey500, yellow500,
  amber200, amber500, amber700, red900, teal800
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

const curationTheme = getMuiTheme({
  palette: {
    primary1Color: amber500,
    primary2Color: amber700,
    primary3Color: amber200,
    accent1Color: amber200,
    accent2Color: grey600,
    accent3Color: amber700,

    acceptColor: teal800,
    denyColor: red900,

    textColor: white,
    alternateTextColor: grey900,
    canvasColor: grey800,
    contentColor: grey500,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    clockCircleColor: fade(darkBlack, 0.07),
    pickerHeaderColor: yellow500,
    shadowColor: fullBlack
  }, appBar: {
    height: 84
  },
  spacing: spacing
});

export default curationTheme;
