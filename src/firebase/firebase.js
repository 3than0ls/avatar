import firebase from 'firebase';
import { firebaseConfig } from './config';
import httpErrors from 'http-errors';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

// mimics "backend"
export default class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.auth = firebase.auth();
    this.storageRef = firebase.storage().ref();
    this.firestore = firebase.firestore();

    this.lastVisibleImage;
    this.hasMoreImages = true;
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
    location.reload();
  }

  async create({ name, imageUrl, loading = (snapshot) => {}, onError = (error) => {}, onComplete = () => {} }) {
    const uploadTask = this.storageRef.child(`images/${uuidv4()}/${name}.png`).putString(imageUrl, 'data_url');
    uploadTask.on('state_changed', loading, onError, async () => {
      onComplete();
      const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
      await this.firestore
        .collection('images')
        .add({ name, imageUrl: downloadUrl, creator: this.auth.currentUser.uid, votes: 0, createdAt: new Date() });
    });
  }

  async getImages(limit = 20) {
    let query = this.firestore.collection('images').limit(limit).orderBy('createdAt').limit(limit);
    if (this.lastVisibleImage) {
      // query = this.firestore.collection('images').orderBy('createdAt').startAfter(this.lastVisibleImage).limit(limit);
    }
    const documentSnapshots = await query.get();
    this.lastVisibleImage = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    if (limit > documentSnapshots.docs.length) {
      this.hasMoreImages = false;
    } else {
      this.hasMoreImages = true;
    }
    return documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
