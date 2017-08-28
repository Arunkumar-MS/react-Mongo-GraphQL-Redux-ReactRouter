import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';
import expressLogging from 'express-logging';
import logger from 'logops';
import { REDIS_URl } from './config';
import redis from 'redis';

const app = express();
const client = redis.createClient(REDIS_URl);
app.use(expressLogging(logger));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.listen((process.env.PORT || 4000), (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`Server is now running on localhost: ${process.env.PORT || 4000}`)
})

app.get('/', function(req, res) {
    res.render('index.html');
});
app.use('/api', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));
