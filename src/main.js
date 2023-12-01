import './style.css'
import { v4 as uuidv4 } from 'uuid';
import { getPalettes, addPalette, resetPalettes } from './local-storage-utils';
import { renderPalette } from './dom-utils';

const handleFormSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData.entries());

  const newPalette = {
    uuid: uuidv4(),
    title: formObj.title,
    colors: [formObj.color1, formObj.color2, formObj.color3],
    temperature: formObj.temperature
  };
  addPalette(newPalette);
  renderPalettes();
}

const renderPalettes = () => {
  const palettes = getPalettes();
  const ul = document.querySelector('#palettes-list')
  ul.innerHTML = '';

  palettes.forEach((palette) => renderPalette(ul, palette));
}

const main = () => {
  // resetPalettes();

  renderPalettes();

  const form = document.querySelector('#new-palette-form');
  form.addEventListener('submit', handleFormSubmit);
}

main();