import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';
import moesifExpress from 'moesif-express';
import {
    MOESIF
} from './config';

var app = express()
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
const moesif = moesifExpress({applicationId: MOESIF});
app.use(moesif);
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
