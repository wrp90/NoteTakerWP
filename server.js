//Dependencies
const express = require("express");

//Sets up express app
const app = express();
const PORT = 3000;


//Sets up Express app to handle the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Route to send html pages
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);
  

//Listen to PORT
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

