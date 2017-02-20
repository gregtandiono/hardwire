/**
 * utils/uuid.js
 * 
 * this is to help generate UUID from the client-side
 * and it should be generated from the client-side.
 * 
 * But server also generates UUID if request body does not provide any.
 */

import * as uuid from "node-uuid";

function generateUUID() {
  return uuid.v4();
}

export default generateUUID;