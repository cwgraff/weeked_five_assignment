
var express = require('express');
var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

app.use(express.static('server/public'));

app.use('/', index);
app.use('/api', api);


app.get('/*', function(request, response){
    response.redirect('/');
});




var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Ready for some activity on Port', port);
});
