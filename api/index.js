const fetch = require('graphql-fetch')('http://localhost:4000/api');

class fetchApi {
    fetchResource(query, args) {
        return fetch(query, args);
    }
  }

const api = (function(){
    let instance;
    function createInstance() {
        instance = new fetchApi();
        return instance;
    }
    if (!instance) {
        return createInstance();
    }
    return instance
})();

export default api;
