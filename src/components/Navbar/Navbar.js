import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarSearch from './NavbarSearch';
import Button from '~components/common/Button';
import { FirebaseContext } from '../../firebase/firebase';

export default function Navbar({}) {
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setMinimized(window.scrollY > 0);
    };
  }, []);

  const firebase = React.useContext(FirebaseContext);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="h-24 w-full">
      <div
        className={`${
          minimized ? 'h-16' : 'h-24'
        } w-full bg-white flex justify-between px-16 items-center fixed z-20 transition-all`}
      >
        <Link href="/">
          <a className="text-3xl">Avatar</a>
        </Link>
        <NavbarSearch minimized={minimized} searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="flex flex-row w-1/6 ">
          <Link href="/login" passHref>
            <Button className={`w-1/2 ${minimized && 'py-2'} mx-4`}>Log In</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button className={`w-1/2 ${minimized && 'py-2'} mx-4`}>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
