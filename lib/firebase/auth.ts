// This file allows the app to use authentication methods from firebase.

import { getAuth } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);