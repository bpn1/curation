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

import React from 'react';
import keyBy from 'lodash/keyBy';
import { dataSources } from './constants';

const symbolStroke = '#333';
const symbolFill = '#aaa';

const EmptyShape = (
  <symbol viewBox="0 0 100 100" id="empty">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const NoneShape = (
  <symbol viewBox="0 0 100 100" id="none">
    <circle cx="50" cy="50" r="45" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
      transform="translate(37.5, 20)"
      width="50"
      height="50"
      stroke={symbolStroke}
      fill={symbolFill}
    />
  </symbol>
);

const OrganizationShape = (
  <symbol viewBox="0 0 100 100" id="organization">
    <circle cx="50" cy="50" r="45" />
    <path
      d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"
      transform="translate(37.5, 20)"
      width="50"
      height="50"
      stroke={symbolStroke}
      fill={symbolFill}
    />
  </symbol>
);

const BusinessShape = (
  <symbol viewBox="0 0 100 100" id="business">
    <circle cx="50" cy="50" r="45" />
    <path
      d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2
         2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"
      transform="translate(37.5, 20)"
      width="50"
      height="50"
      stroke={symbolStroke}
      fill={symbolFill}
    />
  </symbol>
);

const PersonShape = (
  <symbol viewBox="0 0 100 100" id="person">
    <circle cx="50" cy="50" r="45" />
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      transform="translate(37.5, 20)"
      width="50"
      height="50"
      stroke={symbolStroke}
      fill={symbolFill}
    />
  </symbol>
);

const CityShape = (
  <symbol viewBox="0 0 100 100" id="city">
    <circle cx="50" cy="50" r="45" />
    <path
      d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6
        8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
      transform="translate(37.5, 20)"
      width="50"
      height="50"
      stroke={symbolStroke}
      fill={symbolFill}
    />
  </symbol>
);

const SpecialShape = (
  <symbol viewBox="0 0 100 100" id="special">
    <rect transform="translate(50) rotate(45)" width="70" height="70" />
  </symbol>
);

function makeDataSourceChildShape(symbolId, color) {
  return (
    <symbol viewBox="0 0 100 100" id={symbolId}>
      <circle x="1" cx="50" cy="50" r="50" fill={'rgba(' + color + ', 0.5)'} strokeOpacity={0.0} />
    </symbol>
  );
}

function generateNodeSubtypes() {
  return keyBy(dataSources.map((source) => {
    const shapeId = source.name + 'Shape';
    const shape = makeDataSourceChildShape(shapeId, source.color);
    return { type: source.type, shapeId: '#' + shapeId, shape };
  }), t => t.type);
}

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor" />
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect transform="rotate(45)" x="25" y="-4.5" width="15" height="15" fill="currentColor" />
  </symbol>
);

const MultipleEdgeShape = (
  <symbol viewBox="0 0 50 50" id="multipleEdge">
    <rect transform="rotate(45)" x="25" y="-4.5" width="15" height="15" fill="currentColor" />
  </symbol>
);

const ManyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="manyEdge">
    <circle cx="25" cy="25" r="14" fill={symbolFill} />
    <rect transform="rotate(45)" x="28" y="-7.5" width="15" height="15" fill="currentColor" />
  </symbol>
);

export default {
  NodeTypes: {
    empty: {
      typeText: 'Empty',
      shapeId: '#empty',
      shape: EmptyShape,
    },
    none: {
      typeText: 'None',
      shapeId: '#none',
      shape: NoneShape,
    },
    organization: {
      typeText: 'Organization',
      shapeId: '#organization',
      shape: OrganizationShape
    },
    business: {
      typeText: 'Business',
      shapeId: '#business',
      shape: BusinessShape
    },
    person: {
      typeText: 'Person',
      shapeId: '#person',
      shape: PersonShape
    },
    city: {
      typeText: 'City',
      shapeId: '#city',
      shape: CityShape
    },
    special: {
      typeText: 'Special',
      shapeId: '#special',
      shape: SpecialShape
    }
  },
  NodeSubtypes: generateNodeSubtypes(),
  EdgeTypes: {
    emptyEdge: {
      shapeId: '#emptyEdge',
      shape: EmptyEdgeShape
    },
    specialEdge: {
      shapeId: '#specialEdge',
      shape: SpecialEdgeShape
    },
    multipleEdge: {
      shapeId: '#multipleEdge',
      shape: MultipleEdgeShape
    },
    manyEdge: {
      shapeId: '#manyEdge',
      shape: ManyEdgeShape
    }
  }
};
