/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export const NODE_KEY = 'id'; // Key used to identify nodes
export const EMPTY_TYPE = 'empty'; // Empty node type
export const NONE_TYPE = 'none'; // Empty type with icon
export const ORGANIZATION_TYPE = 'organization';
export const BUSINESS_TYPE = 'business';
export const PERSON_TYPE = 'person';
export const CITY_TYPE = 'city';
export const SPECIAL_TYPE = 'special';
export const EMPTY_SUBTYPE = 'emptyChild';
export const MASTER_SUBTYPE = 'masterChild';
export const IMPLISENSE_SUBTYPE = 'implisenseChild';
export const WIKIDATA_SUBTYPE = 'wikidataChild';
export const DBPEDIA_SUBTYPE = 'dbpediaChild';
export const SUBTYPE_POSTFIX = 'Child';
export const EMPTY_EDGE_TYPE = 'emptyEdge';
export const MULTIPLE_EDGE_TYPE = 'multipleEdge';
export const MANY_EDGE_TYPE = 'manyEdge';
export const SPECIAL_EDGE_TYPE = 'specialEdge';

export const validCategories = [ORGANIZATION_TYPE, BUSINESS_TYPE, PERSON_TYPE, CITY_TYPE];

export const dataSources = [
  { type: MASTER_SUBTYPE, color: '200, 70, 70', name: 'Master' },
  { type: IMPLISENSE_SUBTYPE, color: '74, 138, 184', name: 'ImpliSense' },
  { type: WIKIDATA_SUBTYPE, color: '51, 153, 103', name: 'WikiData' },
  { type: DBPEDIA_SUBTYPE, color: '249, 159, 29', name: 'DBpedia' },
  { type: EMPTY_SUBTYPE, color: '200, 0, 170', name: 'None' }
];
