import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FirebaseContext } from '~/firebase';
import validateImage from '~/utils/validateImage';
import AvatarEditor from '~components/common/AvatarEditor';
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();
  const { firebase, user } = React.useContext(FirebaseContext);
  const { register, handleSubmit, setError, setValue, errors, getValues, clearErrors } = useForm();
  const [generalError, setGeneralError] = React.useState('');
  const [progress, setProgress] = React.useState(0);

  const [imageData, setImageData] = React.useState({
    contentType: '',
    preview: null,
    location: null,
  });

  React.useEffect(() => user === null && router.push('/'), []);

  const onSubmit = React.useCallback(async (e) => {
    if (!e.name) {
      setError('name', {});
    }
    const canvasImage = editorRef.current.getImageScaledToCanvas().toDataURL();
    await firebase.create({
      name: e.name,
      imageUrl: canvasImage,
      loading: (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '% uploaded.'),
      onError: (error) => setGeneralError(error),
      onComplete: () => {
        setProgress('Complete');
        window.location.href = '/';
      },
    });
  });

  const editorRef = React.useRef();

  const onDropAccepted = React.useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    if (!getValues('upload')) {
      register('upload', {});
    }
    clearErrors('upload');
    clearErrors('link');
    setValue('link', '');
    setValue('upload', acceptedFile, { shouldValidate: true, shouldDirty: true });
    setImageData({ ...imageData, contentType: 'upload', location: acceptedFile.path, preview: acceptedFile });
  }, []);

  const onLinkChange = (e) => {
    const link = e.target.value;
    validateImage(link)
      .then(() => {
        clearErrors('link');
        clearErrors('upload');
        setValue('upload', '');
        setImageData({
          ...imageData,
          contentType: 'link',
          location: link,
          preview: link,
        });
      })
      .catch((err) => {
        let error;
        if (err === 'timeout') {
          error = 'The given link was not able to be loaded and was timed out.';
        } else {
          error = 'The given link did not give an image to load.';
        }
        if (!errors.link) {
          setError('link', { message: error });
        }
        setImageData({ ...imageData, contentType: 'link', location: link, preview: '' });
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 rounded-lg py-8 mx-auto bg-gray-100 text-center flex flex-col items-center"
      >
        {generalError && <div className="text-red-500 my-2">{generalError}</div>}
        <label className="w-1/2 text-2xl mb-2">Name</label>
        {errors.name && <div className="text-red-500">Name is required and must be shorter than 64 characters.</div>}
        <input
          name="name"
          placeholder="Enter a name"
          ref={register({ required: true })}
          className={`rounded-lg bg-gray-100 w-1/2 hover:bg-gray-200 outline-none mb-4 p-4 transition-all text-center border-2
            ${errors.name ? 'border-red-600' : 'border-gray-600'}`}
          autoComplete="off"
          autoCorrect="off"
        />
        <label className="mt-4 w-1/2 text-2xl mb-2">Upload an Image</label>
        {errors.upload && <div className="text-red-500">Image could not be loaded.</div>}
        <div
          {...getRootProps()}
          className={`flex justify-center items-center rounded-lg mb-4 w-2/3 h-32 transition-all border-dashed border-2 
            ${errors.upload ? 'border-red-600' : 'border-gray-600'} border-gray-600
            ${!isDragActive ? 'bg-gray-100' : 'bg-blue-300'} hover:bg-gray-200 active:bg-gray-400 outline-none`}
        >
          <input {...getInputProps({ name: 'upload' })} />
          <p>Drag or upload files</p>
        </div>

        <div className="w-2/3 mb-4 flex flex-nowrap items-center justify-center">
          <hr className="flex-grow border" />
          <span className="mx-4">or</span>
          <hr className="flex-grow border" />
        </div>

        <p>Upload via link</p>
        {errors.link && <div className="text-red-500">{errors.link.message}</div>}
        <input
          name="link"
          placeholder="Enter a link..."
          value={imageData.contentType === 'link' ? imageData.location : ''}
          ref={register}
          onChange={onLinkChange}
          className={`border-2 ${
            errors.link ? 'border-red-600' : 'border-gray-600'
          } mt-1 rounded-lg bg-gray-100 w-2/3 hover:bg-gray-200 active:bg-gray-400 outline-none p-4 transition-all text-center`}
          autoComplete="off"
          autoCorrect="off"
        />
        {imageData.preview && imageData.location && (
          <div className="w-2/3 my-6 flex flex-col">
            {imageData.contentType === 'upload' ? (
              <span className="mb-2 break-words">{imageData.location}</span>
            ) : (
              <a className="w-full mb-3 text-blue-400 break-words" href={imageData.location}>
                {imageData.location}
              </a>
            )}
            <AvatarEditor
              src={imageData.preview}
              className="mb-3 mx-auto"
              name={getValues('name') || 'untitled'}
              ref={editorRef}
            />
            {Object.keys(errors).length > 0 ? (
              <div className="text-red-500 mt-6">Some fields are missing.</div>
            ) : (
              <input
                type="submit"
                value="Create"
                className="mx-auto mt-6 w-1/2 cursor-pointer rounded-lg p-4 hover:font-semibold transition duration-500 ease-in-out bg-blue-300 hover:bg-blue-400 text-black text-center"
              />
            )}
            {progress !== 0 && <div className="text-2xl mt-2">{progress}</div> /* create progress bar */}
          </div>
        )}
      </form>
    </div>
  );
}
