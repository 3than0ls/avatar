const getDataUri = async (src) => {
  const blob = await fetch(src).then((r) => r.blob());
  const dataUri = await new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  return dataUri;
};

export default getDataUri;
