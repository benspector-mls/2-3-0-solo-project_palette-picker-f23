import { getPalettes } from './local-storage-utils';

const createColorDiv = (colorCode) => {
  const colorContainer = document.createElement('div');
  const colorText = document.createElement('p');
  colorText.innerHTML = '<span style="color: white;">Example</span> Text'
  colorText.classList.add('color-text');
  colorText.style.background = colorCode;

  const colorCopy = document.createElement('p');
  colorCopy.innerText = `Copy \n${colorCode}`;
  colorCopy.classList.add('color-copy');
  colorCopy.dataset.color = colorCode;

  colorContainer.classList.add('color-container');
  colorContainer.append(colorText, colorCopy);
  return colorContainer;
}

const renderPalette = (parent, paletteData) => {
  const { title, temperature, colors, uuid } = paletteData;

  const li = document.createElement('li');
  li.dataset.uuid = uuid;

  const h3 = document.createElement('h3');
  h3.innerText = title

  li.append(h3);
  colors.forEach((color) => {
    li.append(createColorDiv(color));
  })

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-palette');

  const temperatureText = document.createElement('p');
  temperatureText.innerText = temperature;
  temperatureText.classList.add('temperature')
  temperatureText.classList.add(temperature)

  li.append(deleteButton, temperatureText);
  parent.append(li);
}

export const renderPalettes = () => {
  const palettes = getPalettes();
  const ul = document.querySelector('#palettes-list')
  ul.innerHTML = '';

  palettes.forEach((palette) => renderPalette(ul, palette));
}