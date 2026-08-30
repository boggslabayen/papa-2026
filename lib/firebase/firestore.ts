//This file initializes the Firestore database connection using the Firebase configuration defined in the config.ts 
// file. It exports the Firestore instance (db) that can be used throughout the application to interact with the 
// Firestore database.

import { getFirestore } from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);