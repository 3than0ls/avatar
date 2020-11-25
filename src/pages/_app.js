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
    ['from-blue-400', 'via-teal-400', 'to-purple-500'],
    ['from-red-600', 'via-yellow-300', 'to-orange-500'],
    ['from-purple-400', 'via-pink-500', 'to-red-500'],
    ['from-green-600', 'via-blue-800', 'to-purple-800'],
  ];
  const directions = [
    'bg-gradient-to-t',
    'bg-gradient-to-tr',
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'bg-gradient-to-b',
    'bg-gradient-to-bl',
    'bg-gradient-to-l',
    'bg-gradient-to-tl',
  ];
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
        <div className={`w-full min-h-screen ${direction} ${colorScheme[0]} ${colorScheme[1]} ${colorScheme[2]}`}>
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
