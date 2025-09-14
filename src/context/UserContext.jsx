import axios from "axios";
import {createContext, useEffect, useState } from "react";

//create the context
export const UserContext = createContext();

//Provider component
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;

    //Fetch user details on first load
    useEffect(() => {
        const fetchUser = async()=>{
            try{
                const response = await axios.get(`${API_URL}/user/user-details`, {withCredentials:true});
                setUser(response.data.user);
            }catch(error){
                console.log(error.message);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
    
};

