import React, {  } from 'react';
import { AlertComponent } from '../../../common/AlertComponent';
import { useLoginContext } from '../screen/useLoginContext';

export function AuthAlertComponent({children}) {

    const { showAlert, setShowAlert, message } = useLoginContext()

  return (
    <AlertComponent
        open={showAlert}
        setOpen={setShowAlert}
        message={message}
    />
  );
}
