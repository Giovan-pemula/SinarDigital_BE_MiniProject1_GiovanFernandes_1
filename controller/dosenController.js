import fs from "fs";

function loadDosen() {
  return JSON.parse(
    fs.readFileSync(new URL("../data/dosen.json", import.meta.url))
  );
}

function saveDosen(data) {
  fs.writeFileSync(
    new URL("../data/dosen.json", import.meta.url),
    JSON.stringify(data, null, 2)
  );
}

export default class Dosen {
  static getDosen(req, res) {
    const dosen = loadDosen();
    return res.json({ data: dosen });
  }

  static updateDosen(req, res) {
    const dosen = loadDosen();
    const existId = Number(req.params.id);
    const index = dosen.findIndex(d => d.id === existId);

    if (index === -1) {
      return res.status(404).json({ message: "Dosen tidak ditemukan" });
    }

    dosen[index] = { id: existId, ...req.body };
    saveDosen(dosen);

    return res.json({ message: "Dosen updated successfully" });
  }

  static deleteDosen(req, res) {
    const dosen = loadDosen();
    const existId = Number(req.params.id);
    const index = dosen.findIndex(d => d.id === existId);

    if (index === -1) {
      return res.status(404).json({ message: "Dosen tidak ditemukan" });
    }

    dosen.splice(index, 1);
    saveDosen(dosen);

    return res.json({ message: "Dosen deleted successfully" });
  }

  static addDosen(req, res) {
    const dosen = loadDosen();
    const { name, course, rating } = req.body;

    if (!name || !course || !rating) {
      return res.status(400).json({ message: "Isiin semua abg er en di" });
    }

    const newId = dosen[dosen.length - 1].id + 1;
    const newDosen = { id: newId, name, course, rating };

    dosen.push(newDosen);
    saveDosen(dosen);

    return res.json({ message: "Dosen added successfully" });
  }

  static rateDosen(req, res) {
  const dosen = loadDosen();
  const { id, rating } = req.body;

  const existId = Number(id);
  const newRating = Number(rating);

  const index = dosen.findIndex(d => d.id === existId);

  if (index === -1) {
    return res.status(404).json({ message: "Dosen tidak ditemukan" });
  }

  dosen[index].rating = (dosen[index].rating + newRating) / 2;

  saveDosen(dosen);

  return res.redirect("/review");
}



  
}
