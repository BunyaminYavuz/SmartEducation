const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Ben is coming...');
});

const port = 3000;

app.listen(port, () => {
  console.log(`The server has been started on port ${port}`);
});
