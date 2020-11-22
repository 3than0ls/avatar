const validateImage = (url) => {
  return new Promise(function (resolve, reject) {
    let timer;
    const img = new Image();
    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject('error');
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve();
    };
    timer = setTimeout(function () {
      // reset .src to invalid URL so it stops previous loading
      img.src = '//!!!!/test.jpg';
      reject('timeout');
    }, 5000);
    img.src = url;
  });
};

export default validateImage;
