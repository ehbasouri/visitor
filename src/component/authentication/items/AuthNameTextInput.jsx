import React, {  } from 'react';
import TextField from '@material-ui/core/TextField';
import fa from '../../../translation/fa';
import { useLoginContext } from '../screen/useLoginContext';

export function AuthNameTextInput() {

    const { onNameChange } = useLoginContext();

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={fa["name"]}
            autoFocus
            onChange={onNameChange}
        />
    );
}
