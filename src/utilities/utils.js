export const currentDateAndTime = () =>
  new Date().toLocaleDateString() + " , " + new Date().toLocaleTimeString();

export const formatTextInput = (text) =>
  text.slice(0, 1).toUpperCase() + text.slice(1);
