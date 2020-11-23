import React from 'react';
import firebase from 'firebase'; // may cause issues
import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'avatar-fc70c.firebaseapp.com',
  databaseURL: 'https://avatar-fc70c.firebaseio.com',
  projectId: 'avatar-fc70c',
  storageBucket: 'avatar-fc70c.appspot.com',
  messagingSenderId: '645366435640',
  appId: '1:645366435640:web:44e2b321c3a313288b3bcd',
  measurementId: 'G-KLV321TRZ0',
};

// used in API pages and _app
class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  signUp({ username, email, password }) {
    const user = this.auth.createUserWithEmailAndPassword(email, password).then((res) => res.user);
    user.updateProfile({ displayName: username });
    return user;
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  // .getCurrentUser();
}

export const firebaseService = new Firebase();

export const FirebaseContext = React.createContext(null);
