import {createMuiTheme} from '@material-ui/core/styles';

const useStyles = createMuiTheme((theme) => ({
    typography: {
      fontFamily: 'Open Sans',
      fontWeightThin: 100,
      fontWeightThinItalic: 100,
      fontWeightExtraLight: 200,
      fontWeightExtraLightItalic: 200,
      fontWeightLight: 300,
      fontWeightLightItalic: 300,
      fontWeightRegular: 400,
      fontWeightRegularItalic: 400,
      fontWeightMedium: 500,
      fontWeightMediumItalic: 500,
      fontWeightSemiblod: 600,
      fontWeightSemiblodtalic: 600,
      fontWeightBlod: 700,
      fontWeightBlodtalic: 700,
      fontWeightExtrablod: 800,
      fontWeightExtrablodtalic: 800,
      fontWeightBlack: 900,
      fontWeightBlackItalic: 900,
      padding: '10px'
    },
    button: {
      fontFamily: 'Work Sans',
      fontWeightThin: 100,
      fontWeightThinItalic: 100,
      fontWeightExtraLight: 200,
      fontWeightExtraLightItalic: 200,
      fontWeightLight: 300,
      fontWeightLightItalic: 300,
      fontWeightRegular: 400,
      fontWeightRegularItalic: 400,
      fontWeightMedium: 500,
      fontWeightMediumItalic: 500,
      fontWeightSemiblod: 600,
      fontWeightSemiblodtalic: 600,
      fontWeightBlod: 700,
      fontWeightBlodtalic: 700,
      fontWeightExtrablod: 800,
      fontWeightExtrablodtalic: 800,
      fontWeightBlack: 900,
      fontWeightBlackItalic: 900,
    },
    palette: {
      primary: {
        main: "#2C2D2D",
        light: "#c8d6e5"
      },
      secondary: {
        main: "#74b9ff",
        light: "#dff9fb"
      },
      background: {
        default: '#FFFFFF'
      },
    }
  }));

export default useStyles;