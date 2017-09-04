const url = process.env.IS_LOCAL ? 'http://localhost:4000/api' : 'node-mongo-graphql.herokuapp.com/api';
const fetch = require('graphql-fetch')(url);
export default function api(query, args) {
    return fetch(query, args);
};
