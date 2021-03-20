//Dependencies
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
const dbInput = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'));

module.exports = function(app) {

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });
      
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, './db/db.json'))
    });

    // app.get('/api/notes', (req, res) => {
    //     res.json(dbInput);
    // })
    
    app.post("/api/notes", function (req, res) {
        console.log('res: ', res)
        let newID = (dbInput.length).toString();
        let newNote = req.body;
        newNote.id = newID;
        dbInput.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(dbInput));
        res.json(dbInput);
    });
   
}






