export default function extractPLIDFromURL(url) {
  const regex = /\/PLID(\d+)\b/;
  const match = url.match(regex);

  if (match) {
    return `PLID${match[1]}`;
  } else {
    return null; // or any default value you prefer
  }
}
