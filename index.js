const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
let app = express();

let events = [{
        name: "coding Dojo",
        place: "tour du web"
    },
    {
        name: "apprendre à coder",
        place: "simplon"
    },
    {
        name: "Javascript",
        place: "Paris"
    }

];
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('template'));

app.get("/", function(req, resp) {
    resp.render('index', {
        //name: 'Audrey',
        // adjective: 'happy',
        // nameList: db
        eventsList: events
    });
});


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

console.log(events);

// app.get("/test", function(req, resp) {
//     let str = mustache.render("Hello {{name}}!!!", {
//         name: "Audrey"
//     })
//     resp.send(str)
// });


app.get("event")

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

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});