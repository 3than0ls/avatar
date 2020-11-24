import Firebase from './firebase';
import React from 'react';

export default new Firebase();

export const FirebaseContext = React.createContext({ firebase: {}, user: {} });
