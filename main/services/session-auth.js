const { LocalStorage } = require('node-localstorage');

const storage = new LocalStorage('./session/');

storeSessionTokenHandler = (token) => {
    storage.setItem('token', token);
}

tokenHandler = () => {
    return storage.getItem('token');
}

closeSessionHandler = () => {
    storage.removeItem('token');
}

sessionExist = () => {
    if(storage.getItem('token')) return true;

    return false;
}

module.exports = {
    storeSessionTokenHandler,
    tokenHandler,
    closeSessionHandler,
    sessionExist
}