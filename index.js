const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
let app = express();

let events = [];
let users = [];


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('/public'));



app.post("/event/add", function(req, resp) {
    let nom = req.body.name;
    let place = req.body.place;
    console.log(req.body.place);
    let event = {
        name: nom,
        place: place,
    }
    events.push(event);
    console.log(events);

    //   resp.send('événement ajouté !');
})

app.post("/user/add", function(req, resp) {
    let pseudo = req.body.pseudo;
    let mdp = req.body.password;
    let user = {
        pseudo: pseudo,
        password: password,
    }
    users.push(user);
    console.log(users);

})



app.delete("/event/del", function(req, resp) {
    res.send('DELETE request to homepage');
})

app.get("/", function(req, resp) {
    resp.render('index', {
        name: 'Hayet',
        //adjective: 'happy',
        //nameList: db,
        eventsList: events
    });
});

app.get("/new-user.html", function(req, resp) {
    resp.render('new-user', {
        pseudo: 'pseudo',
    });
});

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })
});

app.set('views', './template'); // specify the views directory
app.set('view engine', 'html'); // register the template engine


app.listen(8080, function() {
    console.log('Example app listening on port8080!');
});