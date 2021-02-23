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

  hiddenAnimalTitle.textContent = animalName;
  hiddenAnimalTitle.setAttribute('class', `hiddenTitle hiddenTitle-${index}`);

  // VISIBILE-PROPERTIES
  const imageContainer = document.createElement('div');
  const imageTag = document.createElement('img');

  imageContainer.setAttribute('class', 'imageWraper');
  imageTag.setAttribute('class', 'imageTag');
  imageTag.setAttribute('data-src', imgSource);

  //DOM APPENDS
  imageContainer.appendChild(imageTag);
  imageContainer.appendChild(hiddenAnimalDescription);
  imageContainer.appendChild(hiddenAnimalTitle);
  imageContainer.appendChild(selectButton);
  // imageContainer.appendChild(placeholder);
  imageContainer.onclick = () => {
    return addSelectedImage(imgSource, index);
  };

  return imageContainer;
};
