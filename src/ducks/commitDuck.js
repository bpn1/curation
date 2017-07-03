import { statuses } from './apiDuck';
// used for the SubjectEditor format, property lists get seperated by ';'
function convertToEditable(subject) {
  const transformedSubject = Object.assign({}, subject);

  if (transformedSubject.hasOwnProperty('properties')) {
    transformedSubject.properties = Object.entries(transformedSubject.properties).map(([key, value]) => ({
      name: key,
      value: value.join('; ') // TODO display differently?
    }));
  }
  return { [transformedSubject.id]: transformedSubject };
}

function convertFromEditable(subject) {
  const transformedSubject = Object.assign({}, subject);
  let newProps = {};
  if (subject.hasOwnProperty('properties')) {
    newProps = Object.entries(transformedSubject.properties).map(([key, value]) => ({
      [key]: value.split('; ') // TODO display differently?
    }));
  }
  transformedSubject.properties = Object.assign({}, ...newProps);
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

export const commitExtension = (path) => ({
  types: ['FETCH_FULFILLED', 'GET_FULFILLED', 'GET_MULTIPLE_FULFILLED', 'CREATE', 'UPDATE', 'DELETE'],

  // TODO handle status of mutliple actions started simultaneously

  reducer: (state, action, { types }) => {
    switch (action.type) {
      case types.CREATE:
        return {
          ...state,
          status: { ...state.status, [types.CREATE]: statuses.SAVED },
          created: { ...state.created, ...convertFromEditable(action.createdObj) },
          entities: [action.createdObj, ...state.entities]
        };
      case types.UPDATE:
        const obj = convertFromEditable(action.updatedObj);
        const created = { ...state.created, ...obj };
        const updated = { ...state.updated, ...obj };
        // newly created object changes does not create an entry in updated
        const isNewlyCreated = action.updatedObj.id in state.created;
        const stage = isNewlyCreated ? { created } : { updated };
        return {
          ...state,
          ...stage,
          status: { ...state.status, [types.UPDATE]: statuses.SAVED },
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
      case types.GET_PENDING:
        return {
          ...state,
          status: { ...state.status, [types.GET]: statuses.LOADING },
          error: { ...state.error, [types.GET]: undefined }
        };
      case types.GET_FULFILLED:
        const getEntity = Object.assign({}, replaceWithStaged(action.payload.data, state.updated, state.created));
        return {
          ...state,
          entity: getEntity,
          editableSubjects: { ...state.editableSubjects, ...convertToEditable(getEntity) },
          status: { ...state.status, [types.GET]: statuses.READY }
        };
      case types.GET_BY_ID_FULFILLED:
        const getIdEntity = Object.assign({}, replaceWithStaged(action.payload.data[0], state.updated, state.created));
        return {
          ...state,
          entity: getIdEntity,
          editableSubjects: { ...state.editableSubjects, ...convertToEditable(getIdEntity) },
          status: { ...state.status, [types.GET_BY_ID]: statuses.READY }
        };
      case types.GET_MULTIPLE_FULFILLED:
        // concat entities fetched with axios.all
        const fetchedEntities = action.payload
          .filter((payload, i) => {
            if (payload.data[0] === undefined) {
              console.warn(payload.config.url.split('=')[1].replace('&count', '') + ' was not found');
            }
            return payload.data[0] !== undefined;
          })
          .map(payload => payload.data[0]);
        return {
          ...state,
          entities: Object.values(state.created).concat(fetchedEntities
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
});
