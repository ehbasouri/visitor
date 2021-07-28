import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuthStyles } from '../auth.style';
import { useLoginContext } from '../screen/useLoginContext';


export function AuthButton ({title}) {
    const classes = useAuthStyles();
    const { onSubmit } = useLoginContext();
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
    >
        {title}
    </Button>
  );
}
