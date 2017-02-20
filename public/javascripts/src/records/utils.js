/**
 * records/utils.js
 */

import Immutable from "immutable";
export type ImmutableRecord = Immutable.fromJS<string, string>;


export function createImmutableRecord(attributes = {}) {
  return Immutable.fromJS(attributes);
}

export function mapRecord(record, payload) {
  Object.keys(payload).forEach(key => {
    record = record.set(key, payload[key]);
  })
  var result = record.toJSON();
  return result;
}
