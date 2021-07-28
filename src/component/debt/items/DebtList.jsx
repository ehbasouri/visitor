import React from 'react';
import {DebtScreenItem} from '../items';
import { useDebtContext } from '../screen/useDebtContext';

export function DebtList({children}) {
  const {debts} = useDebtContext();
  return (
    debts.map(debt=>(
        <DebtScreenItem key={debt._id} debt={debt} />
      ))
  );
}


