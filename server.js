const express = require ("express");
const bodyParser = require ("body-parser");
const serverConfig = require('./configs/server.config');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/movie.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Application started on port ${serverConfig.PORT}`);
})
