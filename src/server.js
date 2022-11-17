const express = require("express");
const path = require("path");
const app = express();
const compression = require("compression");

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use("/", express.static(path.join(__dirname, "../dist")));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
