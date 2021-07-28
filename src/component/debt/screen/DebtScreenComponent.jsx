import React from 'react';
import MainScreen from '../../../common/MainScreen';
import { Header } from '../../../common/Header';
import fa from '../../../translation/fa';
import { DebtProvider } from './useDebtContext';
import { useDebt } from './useDebt';
import { DebtList, TotalDebt } from '../items';

function DebtScreenComponent({children}) {
  
  const {
    debts,
    total_debt
  } = useDebt();

  return (
    <DebtProvider value={{ debts, total_debt }} >
      <div className={"mainScreen"} >
          <Header title={fa["debt account"]} />
          <MainScreen>
            {children}
          </MainScreen>
      </div>
    </DebtProvider>
  );
}

DebtScreenComponent.TotalDebt = TotalDebt
DebtScreenComponent.DebtList = DebtList

export default DebtScreenComponent;

