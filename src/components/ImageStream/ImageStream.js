import React from 'react';
import ImageCard from './ImageCard';
import imageService from '~/services/imageService';

export default function ImageStream() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => imageService.getImageList({ startAfter: 1 }).then((res) => setImages(res.data)), []);

  return (
    <div className="flex flex-row justify-center my-16 px-32 flex-wrap w-full">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
