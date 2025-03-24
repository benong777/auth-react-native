import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          // tintColor automatically provided
          headerRight: ({tintColor}) => <IconButton icon='exit' size={20} color={tintColor} onPress={authCtx.logout}/>
          // headerRight: ({tintColor}) => <Button title='Logout' color={tintColor} onPress={authCtx.logout} />
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

// expo-app-loading Deprecated!  * Need to switch to expo-splash-screen
// Created Root (and moved Navigation component here because we needed to tap into useContext for AuthContext)
// Root then replaced Navigation in the App component below.
function Root() {
  // const authCtx = useContext(AuthContext);

  // const [isTryingLogin, setIsTryingLogin] = useState(true);

  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await AsyncStorage.getItem('token');

  //     // If token was previously stored in local device, restore it in app memory again by setting the state
  //     if (storedToken) {
  //       authCtx.authenticate(storedToken);
  //     }

  //     setIsTryingLogin(false);  // no longer trying to log user in
  //   }

  //   fetchToken();
  // }, []);

  // if (isTryingLogin) {
  //   return <AppLoading />
  // }
  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
