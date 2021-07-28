import React from 'react';
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export function AuthLinkButton({title, link}) {
    return (
        <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
                <Link to={link}>
                {title}
                </Link>
            </Typography>
        </Box>
    );
  }