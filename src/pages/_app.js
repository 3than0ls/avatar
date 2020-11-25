import React from 'react';
import Head from 'next/head';
import Navbar from '~components/Navbar/Navbar';
import { ImageContext } from '~/image-context';
import ImageModal from '~components/ImageModal/ImageModal';
import '~/styles/tailwind.css';
import '~/styles/globals.css';
import firebase, { FirebaseContext } from '~/firebase';
import { useRouter } from 'next/router';
const seedrandom = require('seedrandom');

function MyApp({ Component, pageProps }) {
  const colorSchemes = [
    ['blue-400', 'teal-400', 'purple-500'],
    ['red-600', 'yellow-300', 'orange-500'],
    ['purple-400', 'pink-500', 'red-500'],
    ['green-600', 'blue-800', 'purple-800'],
  ];
  const directions = ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'];
  const random = seedrandom('this is a good idea');
  const colorScheme = React.useState(colorSchemes[Math.floor(random() * colorSchemes.length)])[0];
  const direction = React.useState(directions[Math.floor(random() * colorSchemes.length)])[0];

  const [image, setImage] = React.useState({});

  const [searchValue, setSearchValue] = React.useState('');

  const router = useRouter();
  const onSearch = (query) => {
    router.push('/');
    setSearchValue(query);
  };

  const [user, setUser] = React.useState(null);
  firebase.auth.onAuthStateChanged((user) => setUser(user));

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <ImageContext.Provider value={{ image, setImage, clearImage: () => setImage({}) }}>
        <div
          className={`w-full min-h-screen bg-gradient-to-${direction} 
            from-${colorScheme[0]} via-${colorScheme[1]} to-${colorScheme[2]}`}
        >
          <Head>
            <title>Avatar</title>
          </Head>
          {Object.keys(image).length > 0 && <ImageModal image={image} />}
          <Navbar onSearch={onSearch} />
          <Component {...pageProps} setImage={setImage} searchValue={searchValue} />
        </div>
      </ImageContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
