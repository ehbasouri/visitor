import React, {  } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useAuthStyles} from "../auth.style"

export function AuthIcon() {

  const classes = useAuthStyles();

  return (   
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
  );
}