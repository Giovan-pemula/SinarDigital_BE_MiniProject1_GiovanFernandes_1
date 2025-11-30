import dotenv from "dotenv";
dotenv.config();

import express from "express";
function loadDosen() {
  return JSON.parse(fs.readFileSync(process.env.DATA_PATH));
}

function saveDosen(data) {
  fs.writeFileSync(process.env.DATA_PATH, JSON.stringify(data, null, 2));
}

// import fs from "fs";
import Dosen from "./controller/dosenController.js";
import reviewRoute from "./routes/review.js";
import homeRoute from "./routes/home.js";
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = process.env.DATA_PATH;
// import dosen from "./data/dosen.json" with { type: "json" };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/home", homeRoute);
app.use("/review", reviewRoute);
app.get("/dosen",Dosen.getDosen);
app.post("/dosen",Dosen.addDosen);
app.put("/dosen/:id",Dosen.updateDosen);
app.delete("/dosen/:id",Dosen.deleteDosen);
app.post("/dosen/rate", Dosen.rateDosen);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
