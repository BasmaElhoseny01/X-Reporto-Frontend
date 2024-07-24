export type AnatomicalRegionsType = {
  [key: string]: number;
};

export const anatomicalRegions: AnatomicalRegionsType = {
  "right lung": 0,
  "right upper lung zone": 1,
  "right mid lung zone": 2,
  "right lower lung zone": 3,
  "right hilar structures": 4,
  "right apical zone": 5,
  "right costophrenic angle": 6,
  "right hemidiaphragm": 7,
  "left lung": 8,
  "left upper lung zone": 9,
  "left mid lung zone": 10,
  "left lower lung zone": 11,
  "left hilar structures": 12,
  "left apical zone": 13,
  "left costophrenic angle": 14,
  "left hemidiaphragm": 15,
  "trachea": 16,
  "spine": 17,
  "right clavicle": 18,
  "left clavicle": 19,
  "aortic arch": 20,
  "mediastinum": 21,
  "upper mediastinum": 22,
  "svc": 23,
  "cardiac silhouette": 24,
  "cavoatrial junction": 25,
  "right atrium": 26,
  "carina": 27,
  "abdomen": 28,
};

// Reversing key-value pairs to create index to key dictionary
export const anatomicalRegionsIndexToKey: { [key: number]: string } = {};
for (const key in anatomicalRegions) {
  if (Object.prototype.hasOwnProperty.call(anatomicalRegions, key)) {
    const value = anatomicalRegions[key];
    anatomicalRegionsIndexToKey[value] = key;
  }
}
