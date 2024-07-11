export function truncateText(text, maxLength = 160) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
}

export function getRatingQuality(rating) {
  if (rating > 0 && rating < 50) return 'bad';
  if (rating > 50 && rating < 70) return 'medium';

  return 'good';
}

export function isAbsoluteUrl(url) {
  const pattern = new RegExp('^(https?:|ftp:|file:|//)', 'i');
  return pattern.test(url);
}