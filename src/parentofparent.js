import React, { createContext, useState } from 'react';

import { useEffect } from 'react';
// Create the context
export const AppContext = createContext();
// Create the context provider component
export const AppProvider = ({ children }) => {

    const[chatwithid,setchatwithid]=useState(null);
    const[chatwithroomid,setchatwithroomid]=useState(null);
    const[chatwithimg,setchatwithimg]=useState(null);
    
	const contextValues = {
       setchatwithid,chatwithid,chatwithroomid,
        setchatwithroomid,setchatwithimg,chatwithimg
        };
    
        return (
        <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
        );
    };
    