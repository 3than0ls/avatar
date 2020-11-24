import React from 'react';
import Icon from '~components/common/Icon';
import Button from '~components/common/Button';
import downloadImage from '~/utils/downloadImage';
import getDataUri from '~/utils/getDataUri';
import AvatarEditor from '~components/common/AvatarEditor';
import { ImageContext } from '~/image-context';

export default function ImageModal() {
  const { image, clearImage } = React.useContext(ImageContext);
  const { src, name } = image;

  const [editMode, setEditMode] = React.useState(false);

  const download = React.useCallback(async () => {
    const dataUri = await getDataUri(src);
    downloadImage(dataUri, name);
  });

  const editorRef = React.useRef();

  return (
    <div className="fixed text-center w-full h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center overflow-hidden z-30">
      <div className="relative w-full max-w-3xl h-auto max-h-full bg-white rounded-lg border-gray-200 border-2 p-6">
        <span onClick={clearImage} className="cursor-pointer">
          <Icon className="absolute m-4 top-0 right-0" name="exit" />
        </span>
        <div className="w-full text-center text-3xl p-6">{name}</div>
        <div className="flex justify-center">
          {editMode ? (
            <AvatarEditor src={src} className="mb-3 mx-auto" name={name || 'untitled'} ref={editorRef} />
          ) : (
            <img className="w-96 h-96 object-cover" src={src} alt={name} />
          )}
        </div>
        <div className="flex items-center justify-evenly mt-8">
          <Button className="w-2/5" onClick={download}>
            Download
          </Button>
          <Button className="w-2/5" onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Exit edit mode' : 'Locally edit'}
          </Button>
        </div>
      </div>
    </div>
  );
}
