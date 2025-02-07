const express = require("express");
const connectDB = require("./database/dbConnection");
const cors = require("cors");
const registerRoute = require('./routes/authentication')
const homeProtected = require('./routes/homeProtected')
const jobRoutes = require('./routes/jobRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE.
connectDB();


app.use(express.json())
app.use(cors())

app.use('/api/auth', registerRoute)
app.use('/api/home', homeProtected)
app.use('/api/job', jobRoutes)


// START THE SERVER TO LISTERN
app.listen(PORT, () => {
  console.log(`server is listerning on port:${PORT}...`);
});
