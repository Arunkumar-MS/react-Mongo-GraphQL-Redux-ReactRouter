const fetch = require('graphql-fetch')('http://localhost:8080/api');
export default function api(query, args) {
    return fetch(query, args);
};
