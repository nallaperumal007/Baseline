export const camelCaseToWords = (key) => {
  // Using regular expression to split the key into words
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  // Capitalizing the first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  // Joining the words with spaces
  return words.join(" ");
};

export function snakeCaseToWords(snakeCaseString) {
  return snakeCaseString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
