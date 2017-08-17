const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(expressValidator());
app.use(session({
  secret: "felines",
  resave: false,
  saveUninitialized: true
}));


const users = {'tommywisaeu': {'name': 'Tommy', 'password': 'ohHiMark'},
'proudbowflexowner': {'name': 'Keith', 'password': 'chimp'}};


app.use((req, res, next) => {
  if (!req.session.coolDude){
    req.session.coolDude = [];
    req.session.name = [];
  }
      next();
});

app.get('/', (req, res) => {
  console.log(req.session);
    if(req.session.coolDude[0] == 'p cool dude'){
      res.render('index', {users: users, name: req.session.name});
    }else{
    res.render('login', {users: users});
  }
});

app.post('/login', (req, res) =>{
  console.log(req.body);
  let nameInput = req.body.username;
  let passInput = req.body.password;
     if (Object.keys(users).includes(nameInput) && users[nameInput].password == passInput){
       req.session.coolDude.push('p cool dude');
       req.session.name.push(users[nameInput].name);
       console.log(req.session.coolDude);
       res.redirect('/');
     }else{
       res.redirect('/');
     }
   });


app.listen(3000);
