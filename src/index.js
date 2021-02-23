/* eslint-disable no-undef */
//Global State
let selectedImages = [];

//SELECTORS
const mainContent = document.querySelector('.main-content');

function preLoadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px 500px 0px',
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preLoadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

const addSelectedImage = (imgSrc, index) => {
  if (selectedImages.includes(imgSrc)) {
    selectedImages = selectedImages.filter((item) => item !== imgSrc);
    document.querySelector(`.selectButton-${index}`).style.opacity = 0;
  } else {
    document.querySelector(`.selectButton-${index}`).style.opacity = 1;
    selectedImages.push(imgSrc);
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
    data.forEach((animal, index) => {
      const createdImage = createSingleImage(
        animal.url,
        animal.description,
        animal.title,
        index,
        addSelectedImage
      );
      mainContent.appendChild(createdImage);
      const animation = gsap
        .timeline()
        .to(`.hiddenDescription-${index}`, { opacity: 1, y: 0 })
        .to(`.hiddenTitle-${index}`, { opacity: 1, y: 0 }, 0);

      animation.pause();
      const image = createdImage.children[0];
      createdImage.addEventListener('mouseenter', (_) => {
        image.style.transform = 'scale(1.01)';
        image.style.filter = 'brightness(60%)';
        animation.play();
      });
      image.style.opacity = '0';
      createdImage.addEventListener('mouseleave', (e) => {
        if (!selectedImages.includes(e.target.firstChild.src)) {
          image.style.transform = 'scale(1)';
          image.style.filter = 'brightness(100%)';
          animation.reverse();
        }
      });

      image.addEventListener('load', (e) => {
        const height = image.clientHeight + 20;
        const spans = Math.ceil(height / 10);
        createdImage.style.gridRowEnd = `span ${spans}`;
        image.style.opacity = '1';
      });
    });
    const images = document.querySelectorAll('[data-src]');
    images.forEach((image) => {
      imgObserver.observe(image);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
