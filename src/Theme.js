import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

//#EB2392
//#76BE4E
//#0190BE

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#76BE4E",
      main: blue[500],
      dark: "#EB2392"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

const Theme = props => <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;

export default Theme;
