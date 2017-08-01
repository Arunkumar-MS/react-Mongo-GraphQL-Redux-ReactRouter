const fetch = require('graphql-fetch')('https://node-mongo-graphql.herokuapp.com/api');
export default function api(query, args) {
    return fetch(query, args);
};
