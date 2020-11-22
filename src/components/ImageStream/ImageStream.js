import React from 'react';
import ImageCard from './ImageCard';

export default function ImageStream() {
  const exampleCard = {
    src: 'https://picsum.photos/300/300',
    name: 'test',
  };

  return (
    <div className="flex flex-row justify-center my-16 px-32 flex-wrap w-full">
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
      <ImageCard image={exampleCard} />
    </div>
  );
}
