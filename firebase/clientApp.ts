//@ts-nocheck

import { FirebaseApp, initializeApp } from "firebase/app"
import { initializeFirestore } from "firebase/firestore"
// import { getAuth } from "firebase/auth"

const clientCredentials = {
  apiKey: "AIzaSyDeeFrgP8pk9TqQGsAfPfvoji7jYnJWBMY",
  authDomain: "italia-in-tour.firebaseapp.com",
  projectId: "italia-in-tour",
  storageBucket: "italia-in-tour.appspot.com",
  messagingSenderId: "129421627529",
  appId: "1:129421627529:web:937ad13583b8f1d5ec3658",
}

const firebaseApp = initializeApp(clientCredentials)

// export const auth = getAuth()

export const firestore: FirebaseApp = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})
