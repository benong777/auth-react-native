import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  // Initialization - Not required.. for development autocompletion only
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
});

// Logic to manage state - used as a wrapper around entire app
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      // If token was previously stored in local device, restore it in app memory again by setting the state
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }

    fetchToken();
  }, []);

  function authenticate(token) {
    setAuthToken(token)
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}