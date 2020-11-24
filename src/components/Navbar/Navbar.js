import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarSearch from './NavbarSearch';
import Button from '~components/common/Button';
import { useRouter } from 'next/router';
import { FirebaseContext } from '~/firebase';

export default function Navbar({}) {
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setMinimized(window.scrollY > 0);
    };
  }, []);
  const router = useRouter();
  const { firebase, user } = React.useContext(FirebaseContext);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="h-24 w-full">
      <div
        className={`${
          minimized ? 'h-16' : 'h-24'
        } w-full bg-white flex justify-between px-16 items-center fixed z-20 transition-all`}
      >
        <Button onClick={async () => firebase.auth.onAuthStateChanged((user) => console.log(user))}>Hi</Button>
        <Link href="/">
          <a className="text-3xl">Avatar</a>
        </Link>
        <NavbarSearch minimized={minimized} searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="flex flex-row w-1/6 ">
          {!user ? (
            <>
              <Link href="/login" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-4`}>Log In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-4`}>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/post" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-4`}>Post</Button>
              </Link>
              <Button
                className={`w-1/2 ${minimized && 'py-2'} mx-4`}
                onClick={async () => {
                  await firebase.signOut();
                  router.push('/');
                }}
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
