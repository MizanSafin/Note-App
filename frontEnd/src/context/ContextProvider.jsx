import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"

const authContext = createContext()
function ContextProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (user) => {
    
    setUser(user)
  }

   const logout = ()=>{
      localStorage.removeItem("token")
      login("")
   }
  useEffect(()=>{
     const verifyUser = async()=>{
      try {
          let response = await axios.get(
            `http://localhost:5051/api/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          if (response.data.success) {
           setUser(response.data.user.name)
          }
      } catch (error) {
        console.log(error)
      }
     }

     verifyUser();
  },[])
  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider
