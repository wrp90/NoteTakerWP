//Dependencies
const path = require('path');



//Exporting a function to 'get' the notes and index html pages
module.exports = function(app){

    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    app.get("*", (req, res)=> {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};




