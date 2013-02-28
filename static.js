var express = require('express'),
        app = express();
        
app.use(express.logger());
app.use(express.static(__dirname));

function handleRoute(res, route) {
    res.set('Content-Type', 'text/html');
    res.sendfile(__dirname + '/' + route + '.html');
}


app.get('/about*', function(req, res) {
    if(req.path.substr(req.path.length -1, 1) !== "/") {
        res.redirect(req.path + '/');
    } else {
        handleRoute(res, 'about');
    }
});

app.get('/blog*', function(req, res) {
    if(req.path.substr(req.path.length -1, 1) !== "/") {
        res.redirect(req.path + '/');
    } else {
        handleRoute(res, 'blog');
    }
});

app.get('/works*', function(req, res) {
    if(req.path.substr(req.path.length -1, 1) !== "/") {
        res.redirect(req.path + '/');
    } else {
        handleRoute(res, 'works');
    }
});

app.get('/contact*', function(req, res) {
    if(req.path.substr(req.path.length -1, 1) !== "/") {
        res.redirect(req.path + '/');
    } else {
        handleRoute(res, 'contact');
    }
});


app.listen(8888);