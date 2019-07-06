const express = require('express');
const app = express();
const port = 8000;

app.get('/api/open', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ a: 1, b: 2, c: 3 }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
