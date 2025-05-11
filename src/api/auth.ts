import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

// Регистрация пользователя
export async function registerUser({ email, password, name, role, categories }: {
  email: string;
  password: string;
  name: string;
  role: string;
  categories?: string[];
}) {
  // 1. Создать пользователя в Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // 2. Обновить имя
  await updateProfile(user, { displayName: name });
  // 3. Создать профиль в Firestore
  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    name,
    email,
    role,
    categories: categories || [],
    createdAt: serverTimestamp(),
  });
  return user;
}

// Вход пользователя
export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
} 