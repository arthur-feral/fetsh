import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';

interface JsonApiObject {
  id: string,
  type: string,
  attributes: object
  relationships?: object
}

interface JsonApiObjectHashMap {
  [id: string]: JsonApiObject
}

interface ConvertersOption {
  [index: string]: any
}

interface JsonApiPayload {
  data: JsonApiObject,
  included: JsonApiObject[],
}

interface JsonApiArrayPayload {
  data: JsonApiObject[],
  included: JsonApiObject[],
}

const defaultConverter = (entity: JsonApiObject) => entity;

export default (jsonApiPayload: JsonApiPayload | JsonApiArrayPayload, converters: ConvertersOption | null) => {
  let entitiesStore: {
    [type: string]: JsonApiObjectHashMap
  } = {};

  // Handle the 204 no content situation
  if (isEmpty(jsonApiPayload)) {
    return entitiesStore;
  }

  const includedEntities: JsonApiObject[] = jsonApiPayload.included || [];
  const payloadIsArray = isArray(jsonApiPayload.data);
  let data;
  if (isArray) {
    data = jsonApiPayload.data as JsonApiObject[];
  } else {
    data = [jsonApiPayload.data as JsonApiObject];
  }

  const entities: JsonApiObject[] = [...includedEntities, ...data];
  entities.forEach((entity: JsonApiObject) => {
    if (!entitiesStore[entity.type]) {
      entitiesStore[entity.type] = {};
    }

    const converter = (converters !== null && converters[entity.type]) || defaultConverter;
    const model = {
      id: entity.id,
      ...entity.attributes,
      ...mapValues(entity.relationships, (relation: any) => {
        if (isArray(relation.data)) {
          return reduce(relation.data,
            (relatedEntities: any[], relatedEntity) => {
              let entityFromStore = get(entitiesStore, `[${relatedEntity.type}][${relatedEntity.id}]`);
              if (isUndefined(entityFromStore)) {
                entityFromStore = assign({ _isLoaded: false }, relatedEntity);
              }

              relatedEntities.push(entityFromStore);
              return relatedEntities;
            },
            []);
        }
        const entityFromStore = get(entitiesStore, `[${relation.data.type}][${relation.data.id}]`);
        if (isUndefined(entityFromStore)) {
          return assign({ _isLoaded: false }, relation.data);
        }

        return entityFromStore;
      }),
    };

    entitiesStore[entity.type][model.id] = converter(model);
  });

  if (payloadIsArray) {
    return map(jsonApiPayload.data, (e: JsonApiObject) => get(entitiesStore, `[${e.type}][${e.id}]`));
  }
  const payloadData: JsonApiObject = jsonApiPayload.data as JsonApiObject;
  return entitiesStore[payloadData.type][payloadData.id];
};

