const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shop_list'
})

// Change the URL of the route to the root URL
app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/create', (req, res) => {
  res.render('create.ejs')
})

app.get('/index', (req, res) => {
  connection.query('SELECT * FROM shop_list.items', (error, results) => {
    console.log(results);
    res.render('index.ejs', {items: results});
  });
});

app.listen(3000);
