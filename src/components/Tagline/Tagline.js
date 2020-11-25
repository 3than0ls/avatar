import React from 'react';
import { FirebaseContext } from '~/firebase';

export default function Tagline() {
  const { user } = React.useContext(FirebaseContext);
  return (
    <div className="mx-auto text-center text-white py-12">
      <div className="text-8xl">Hello {user?.displayName || 'there'}!</div>
      <div className="text-3xl mt-6">
        Welcome to Avatar, a place to find, upload, and edit cool profile pictures and amazing avatars.
      </div>
      {user === null && <div className="text-2xl mt-3">Log in to post images.</div>}
      <div className="text-lg mt-4">
        <div>This project was made by Ethanol.</div>
        <a className="hover:underline" href="https://github.com/3than0ls">
          Find the repo here.
        </a>
      </div>
    </div>
  );
}
