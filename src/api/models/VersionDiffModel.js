module.exports = {
  fields: {
    oldversion: {
      type: 'timeuuid'
    },
    newversion: {
      type: 'timeuuid'
    },
    id: {
      type: 'uuid'
    },
    aliases: {
      type: 'text',
    },
    category: {
      type: 'text'
    },
    master: {
      type: 'text'
    },
    name: {
      type: 'text'
    },
    properties: {
      type: 'text'
    },
    relations: {
      type: 'text'
    },
  },
  key: ['oldversion', 'newversion', 'id'],
  table_name: 'versiondiff'
};
