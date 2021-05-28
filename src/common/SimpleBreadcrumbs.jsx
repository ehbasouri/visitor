import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: 20,
    paddingLeft: 20
  },
}));

export default function SimpleBreadcrumbs({tree = [], onClick}) {

  const classes = useStyles()

  return (
    <Breadcrumbs className={classes.container} aria-label="breadcrumb">
      {tree.map((item, index)=>(
        ( index + 1 ) !== tree.length ? <Typography onClick={()=>onClick(item, index)}>
          {item.name}
        </Typography> :
        <Typography color="textPrimary">
          {item.name}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}
