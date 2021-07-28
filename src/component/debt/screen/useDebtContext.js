import React, {useContext, createContext} from 'react';

const DebtContext = createContext();

export const DebtProvider = ({value, children}) =>{
    return(
        <DebtContext.Provider value={value} >
            {children}
        </DebtContext.Provider>
    )
}

export const useDebtContext = () => {
    const result = useContext(DebtContext);
    if(!result){
        return new Error("debt context is undefined ")
    }
    return result;
}