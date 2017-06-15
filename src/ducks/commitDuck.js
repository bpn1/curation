// used for the SubjectEditor format, property lists get seperated by ';'
function convertToEditable(subject) {
  const transformedSubject = subject;

  if (transformedSubject.hasOwnProperty('properties')) {
    transformedSubject.properties = Object.keys(transformedSubject.properties).map(key => ({
      name: key,
      value: transformedSubject.properties[key].join('; ') // TODO display differently?
    }));
  }
  return { [transformedSubject.id]: transformedSubject };
}

function mapById(arr) {
  return arr.reduce((map, obj) => {
    map[obj.id] = obj;
    return map;
  }, {});
}

// replace first with staged, if not found use alternative
function replaceWithStaged(entity, staged, stagedAlternative) {
  if (staged && entity.id in staged) {
    return staged[entity.id];
  } else if (stagedAlternative && entity.id in stagedAlternative) {
    return stagedAlternative[entity.id];
  }
  return entity;
}

export const commitExtension = {
  types: ['FETCH_FULFILLED', 'GET_FULFILLED', 'GET_MULTIPLE_FULFILLED', 'CREATE', 'UPDATE', 'DELETE', 'GET_FULFILLED'],

  // TODO handle status of mutliple actions started simultaniously

  reducer: (state, action, { types, statuses }) => {
    switch (action.type) {
      case types.CREATE:
        return {
          ...state,
          status: { ...state.status, [types.CREATE]: statuses.SAVED },
          created: { ...state.created, [action.createdObj.id]: action.createdObj },
          entities: [action.createdObj, ...state.entities]
        };
      case types.UPDATE:
        const updated = { ...state.updated, [action.updatedObj.id]: action.updatedObj };
        // updated object was newly created, updating created entry instead of adding to update
        if (action.updatedObj.id in state.created) {
          return {
            ...state,
            status: { ...state.status, [types.UPDATE]: statuses.SAVED },
            created: { ...state.created, [action.updatedObj.id]: action.updatedObj },
            entities: state.entities.map(entity => replaceWithStaged(entity, updated))
          };
        }
        return {
          ...state,
          status: { ...state.status, [types.UPDATE]: statuses.SAVED },
          updated,
          entities: state.entities.map(entity => replaceWithStaged(entity, updated))
        };
      case types.DELETE:
        const deleted = {
          ...state.deleted,
          ...mapById(action.deletedObjs)
        };
        return {
          ...state,
          status: { ...state.status, [types.DELETE]: statuses.SAVED },
          deleted,
          entities: state.entities.filter(entity => !(entity.id in deleted))
        };
      case types.FETCH_FULFILLED:
        return {
          ...state,
          entities: Object.values(state.created)
            .concat(action.payload.data
              .map(entity => replaceWithStaged(entity, state.updated))
              .filter(entity => !(entity.id in state.deleted))),
          status: { ...state.status, [types.FETCH]: statuses.READY }
        };
      case types.GET_FULFILLED:
        const getEntity = replaceWithStaged(action.payload.data, state.updated, state.created);
        return {
          ...state,
          entity: getEntity,
          editableSubjects: { ...state.editableSubjects, ...convertToEditable(getEntity) },
          status: { ...state.status, [types.GET]: statuses.READY }
        };
      case types.GET_MULTIPLE_FULFILLED:
        return {
          ...state,
          entities: Object.values(state.created).concat(action.payload.data
            .map(entity => replaceWithStaged(entity, state.updated))
            .filter(entity => !(entity.id in state.deleted))),
          status: { ...state.status, [types.GET_MULTIPLE]: statuses.READY }
        };
      default:
        return state;
    }
  },

  creators: ({ types }) => ({
    create: newObj => ({ type: types.CREATE, createdObj: newObj }),
    update: newObj => ({ type: types.UPDATE, updatedObj: newObj }),
    delete: objs => ({ type: types.DELETE, deletedObjs: objs }),
  }),
  // parent initialState is overwritten, so define all needed here
  initialState:
    () => ({
      status: {},
      error: {},
      entities: [],
      editableSubjects: {},
      created: {},
      deleted: {},
      updated: {}
    })
};
