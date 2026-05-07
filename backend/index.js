const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
require('dotenv').config()

app.use(cors());

app.get('/api/message', (req, res) => {
  const envVariable = process.env.APP_SECRET_NAME;
  console.log(envVariable);
  res.json({ message: 'Hello from the backend! the secret value is ' + envVariable });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
