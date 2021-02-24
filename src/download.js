/* eslint-disable no-undef */
const downloadButton = document.querySelector('.options-download');
const downloadCount = document.querySelector('.space-confirm');

const fetchLoop = async (_) => {
  const promises = selectedImages.map(async (imageSource) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    const data = await fetch(imageSource.image, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    const blob = await data.blob();
    const fileName = `${imageSource.name}.${blob.type.split('/')[1]}`;
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
    return [`${imageSource.name}.${blob.type.split('/')[1]}`];
  });

  const downloadEnd = await Promise.all(promises);
  imageBadges.textContent = 0;
  imageBadges.style.opacity = 0;
  selected = 0;
  animationInfo.forEach((item) => {
    item.reverse();
  });
  selectedImages = [];
  downloadCount.textContent = `${downloadEnd.length} ${
    downloadEnd.length > 1 ? 'Images Downloaded' : 'Image Downloaded'
  }`;
  const confirmAnimation = gsap
    .timeline()
    .to('.space', { opacity: 1, x: 0, ease: 'back' });
  setTimeout(() => {
    confirmAnimation.reverse();
  }, 3000);
};
downloadButton.addEventListener('click', (_) => {
  fetchLoop();
});
