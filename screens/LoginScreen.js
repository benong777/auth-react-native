import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await loginUser(email, password);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Check your credentials or try again later!'
      )
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />
  } 
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
