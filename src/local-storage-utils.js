import startingPaletteData from './palettes.json';


const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getPalettes = () => getLocalStorageKey('palettes') || [];
export const setPalettes = (palettes) => setLocalStorageKey('palettes', palettes);
export const addPalette = (palette) => {
  const palettes = getPalettes();
  palettes.push(palette);
  setPalettes(palettes);
};
export const deletePalette = (uuid) => {
  setPalettes(getPalettes().filter((palette) => palette.uuid !== uuid));
}

// { "criticScore": 88, "audienceScore": 83, "domestic": 635763484, "genre": "comedy",    "title": "Barbie" },
export const resetPalettes = () => setLocalStorageKey('palettes', startingPaletteData);
export const initPalettesIfEmpty = () => {
  if (getPalettes().length === 0) resetPalettes();
}

initPalettesIfEmpty();