import React from "react";
import { useContext } from "react";
const AuthContext = React.createContext()
export function AuthProvider({children, value}) {
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }
  
const SomeContext = React.createContext(null);
export function useAuthValue(){
    return useContext(AuthContext)
  }
export default SomeContext