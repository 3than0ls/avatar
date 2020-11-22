import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarSearch from './NavbarSearch';
import Button from '~components/common/Button';

export default function Navbar({}) {
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setMinimized(window.scrollY > 0);
    };
  }, []);

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
        <Link href="/create" passHref>
          <Button className={`w-1/12 ${minimized && 'py-2'}`}>Create</Button>
        </Link>
      </div>
    </div>
  );
}