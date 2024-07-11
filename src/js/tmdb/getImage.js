export default function getImage(path, width = 500) {
  return `https://image.tmdb.org/t/p/w${width}${path}`;
}