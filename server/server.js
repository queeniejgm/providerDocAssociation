const express = require("express")
const cors = require('cors')
const app = express();
const PORT = 8000;
const DB = 'development-and-learnin'

app.use(cors(), express.json(), express.urlencoded({extended:true}))

require("./config/mongoose")(DB);

require("./routes/routes")(app)

app.listen(PORT, () => console.log('server up on port 8000'))