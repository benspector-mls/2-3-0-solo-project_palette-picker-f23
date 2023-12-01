const createColorDiv = (colorCode) => {
  const colorContainer = document.createElement('div');
  const colorText = document.createElement('p');
  colorText.innerHTML = '<span style="color: white;">Example</span> Text'
  colorText.classList.add('color-text');

  const colorCopy = document.createElement('p');
  colorCopy.innerText = `Copy ${colorCode}`;

  colorContainer.classList.add('color-container');
  colorContainer.append(colorText, colorCopy);
  return colorContainer;
}

export const renderPalette = (parent, paletteData) => {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  h3.innerText = paletteData.title

  li.append(h3);
  paletteData.colors.forEach((color) => {
    li.append(createColorDiv(color));
  })

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  const temperature = document.createElement('p');
  temperature.innerText = paletteData.temperature;

  li.append(deleteButton, temperature);
  parent.append(li);
}