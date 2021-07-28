import React, {  } from 'react';
import TextField from '@material-ui/core/TextField';
import fa from '../../../translation/fa';
import { useLoginContext } from '../screen/useLoginContext';

export function AuthPasswordTextInput() {

    const { onPasswordChange } = useLoginContext();

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={fa["password"]}
            type="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
        />
    );
}
