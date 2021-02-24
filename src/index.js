/* eslint-disable no-undef */
//Global State
let selectedImages = [];
let selected = 0;
let animationInfo = [];
let modalStatus = false;

//SELECTORS
const mainContent = document.querySelector('.main-content');
const imageBadges = document.querySelector('.selected-images');
const modal = document.querySelector('.modal');
const fullscreen = modal.querySelector('.fullscreen');
const root = document.querySelector('body');

const addSelectedImage = (imgSrc, animalName, index, imageWraperClass) => {
  const isDuplicated = selectedImages.find((item) => {
    return item.image === imgSrc;
  });

  const selectButton = document.querySelector(`.selectButton-${index}`);
  if (isDuplicated) {
    selectedImages = selectedImages.filter((item) => item.image !== imgSrc);
    selectButton.style.opacity = 0;
    imageBadges.textContent = selected -= 1;
  } else {
    selectButton.style.opacity = 1;
    selectedImages.push({
      image: imgSrc,
      name: animalName,
      imageClass: imageWraperClass,
    });

    imageBadges.textContent = selected += 1;

    if (selected > 0) {
      imageBadges.style.opacity = '1';
    }
  }
};

fetch('https://eulerity-hackathon.appspot.com/pets', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((petImage, index) => {
      const createdImage = createSingleImage(
        petImage.url,
        petImage.description,
        petImage.title,
        index,
        addSelectedImage
      );
      //Each Image render
      mainContent.appendChild(createdImage);

      const animation = gsap
        .timeline()
        .to(`.hiddenDescription-${index}`, { opacity: 1, y: 0 })
        .to(`.hiddenTitle-${index}`, { opacity: 1, y: 0 }, 0);
      const animationExpand = gsap
        .timeline()
        .to(
          `.expand-image-wrap-${index}`,
          { duration: 0.3, opacity: 1, x: 0 },
          0
        );
      animationInfo.push(animation);

      //Animation
      animation.pause();
      animationExpand.pause();
      const image = createdImage.children[0];
      createdImage.addEventListener('mouseenter', (_) => {
        image.style.transform = 'scale(1.01)';
        image.style.filter = 'brightness(60%)';
        animation.play();
        animationExpand.play();
      });
      image.style.opacity = '0';
      createdImage.addEventListener('mouseleave', (e) => {
        const isDuplicated = selectedImages.find(
          (item) => item.image === e.target.firstChild.src
        );
        if (!isDuplicated) {
          image.style.transform = 'scale(1)';
          image.style.filter = 'brightness(100%)';
          animation.reverse();
        }
        animationExpand.reverse();
      });

      image.addEventListener('load', (_) => {
        const height = image.clientHeight + 20;
        const spans = Math.ceil(height / 10);
        createdImage.style.gridRowEnd = `span ${spans}`;
        image.style.opacity = '1';
      });

      const expandIcon = document.querySelector(`.expand-image-wrap-${index}`);
      expandIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        fullscreen.innerHTML = '';
        modalStatus = true;
        modal.style.display = 'flex';
        const fImage = document.createElement('img');
        fImage.setAttribute('class', 'fullscreen-image');
        fImage.setAttribute('src', petImage.url);
        fullscreen.appendChild(fImage);
        fullscreen.appendChild(createClosingButton());
        fullscreen.appendChild(
          singleImageDownload(petImage.url, petImage.title)
        );
        if (modalStatus) {
          root.style.width = '100vw';
          root.style.overflow = 'hidden';
          root.style.position = 'fixed';
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function createClosingButton() {
  const closeButton = document.createElement('div');
  const closeButtonImg = document.createElement('img');
  closeButton.setAttribute('class', 'fullscreen-close');
  closeButtonImg.setAttribute('class', 'fullscreen-close-image');
  closeButtonImg.setAttribute('src', 'images/cancel.svg');
  closeButton.appendChild(closeButtonImg);
  closeButton.addEventListener('click', (_) => {
    modalStatus = false;
    modal.style.display = 'none';
    root.style.overflow = 'visible';
    root.style.position = 'relative';
  });
  return closeButton;
}

function singleImageDownload(imageUrl, petName) {
  const downloadButton = document.createElement('div');
  const downloadButtonImg = document.createElement('img');
  downloadButton.setAttribute('class', 'fullscreen-download');
  downloadButtonImg.setAttribute('class', 'fullscreen-download-image');
  downloadButtonImg.setAttribute('src', 'images/download.svg');
  downloadButton.appendChild(downloadButtonImg);
  downloadButton.addEventListener('click', async (_) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    const blob = await response.blob();
    const fileName = `${petName}.${blob.type.split('/')[1]}`;
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    setTimeout(() => {
      modalStatus = false;
      modal.style.display = 'none';
      root.style.overflow = 'visible';
      root.style.position = 'relative';
    }, 2000);
  });
  return downloadButton;
}
