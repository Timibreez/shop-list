const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'shop_list'
});

// Change the URL of the route to the root URL
app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/create', (req, res) => {
  res.render('create.ejs')
});

app.post('/new', (req, res) =>{
  connection.query(
    'INSERT INTO items (name) VALUES(?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/index', (req, res) => {
  connection.query('SELECT * FROM shop_list.items', (error, results) => {
    console.log(results);
    res.render('index.ejs', {items: results});
  });
});

app.listen(3000);
