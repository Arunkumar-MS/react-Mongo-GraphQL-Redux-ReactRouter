import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';
var app = express()
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.listen(8080, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`Server is now running on localhost: 8080`)
})

app.get('/', function(req, res) {
    res.render('index.html');
});
app.use('/api', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));
