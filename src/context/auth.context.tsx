import { createContext, useEffect, useState } from "react";
import authSvc from "../pages/auth/auth.service";


const AuthContext = createContext({})
export type AuthData = {
    loggedInUser: any,
    setLoggedInUser: any
}

export const AuthProvider = ({children}: {children: any}) => {
    const [loggedInUser, setLoggedInUser] = useState<any>();

    const loginCheck =async () => {
        try {
            const {data} = await authSvc.getLoggedInuser()
            setLoggedInUser(data.result);
        } catch(exception){
            console.log(exception)
        }
    }
    useEffect(() => {
        loginCheck()
    }, [])
    return (<>
            <AuthContext.Provider value={{
                loggedInUser: loggedInUser,
                setLoggedInUser: setLoggedInUser
            } as AuthData}>
                {children}
            </AuthContext.Provider>
            
    </>)
}

export default AuthContext;