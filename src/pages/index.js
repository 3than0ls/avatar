import React from 'react';
import ImageStream from '~components/ImageStream/ImageStream';
import Tagline from '~components/Tagline/Tagline';

export default function Home({ searchValue }) {
  return (
    <div>
      <Tagline />
      <ImageStream searchValue={searchValue} />
    </div>
  );
}
