const downloadImage = (src, name) => {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = src;
    link.download = name + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(dataUri);
  }
};

export default downloadImage;
