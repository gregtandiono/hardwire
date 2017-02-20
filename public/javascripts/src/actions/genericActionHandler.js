function genericActionHandler(type, response = null, clientObj = {}) {
    return {
        type,
        response,
        clientObj
    }
}

export default genericActionHandler