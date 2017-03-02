import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan500, grey400, orange200, orange400, darkBlack, grey500, white, grey300, fullBlack, yellow800
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const curationTheme = getMuiTheme({
  palette: {
    primary1Color: orange400,
    primary2Color: orange400,
    primary3Color: grey400,
    accent1Color: orange200,
    accent2Color: orange400,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: grey300,
    borderColor: grey500,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }, appBar: {
    height: 84
  }
});

export default curationTheme;
