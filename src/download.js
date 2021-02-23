/* eslint-disable no-undef */
console.log(selectedImages);
const button = document.querySelector('.button');

const mapLoop = async (_) => {
  console.log('Start');
  const promises = selectedImages.map(async (imageSource) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    const data = await fetch(imageSource, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    const blob = await data.blob();
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'dogo.jpeg';
    a.click();
    window.URL.revokeObjectURL(url);
    return {
      message: 'sucess',
    };
  });

  const allResults = await Promise.all(promises);
  console.log('End');
};
button.addEventListener('click', (e) => {
  mapLoop();
});
