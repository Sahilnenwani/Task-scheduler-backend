//we are adding it above the all because node works in a sequence so bellow all the modules will get access of this env
require("dotenv").config();
const express = require("express");
const connectToMongo = require("./db");
const app = express();
const cookie_parser = require("cookie-parser");
const PORT = 5000 || process.env.PORT;

connectToMongo();

app.use(express.json());
app.use(cookie_parser()); 

app.use("/auth", require("./Routes/auth.route"));
app.use("/token", require("./Routes/refreshToken.route"));
app.use("/task", require("./Routes/task.route"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
