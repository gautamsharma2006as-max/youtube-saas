export function generateThumbnail(topic) {
  return `https://dummyimage.com/1280x720/000/fff.png&text=${encodeURIComponent(
    topic
  )}`;
}
