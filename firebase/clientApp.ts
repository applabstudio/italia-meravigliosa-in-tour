//@ts-nocheck

import { FirebaseApp, initializeApp } from "firebase/app"
import { initializeFirestore } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth"

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(clientCredentials)

// export const auth = getAuth()

export const signupUser = (
  username: string,
  email: string,
  password: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("User Created:", cred.user);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const logout = () => {
  signOut(auth)
    .then(() => {
      // console.log("The User Signed Out");
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const auth = getAuth()
export const firestore: FirebaseApp = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})
