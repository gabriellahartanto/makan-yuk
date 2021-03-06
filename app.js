const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 4000;
const router = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(session({
  secret: 'nasi liwet',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});