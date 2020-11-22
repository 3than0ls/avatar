import React from 'react';
import { ImageContext } from '~/image-context';

export default function ImageCard({ image }) {
  const { setImage } = React.useContext(ImageContext);
  const { src, name } = image;

  return (
    <div
      onClick={() => setImage(image)}
      className="cursor-pointer m-5 flex bg-white rounded-md shadow-lg transition duration-500 ease-in-out bg-white hover:bg-gray-200 transform hover:scale-105 hover:font-semibold"
    >
      <div className="p-2 m-1 flex flex-col justify-center items-center">
        <div className="flex m-2 rounded-md w-64 h-64">
          <img src={src} alt={name} className="object-cover w-full h-full rounded-md border border-gray-300 border-2" />
        </div>
        <div className="p-2 text-center tracking-wide select-none">{name}</div>
      </div>
    </div>
  );
}
