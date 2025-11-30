import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send(`
   <h1>selamat datang di home page rating dosen subin<h1>
    <h3>klik aku yang dibawah untuk ke bagian rating Dosen Subin</h3>
    <a href="/review">
    <button type="submit">review dosen subin</button>
    </a>  
    `);
});


export default routes;
