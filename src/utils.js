const STORAGE_KEY = 'notes';
export const truncateText = (text, maxLength = 30) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export const saveToStorage = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const loadFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};
