/* eslint-disable no-undef */
/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
const createSingleImage = (imgSource, imgDescription, animalName, index) => {
  //HIDDEN-PROPERTIES
  const hiddenAnimalDescription = document.createElement('div');

  hiddenAnimalDescription.setAttribute(
    'class',
    `hiddenDescription  hiddenDescription-${index}`
  );
  hiddenAnimalDescription.textContent = imgDescription;

  const hiddenAnimalTitle = document.createElement('div');
  hiddenAnimalTitle.textContent = animalName;
  hiddenAnimalTitle.setAttribute('class', `hiddenTitle hiddenTitle-${index}`);

  const selectButton = document.createElement('div');
  const selectButtonImage = document.createElement('img');
  selectButton.setAttribute('class', `selectButton selectButton-${index}`);

  selectButtonImage.setAttribute('class', 'selectButtonImage');
  selectButtonImage.setAttribute('src', 'images/checked.svg');
  selectButton.appendChild(selectButtonImage);

  const expandImageContainer = document.createElement('div');
  expandImageContainer.setAttribute(
    'class',
    `expand-image-wrap expand-image-wrap-${index}`
  );
  const expandImage = document.createElement('img');
  expandImage.setAttribute('class', `expand-image`);
  expandImage.setAttribute('src', 'images/full-screen.svg');
  expandImageContainer.appendChild(expandImage);

  // VISIBILE-PROPERTIES
  const imageContainer = document.createElement('div');
  const imageTag = document.createElement('img');
  const imageWraperClass = `imageWraper-${index}`;
  imageContainer.setAttribute('class', `imageWraper ${imageWraperClass}`);
  imageTag.setAttribute('class', 'imageTag');
  imageTag.setAttribute('src', imgSource);

  //DOM APPENDS
  imageContainer.appendChild(imageTag);
  imageContainer.appendChild(hiddenAnimalDescription);
  imageContainer.appendChild(hiddenAnimalTitle);
  imageContainer.appendChild(selectButton);
  imageContainer.appendChild(expandImageContainer);

  imageContainer.onclick = () => {
    return addSelectedImage(imgSource, animalName, index, imageWraperClass);
  };

  return imageContainer;
};
