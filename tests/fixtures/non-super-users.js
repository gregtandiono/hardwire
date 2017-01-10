/**
 * non-super-users.js
 *
 * [FIXTURE]
 */

module.exports = {
  validOperatorInput: {
    id: "003ac599-2b2a-40ad-8c29-b27ce5c314dc",
    name: "abeng",
    username: "iamabeng",
    type: "operator",
    password: "iAmTheBestOperator01nTheW0rlD"
  },

  invalidOperatorInput: {
    id: "75742161-f007-454d-9072-d7f8301b403a",
    name: "",
    username: "iamabeng",
    type: "operator",
    password: "iAmTheBestOperator01nTheW0rlD"
  },

  validManagerInput: {
    id: "270ad53a-fe43-4e99-b952-20baf3079b0e",
    name: "aboy",
    username: "cibaikiasu",
    type: "manager",
    password: "cibaikiasuU1j3"
  },

  invalidManagerInput: {
    id: "cfdaf10e-f038-468b-b4e5-2faacf6c9bfc",
    name: "",
    username: "",
    type: "manager",
    password: "cibaikiasuU1j3"
  }
}
