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

module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    aliases: {
      type: 'list',
      typeDef: '<text>'
    },
    aliases_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    category: {
      type: 'text'
    },
    category_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    master: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    master_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    name: {
      type: 'text'
    },
    name_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    properties: {
      type: 'map',
      typeDef: '<text, frozen<list<text>>>'
    },
    properties_history: {
      type: 'map',
      typeDef: '<text, frozen<list<frozen<version>>>>'
    },
    relations: {
      type: 'map',
      typeDef: '<uuid, frozen<map<text, text>>>'
    },
    relations_history: {
      type: 'map',
      typeDef: '<uuid, frozen<map<text, frozen<list<frozen<version>>>>>>'
    },
  },
  key: ['id'],
  table_name: 'subject'
};
