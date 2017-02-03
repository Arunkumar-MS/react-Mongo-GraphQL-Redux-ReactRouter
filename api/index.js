const fetch = require('graphql-fetch')('http://localhost:4000/api');
export default function api(query, args) {
    return fetch(query, args);
};
