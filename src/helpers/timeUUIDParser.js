function parseTimeUUID(uuidString) {
  const uuidArray = uuidString.split('-'),
    timeString = [
      uuidArray[2].substring(1),
      uuidArray[1],
      uuidArray[0]
    ].join('');
  return parseInt(timeString, 16);
}

export default function getDateFromTimeUUID(uuidString) {
  if (!uuidString) {
    return '';
  }
  const time = parseTimeUUID(uuidString) - 122192928000000000,
    millisecs = Math.floor(time / 10000);
  return new Date(millisecs);
}

