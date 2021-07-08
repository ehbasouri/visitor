import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      border: "1px solid #aaa",
      borderRadius: "8px"
    }
  }));

export function TotalItems({title, subTitle}) {

    const classes = useStyles();

    return(
        <div className={classes.paper}>
            <Typography variant="body2" color="textSecondary" align="center">
                {title}
            </Typography>

            <Typography variant="body2" color="textSecondary" align="center">
                {subTitle}
            </Typography>
        </div>
    )
}