export function randomString(length) {
  return (Math.random() + 1).toString(36).substring(2, length + 2).replace(new RegExp('[0-9]'), 'm');
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomHistogram() {
  // randomly generated block data
  const blockNames = [];
  const blockSizes1 = [];
  const blockSizes2 = [];
  const blockData = [];
  const blockCount = randomInt(5, 50);

  for (let b = 0; b < blockCount; b++) {
    blockNames[b] = randomString(3);
    blockSizes1[b] = randomInt(200, 700);
    blockSizes2[b] = randomInt(1, 1000);
  }

  const descending = (a, b) => b - a;

  blockSizes1.sort(descending);
  blockSizes2.sort(descending);

  for (let b = 0; b < blockCount; b++) {
    blockData[b] = {
      blockName: blockNames[b],
      blockSize1: blockSizes1[b],
      blockSize2: blockSizes2[b]
    };
  }

  return blockData;
}
