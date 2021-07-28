import React from 'react';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import DebtScreenComponent from './DebtScreenComponent';

function DebtScreen({children}) {
    return (
      <DebtScreenComponent>
        <DebtScreenComponent.TotalDebt/>
        <DebtScreenComponent.DebtList/>
      </DebtScreenComponent>
    )
}

export default SceneWrapper(DebtScreen);

