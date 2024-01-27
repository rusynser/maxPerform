// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({ userId: null, userRole: null });

    return (
        <UserContext.Provider value={{ userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};

