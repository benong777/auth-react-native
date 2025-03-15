import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    await loginUser(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />
  } 
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
