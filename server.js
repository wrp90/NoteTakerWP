//Dependencies
const express = require("express");
const fs = require('fs');
const path = require('path');

//Sets up express app
const app = express();
const PORT = process.env.PORT || 3000;


//Sets up Express app to handle the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//DB const
var dbInput = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'));

//Get notes html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Get notes to stay on page after save
app.get("/api/notes", function (req, res) {
    // console.log(res)
    res.json(dbInput);
});

//Post to write file to db.json
app.post("/api/notes", function (req, res) {
    let newID = (dbInput.length).toString();
    let newNote = req.body;
    newNote.id = newID;
    dbInput.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbInput));
    res.json(dbInput);
});

//Delete notes
app.delete('/api/notes/:id', (req, res) => {
    let newID = req.params.id;
    for (let i = 0; i < dbInput.length; i++){
        if (newID === dbInput[i].id) {
            dbInput.splice(i, 1);
            break;
        }
    };
    fs.writeFileSync('./db/db.json', JSON.stringify(dbInput));
    res.json(dbInput);
});

//Get html pages
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
  

//Listen to PORT
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

