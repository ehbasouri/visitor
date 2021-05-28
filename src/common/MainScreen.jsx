import React from "react";
import Container from '@material-ui/core/Container';

function MainScreen({children}) {
    return(
        <Container maxWidth="sm">
            {children}
        </Container>
    )
}

export default MainScreen;