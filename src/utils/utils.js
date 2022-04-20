export function capitalize(word) {
  if (typeof word !== 'string') {
    word = '' + word + '';
  }
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}
