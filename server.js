const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
const app = express();
const client = new pg.Client(connectionString);
// Serve files from public folder. That's where all of our HTML, CSS and Angular JS are.
app.use(express.static('public'));
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// TODO Set up access to the database via a connection pool. You will then use
// the pool for the tasks below.
const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

// GET /api/items - responds with an array of all items in the database.
// TODO Handle this URL with appropriate Database interaction.
app.get('/api/items', function(req, res, next) {
  pool.query('select * from shoppingcart', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    res.send(result.rows);
  });
});

// POST /api/items - adds and item to the database. The items name and price
// are available as JSON from the request body.
// TODO Handle this URL with appropriate Database interaction.
app.post('/api/items', function(req, res, next) {
  pool.query('insert into shoppingcart (product, price, quantity) values($1, $2, $3)', [req.body.product, req.body.price, req.body.quantity], function(err, result) {
    if(err) {
      console.log(req.body);
      return console.error('error running query', err);
    }
    console.log(req.body);
    res.send('hi');
  });
});

// DELETE /api/items/{ID} - delete an item from the database. The item is
// selected via the {ID} part of the URL.
// TODO Handle this URL with appropriate Database interaction.
app.delete('/api/items/:id', function(req, res, next) {
  pool.query('delete from shoppingcart where id=($1)', [req.params.id], function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('removed ' + req.params.id);
    res.send('hi');
  });
});

app.put('/api/items/:id', function(req, res, next) {
  pool.query('update shoppingcart set product = ($2), price = ($3), quantity = ($4) where id=($1)', [req.params.id, req.body.product, req.body.price, req.body.quantity], function(err, result) {
    if(err) {
      return console.error('error updating', err);
    }
    console.log('updated ' + req.params.id);
    res.send('hi');
  });
});


var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
