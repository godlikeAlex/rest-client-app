import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

type SignUpParams = { email: string; password: string; name: string };
type SignInParams = Omit<SignUpParams, 'name'>;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export async function signIn({ email, password }: SignInParams) {
  const user = await signInWithEmailAndPassword(auth, email, password);
  console.log('Вход выполнен');
  console.log(user);
  return user;
}

export async function signUp({ email, password, name }: SignUpParams) {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const userInfo = user.user;
  updateProfile(userInfo, { displayName: name });
  console.log('Регистрация прошла успешно');
  return user;
}

export function signOutProfile() {
  signOut(auth);
  console.log('Пользователь вышел из аккаунта');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
