// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'empty'; // Empty node type
export const NONE_TYPE = 'none'; // Empty type with icon
export const ORGANIZATION_TYPE = 'organization';
export const BUSINESS_TYPE = 'business';
export const PERSON_TYPE = 'person';
export const CITY_TYPE = 'city';
export const SPECIAL_TYPE = 'special';
export const EMPTY_SUBTYPE = 'emptyChild';
export const IMPLISENSE_SUBTYPE = 'implisenseChild';
export const WIKIDATA_SUBTYPE = 'wikidataChild';
export const DBPEDIA_SUBTYPE = 'dbpediaChild';
export const SUBTYPE_POSTFIX = 'Child';
// export const SPECIAL_CHILD_SUBTYPE = 'specialChild';
export const EMPTY_EDGE_TYPE = 'emptyEdge';
export const SPECIAL_EDGE_TYPE = 'specialEdge';
export const COOCCURRENCE_EDGE_TYPE = 'coOccurrenceEdge';
export const NODE_KEY = 'id'; // Key used to identify nodes

export const relationTypes = [
  { type: COOCCURRENCE_EDGE_TYPE, name: 'co-occurrence' }
  // 'partnership', 'owned by', 'master', ...
];

export const dataSources = [
  { type: EMPTY_SUBTYPE, color: '200, 70, 70', name: 'None' },
  { type: IMPLISENSE_SUBTYPE, color: '74, 138, 184', name: 'ImpliSense' },
  { type: WIKIDATA_SUBTYPE, color: '51, 153, 103', name: 'WikiData' },
  { type: DBPEDIA_SUBTYPE, color: '249, 159, 29', name: 'DBpedia' }
];
