
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyCnD5MA4c2oI3qum9zc4zY8j4fN2XRxf3c",
  authDomain: "dream-ba008.firebaseapp.com",
  projectId: "dream-ba008",
  storageBucket: "dream-ba008.firebasestorage.app",
  messagingSenderId: "521910546694",
  appId: "1:521910546694:web:2ea08c5e630d457cedae87",
  measurementId: "G-9LNJBYK52Y"
};

// Initialize Firebase (Modular SDK)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);