import React, { useState, createContext, useEffect } from 'react';
export const AppConfig = createContext();


export const AppProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    const toggleModes = () => {
        setToggle(!toggle);
    }
    return (
        <AppConfig.Provider value={{
            toggle, toggleModes
        }}>{children}</AppConfig.Provider>
    )
}
