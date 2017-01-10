/**
 * require-local.js
 * [GLOBAL HELPER]
 *
 * this helper allows require from root path instead of absolute
 */

function requireLocal(name) {
  var __appBaseDir = __dirname;
  return require(__appBaseDir + "/" + name);
}

module.exports = requireLocal;
