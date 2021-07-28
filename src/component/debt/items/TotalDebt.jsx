import React from 'react';
import fa from '../../../translation/fa';
import { TotalItems } from "../../analytics/items/TotalItems" ;
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import { useDebtContext } from '../screen/useDebtContext';

export function TotalDebt() {
  const { total_debt } = useDebtContext();
  return (
    <TotalItems
        subTitle={converEnglishNumToPersian(numberWithCommas(total_debt)) + " " + fa["toman"]}
    />
  );
}
