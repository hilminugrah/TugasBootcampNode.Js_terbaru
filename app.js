// Import dependencies
const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const port = 2000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',     
  database: 'postgres', 
  password: '12345678', 
  port: 5432,            
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Get all contacts
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data_contacts');
    res.render('index', { users: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Error retrieving contacts');
  }
});

// Show create form
app.get('/create', (req, res) => {
  res.render('create');
});

// Create new contact
app.post('/create', async (req, res) => {
  const { name, mobile, email } = req.body;
  try {
    // Insert data into PostgreSQL
    await pool.query(
      'INSERT INTO data_contacts (name, mobile, email) VALUES ($1, $2, $3)',
      [name, mobile, email]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error creating contact');
  }
});

// Show edit form
app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM data_contacts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.send('Contact not found');

    res.render('edit', { user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send('Error retrieving contact');
  }
});

// Update contact
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, mobile, email } = req.body;

  try {
    await pool.query(
      'UPDATE data_contacts SET name = $1, mobile = $2, email = $3 WHERE id = $4',
      [name, mobile, email, id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error updating contact');
  }
});

// Delete contact
app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM data_contacts WHERE id = $1', [id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error deleting contact');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
