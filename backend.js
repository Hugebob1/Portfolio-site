import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// najpierw trasy:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});
// app.get("/portfolio", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// a tu statyki, *bez* automatycznego index.html:
app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});