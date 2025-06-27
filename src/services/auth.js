import { auth, db } from "../firebase"; // ✅ Make sure db is imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ Firestore methods

// ✅ SIGNUP FUNCTION with Firestore
export const handleSignup = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // ✅ Update display name in Firebase Auth
  await updateProfile(userCredential.user, { displayName: name });

  // ✅ Store user data in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    createdAt: new Date(),
  });

  return userCredential;
};

// ✅ LOGIN FUNCTION (no changes needed)
export const handleLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
