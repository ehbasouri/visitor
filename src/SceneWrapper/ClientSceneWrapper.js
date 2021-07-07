import React from "react"; 
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';


const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: deepOrange[800],
    },
    secondary: {
      main: orange[100]
    },
    action: {
      main: "green"
    }
  },
  typography: {
    fontFamily: [
      "Dubai-Bold"
    ].join(','),
  },
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ClientSceneWrapper = (WrappedComponent) => {
    return function (props) {
        
        return (
            <StylesProvider jss={jss} >
                <ThemeProvider theme={theme} >
                    <WrappedComponent 
                        {...props} 
                    >
                    </WrappedComponent> 
                </ThemeProvider>
            </StylesProvider>
        );
    }
};

export default ClientSceneWrapper;



