import React from "react";

const LoginContext = React.createContext(undefined);

const LoginProvider = ({value, children}) => {
    return (
        <LoginContext.Provider value={value} >
            {children}
        </LoginContext.Provider>
    )
}

const useLoginContext = () => {
    const context = React.useContext(LoginContext);
    if(!context){
        return new Error("login context has error ... ");
    }
    return context;
}

export {
    LoginProvider,
    useLoginContext
}