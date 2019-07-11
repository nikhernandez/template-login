import React, { useState, createContext } from 'react'

export const userContext = createContext([])

const Store = ({children}) => {
    const [user, setUser] = useState()

    return (
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}

export default Store