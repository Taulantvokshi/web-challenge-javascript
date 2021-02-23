/* eslint-disable no-undef */
//Global State
let selectedImages = [];
let selected = 0;
let animationInfo = [];

//SELECTORS
const mainContent = document.querySelector('.main-content');
const imageBadges = document.querySelector('.selected-images');

// function preLoadImage(img) {
//   const src = img.getAttribute('data-src');
//   if (!src) {
//     return;
//   }
//   img.src = src;
// }

// const imgOptions = {
//   threshold: 0.3,
//   rootMargin: '0px 0px 500px 0px',
// };

// const imgObserver = new IntersectionObserver((entries, imgObserver) => {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) {
//       return;
//     } else {
//       preLoadImage(entry.target);
//       imgObserver.unobserve(entry.target);
//     }
//   });
// }, imgOptions);

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

      image.addEventListener('load', (e) => {
        const height = image.clientHeight + 20;
        const spans = Math.ceil(height / 10);
        createdImage.style.gridRowEnd = `span ${spans}`;
        image.style.opacity = '1';
      });

      const expandIcon = document.querySelector('.expand-image-wrap');
      expandIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('hello');
      });
    });
    // const images = document.querySelectorAll('[data-src]');
    // images.forEach((image) => {
    //   imgObserver.observe(image);
    // });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
