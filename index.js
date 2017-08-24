const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
let app = express();

let events = [];
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


app.post("/event/add", function(req, resp) {
        let nom = req.body.nom;
        let place = req.body.place;
        console.log(req.body.place);
        let event = {
            name: nom,
            place: place,
        }
        events.push(event);
        console.log(events);

        resp.send('événement ajouté !');
    })
    /*
    app.get("/", function(req, resp) {
        resp.render('index', {
            name: 'Audrey',
            // adjective: 'happy',
            // nameList: db
            eventsList: events
        });
    });
    */
app.get("/", function(req, resp) {
<<<<<<< HEAD
    let str = mustache.render(" Welcome {{name}}", {
        name: "Audrey",
=======
    resp.render('index', {
        name: 'Hayet',
        // adjective: 'happy',
        // nameList: db
>>>>>>> 6e12743c4a894eb3302392fa7ba9f4f4dda7251d
        eventsList: events
    })
    resp.send(str)
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
    console.log('Example app listening on port 8080!');
});