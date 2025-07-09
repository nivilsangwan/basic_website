const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  // ✅ EK hi baar require karo

const app = express();
const port = 3000;

app.use(cors()); // ✅ CORS middleware sabse pehle lagao
app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'basic_website'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.post('/signup', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'User saved successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
