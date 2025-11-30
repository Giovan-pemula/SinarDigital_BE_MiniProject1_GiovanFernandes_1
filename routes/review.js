import express from "express";

import fs from "fs";

const router = express.Router();

function loadDosen() {
  return JSON.parse(
    fs.readFileSync(new URL("../data/dosen.json", import.meta.url))
  );
}

router.get("/", (req, res) => {
  const dosen = loadDosen();

  const options = dosen
    .map(d => `<option value="${d.id}">${d.name} - ${d.course} (⭐${d.rating})</option>`)
    .join("");

  res.send(`
    <h1>Rate Dosen</h1>
    <h3>Daftar Dosen:</h3>
    <ul>
      ${dosen
        .map(dosen => `<li><strong>${dosen.name}</strong> (${dosen.course}) (${dosen.rating})</li>`)
        .join("")}
    </ul>
    <hr>
    <form action="/dosen/rate" method="POST">
      <label>Pilih Dosen:</label><br>
      <select name="id">${options}</select><br><br>

      <label>Rating (1–5):</label><br>
      <input type="number" step="0.1" name="rating" min="1" max="5" step=0.1><br><br>

      <button type="submit">Kirim Rating</button>
    </form>
  `);
});

export default router;
