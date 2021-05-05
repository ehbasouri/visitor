import React from "react"; 
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { create } from 'jss';
import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  direction: 'rtl',
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const SceneWrapper = (WrappedComponent) => {
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

export default SceneWrapper;



