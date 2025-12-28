import React, { createContext, useEffect, useState , useContext} from 'react'

const AuthContext = createContext();


export default function AuthProvider({children}) {

    const [user, setUser] = useState("");

    const [users, setUsers] = useState(()=>{
        const storeUsers = localStorage.getItem('users');
        return storeUsers ? JSON.parse(storeUsers) : [{username: "admin", password: "password"}] ;
    });

    useEffect(()=>{
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    const login = (username, password)=>{
        const foundUsername = users.find((u)=>{
            return u.username === username  ;
        });

        const found = users.find((u)=>{
            return username===u.username && password === u.password;
        })

        if(!foundUsername){
            return {success: false, message: "username not found"};
        }

        if(found){
            setUser({username});
            return {success: true};

        }

        return {success: false, message: "incorrect password"};
    }

    const signUp = (username, password) =>{
        const exists = users.some((u)=>u.username === username);
        if(exists){
            return {success: false, message: "username already taken"};
        }

        const newUser = {username, password};
        setUsers((prev)=>[...prev, newUser]);
        setUser({username});
        return {success : true};
    }

    const logOut = ()=>setUser(null);

    return (
        <AuthContext.Provider value={{user,users, login, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=> useContext(AuthContext);