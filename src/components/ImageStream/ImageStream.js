import React from 'react';
import ImageCard from './ImageCard';
import InfiniteScroll from 'react-infinite-scroller';
import { FirebaseContext } from '~/firebase';
import Icon from '~components/common/Icon';

export default function ImageStream({ searchValue }) {
  const [images, setImages] = React.useState([]);
  const [queriedImages, setQueriedImages] = React.useState([]);
  React.useEffect(() => {
    // what is an algolia ahhaha cry i know
    setQueriedImages(images.filter((image) => image.name.startsWith(searchValue)));
  }, [images, searchValue]);

  React.useEffect(() => {
    console.log(searchValue, images.length, queriedImages.length);
  }, [queriedImages]);

  const { firebase } = React.useContext(FirebaseContext);

  const getImages = React.useCallback(async () => setImages([...images, ...(await firebase.getImages())]));
  React.useEffect(async () => await getImages, []);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getImages}
      hasMore={firebase.hasMoreImages}
      loader={<Icon key={'icon'} name="loading" className="absolute animate-spin" color="white" size={64} />}
      className="flex flex-row justify-center mt-4 px-32 pb-12 flex-wrap w-full"
    >
      {images.length > 0 &&
        (queriedImages.length ? (
          queriedImages.map((image) => <ImageCard key={image.id} image={image} />)
        ) : (
          <span className="text-3xl text-white">No results found for search value: {searchValue}</span>
        ))}
    </InfiniteScroll>
  );
}
