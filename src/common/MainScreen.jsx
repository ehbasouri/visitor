import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }));

function MainScreen({children}) {


    return(
        <Container maxWidth="sm">
            {children}
        </Container>
    )
}

export default MainScreen;