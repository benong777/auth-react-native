import axios from 'axios';
import { EXPO_PUBLIC_API_KEY } from '@env';

export async function createUser(email, password) {
  const response = await axios.post(
    // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.EXPO_PUBLIC_API_KEY,
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + EXPO_PUBLIC_API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  );
}