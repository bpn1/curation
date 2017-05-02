module.exports = {
  id: 'uuid',
  aliases: 'list<text>',
  aliases_history: 'list<frozen<version>>',
  category: 'text',
  category_history: 'list<frozen<version>>',
  name: 'text',
  name_history: 'list<frozen<version>>',
  properties: 'map<text, frozen<list<text>>>',
  properties_history: 'map<text, frozen<list<frozen<version>>>>',
  relations: 'map<uuid, frozen<map<text, text>>>',
  relations_history: 'map<uuid, frozen<map<text, frozen<list<frozen<version>>>>>>',
};
