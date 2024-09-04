const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Add bcrypt
const jwt = require('jsonwebtoken'); // Add JWT

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bridgeme'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Secret key for JWT
const JWT_SECRET = 'secureUser@123';

// Register Route (For adding users securely)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } else {

      res.json({ success: true, message: 'User registered successfully' });
    }
  });
});

// Login Route`
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Create a token
        const token = jwt.sign({ id: user.id, username: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});


app.post('/api/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out successfully' });
});




// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ success: false, message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token' });

    req.userId = decoded.id;
    next();
  });
};

// Secure route example
app.get('/api/secure-data', verifyToken, (req, res) => {
  res.json({ success: true, message: 'This is secured data' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
