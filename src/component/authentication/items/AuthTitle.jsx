import React, {  } from 'react';
import Typography from '@material-ui/core/Typography';
import fa from '../../../translation/fa';

export function AuthTitle() {

  return (   
    <Typography component="h5" variant="h6">
      {fa["Business login page"]}
    </Typography>
  );
}