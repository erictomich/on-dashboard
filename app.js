const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const fs = require('fs');

// Importe o modelo de usuários
const User = require('./models/user');
const Dashboard = require('./models/dashboard');



const sequelize = require('./config/database');

// Sincronize o modelo com o banco de dados
sequelize.sync();

const app = express();

app.set('view engine', 'ejs');

// Configure o body-parser para parsear os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }));

// Configure a aplicação para usar a sessão
app.use(session({
  secret: '7de037fad96c7ab5cfd1d47cc9f8a9b9',
  resave: false,
  saveUninitialized: false,
}));

const findDashboardBySlug = async (slug) => {
  const dashboard = await Dashboard.findOne({
    where: {
      slug: slug,
    },
  });

  return dashboard;
};

// Defina as rotas para login e logout
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {

  // Consulte o banco de dados para verificar se o nome de usuário e senha são válidos
  const user = User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (user) {
    // Se a autenticação for bem-sucedida, armazene o usuário na sessão
    req.session.user = user;
    res.redirect('/sobre');
  } else {
    // Senão, exiba uma mensagem de erro
    res.send('Nome de usuário ou senha inválidos');
  }
});

app.get('/logout', (req, res) => {
  // Remova o usuário da sessão e redirecione para a página inicial
  req.session.user = null;
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Defina a rota para o conteúdo principal
app.get('/sobre', (req, res) => {
 
  if (!req.session.user) { 
    res.redirect('/login');
    return false;
  };

  res.render('template', {
    title: 'principal',
    content: '<p>Conteúdo da página principal aqui</p>',
    });
});

app.get('/dashboards/:slug', async (req, res) => {

    if (!req.session.user) { 
      res.redirect('/login');
      return false
    }

    const slug = req.params.slug;
    const dashboard = await findDashboardBySlug(slug);

    if (!dashboard) {
      return res.status(404).send('Dashboard not found');
    }

    const fileJson = dashboard.dataValues.file;
    const titleDashboard = dashboard.dataValues.title;
    
    
    fs.readFile(`./data/${fileJson}`, (err, data) => {
      if (err) throw err;
      const dashboard = JSON.parse(data);

      const today = new Date();
      const dayOfWeek = today.getDay() - 3;
      
      var generalContent = '';

      dashboard.components.forEach(component => {
        if (component.type === 'eachDayOfWeek') {
          component.content.forEach(item => {
            if (item.day === dayOfWeek) {
              generalContent += item.content
            }
          });
        }
      });

      res.render('template', {
        title: titleDashboard,
        content: generalContent,
        });


    });


  
    
});

const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação iniciada na porta ${port}`);
});