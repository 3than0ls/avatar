import firebase from 'firebase';
import { firebaseConfig } from './config';
import httpErrors from 'http-errors';
import 'firebase/auth';

// used in API pages and _app
export default class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.auth = firebase.auth();
  }

  async signUp({ username, email, password }) {
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: username });
      return user;
    } catch (e) {
      if (e.code) {
        throw new httpErrors.BadRequest(e.message);
      }
      throw e;
    }
  }

  async signIn({ email, password }) {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (e) {
      if (e.code) {
        throw new httpErrors.BadRequest(e.message);
      }
      throw e;
    }
  }

  async signOut() {
    await this.auth.signOut();
    // location.reload();
  }
}
