import { createContext, useState } from "react";

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

  function authenticate(token) {
    setAuthToken(token)
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}