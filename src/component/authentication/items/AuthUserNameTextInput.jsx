import React, {  } from 'react';
import TextField from '@material-ui/core/TextField';
import fa from '../../../translation/fa';
import { useLoginContext } from '../screen/useLoginContext';

export function AuthUserNameTextInput() {

    const { onUsernameChange } = useLoginContext();

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={fa["username"]}
            autoFocus
            onChange={onUsernameChange}
        />
    );
}
