const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Ứng dụng Node.js chạy với Multi-stage Build!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});