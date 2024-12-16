import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();



export const StoreProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [cart, setCart] = useState(Map());
    const [user, setUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState([]);

    console.log("StoreProvider state:", { 
        email, setEmail, 
        fName, setFName, 
        lName, setLName, 
        password, setPassword, 
        selectedGenre, setSelectedGenre, 
        cart, setCart 
      });

      const loginUser = (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          setLoggedInUser(user); // Set logged-in user in context
          return true;
        }
        return false;
      };
    
      const logoutUser = () => {
        setLoggedInUser(null); // Log out the user
      };

      const registerUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      };
  
    

    return (
        <StoreContext.Provider value={{ email, setEmail, cart, setCart,fName, setFName,lName, setLName,password, setPassword,selectedGenre, setSelectedGenre, user, setUser, loggedInUser, setLoggedInUser, loginUser, logoutUser, registerUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}