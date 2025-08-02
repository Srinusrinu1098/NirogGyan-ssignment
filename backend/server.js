const express = require("express");
const cors = require("cors");
const doctorRoutes = require("./routes/doctors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Api is on duty ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
