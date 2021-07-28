import React, {  } from 'react';
import { useLoginContext } from '../screen/useLoginContext';
import SimpleBackdrop from '../../../common/SimpleBackdrop';

export function AuthSimpleBackdrop({children}) {

    const { loading, setLoading } = useLoginContext()

  return (
    <SimpleBackdrop
      open={loading}
      setOpen={setLoading}
    />
  );
}
