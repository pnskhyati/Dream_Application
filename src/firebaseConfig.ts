
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/compat/analytics"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyCnD5MA4c2oI3qum9zc4zY8j4fN2XRxf3c",
  authDomain: "dream-ba008.firebaseapp.com",
  projectId: "dream-ba008",
  storageBucket: "dream-ba008.firebasestorage.app",
  messagingSenderId: "521910546694",
  appId: "1:521910546694:web:2ea08c5e630d457cedae87",
  measurementId: "G-9LNJBYK52Y"
};

// Initialize Firebase (v8 / compat style)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
