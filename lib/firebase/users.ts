import { auth } from "./auth";
import { db } from "./firestore";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

export type AppUser = {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt?: Timestamp;
};

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: `${firstName} ${lastName}`,
  });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    firstName,
    lastName,
    email,
    role: "admin",
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function getUsers(): Promise<AppUser[]> {
  const usersRef = collection(db, "users");

  const q = query(usersRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);

  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AppUser[];

  return users;
}