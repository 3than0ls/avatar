import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarSearch from './NavbarSearch';
import Button from '~components/common/Button';
import { useRouter } from 'next/router';
import { FirebaseContext } from '~/firebase';

export default function Navbar({ onSearch }) {
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setMinimized(window.scrollY > 0);
    };
  }, []);
  const router = useRouter();
  const { firebase, user } = React.useContext(FirebaseContext);

  const signOut = React.useCallback(async () => {
    await firebase.signOut();
    router.push('/');
  });

  return (
    <div className="h-24 w-full">
      <div
        className={`${
          minimized ? 'h-16' : 'h-24'
        } w-full bg-white flex justify-between px-4 md:px-16 items-center fixed z-20 transition-all`}
      >
        <a href="/" className="text-3xl hidden lg:block">Avatar</a>
        <NavbarSearch minimized={minimized} onSearch={onSearch} />
        <div className="flex flex-row w-64">
          {user === null ? (
            <>
              <Link href="/login" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-2`}>Log In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-2`}>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/create" passHref>
                <Button className={`w-1/2 ${minimized && 'py-2'} mx-2`}>Create</Button>
              </Link>
              <Button className={`w-1/2 ${minimized && 'py-2'} mx-2`} onClick={signOut}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
