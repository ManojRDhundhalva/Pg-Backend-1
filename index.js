const express = require("express");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const verifyEmail = require("./routes/verifyEmail");
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// app.get("/", (req, resp) => {
//   resp.send("hello");
// });

app.use("/api/v1/login", loginRoutes);
app.use("/api/v1/register", registerRoutes);
app.use("/api/v1/verifyemail", verifyEmail);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
