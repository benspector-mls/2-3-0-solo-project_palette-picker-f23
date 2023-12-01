import './style.css'
import { v4 as uuidv4 } from 'uuid';
import { addPalette, deletePalette, resetPalettes } from './local-storage-utils';
import { renderPalettes } from './dom-utils';

const handleDeletePalette = (e) => {
  if (!e.target.matches('.delete-palette')) return;
  const uuid = e.target.parentElement.dataset.uuid;
  deletePalette(uuid);
  renderPalettes();
}

const handleColorCopy = async (e) => {
  if (!navigator.clipboard) return;
  if (!e.target.matches('.color-copy')) return;
  try {
    const { dataset, textContent } = e.target;
    await navigator.clipboard.writeText(dataset.color);
    e.target.textContent = 'Copied to clipboard!';
    setTimeout(() => { e.target.textContent = textContent }, 1000)
  } catch (err) {
    console.error('Failed to copy!', err);
  }
}

const handleUlClick = (e) => {
  if (e.target.matches('.color-copy')) handleColorCopy(e);
  if (e.target.matches('.delete-palette')) handleDeletePalette(e);
}

const handleReset = () => {
  resetPalettes();
  renderPalettes();
};

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

  form.reset();
}

const main = () => {
  renderPalettes();

  const ul = document.querySelector('#palettes-list');
  ul.addEventListener('click', handleUlClick);

  const resetButton = document.querySelector('#reset-to-defaults');
  resetButton.addEventListener('click', handleReset);

  const form = document.querySelector('#new-palette-form');
  form.addEventListener('submit', handleFormSubmit);
}

main();