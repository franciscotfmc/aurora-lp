'use strict';

const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const comentarios = require('./comentarios');
const imagens = require('./imagens');
const artigos = require('./artigos');

const indexData = {
  cssIndex: 'index.css',
  jsIndex: 'main.js',
  comentarios: comentarios,
  imagens: imagens,
  title: 'Aurora [Desenvolvimento]',
  GA: true,
  buttonId: 'dialog1'
};

const port = 3000;
const distPath = `${__dirname}/../../dist`;
const publicPath = `${__dirname}/../public`;
const viewsPath = `${__dirname}/../views`;
const pageSize = 3;

const app = express();

app.use(connectLivereload());

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.render('index', indexData);
});

app.get('/blog/page/:page', function (req, res) {

  const page = req.params.page;
  const start = (page * pageSize) - pageSize;
  const end = start + pageSize;
  const total = artigos.length;

  let data = {
    artigos: artigos.slice(start, end),
    page: parseInt(page),
    pageSize: pageSize,
    total: total,
    cssIndex: '/blog/index.css',
    GA: false
  };

  res.render('blog', data);
});

app.get('/blog', function (req, res) {

  const page = 1;
  const start = (page * pageSize) - pageSize;
  const end = start + pageSize;
  const total = artigos.length;

  let data = {
    artigos: artigos.slice(start, end),
    page: parseInt(page),
    pageSize: pageSize,
    total: total,
    cssIndex: '/blog/index.css',
    GA: false
  };

  res.render('blog', data);
});

app.get('/blog/dentista-em-ouro-preto-mg/', function (req, res) {

  let data = {
    cssIndex: '/blog/dentista-em-ouro-preto-mg/index.css',
    GA: false
  };

  res.render('blog/dentista-em-ouro-preto-mg/index', data);
});

app.get('/blog/ortodontista-em-ouro-preto-mg/', function (req, res) {

  let data = {
    cssIndex: '/blog/ortodontista-em-ouro-preto-mg/index.css',
    GA: false
  };

  res.render('blog/ortodontista-em-ouro-preto-mg/index', data);
});

app.get('/blog/odontopediatra-em-ouro-preto-mg/', function (req, res) {

  let data = {
    cssIndex: '/blog/odontopediatra-em-ouro-preto-mg/index.css',
    GA: false
  };

  res.render('blog/odontopediatra-em-ouro-preto-mg/index', data);
});

app.get('/blog/clareamento-dental-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/clareamento-dental-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/clareamento-dental-ouro-preto/index', data);
});

app.get('/blog/dentista-clinico-geral-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/dentista-clinico-geral-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/dentista-clinico-geral-ouro-preto/index', data);
});

app.get('/blog/clinica-odontologica-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/clinica-odontologica-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/clinica-odontologica-ouro-preto/index', data);
});

app.get('/blog/dra-luciana-dangelo-dentista-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/dra-luciana-dangelo-dentista-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/dra-luciana-dangelo-dentista-ouro-preto/index', data);
});

app.get('/blog/melhorar-saude-bucal/', function (req, res) {

  let data = {
    cssIndex: '/blog/melhorar-saude-bucal/index.css',
    GA: false
  };

  res.render('blog/melhorar-saude-bucal/index', data);
});

app.get('/blog/sorriso-bonito-verao/', function (req, res) {

  let data = {
    cssIndex: '/blog/sorriso-bonito-verao/index.css',
    GA: false
  };

  res.render('blog/sorriso-bonito-verao/index', data);
});

app.get('/blog/protese-implante-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/protese-implante-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/protese-implante-ouro-preto/index', data);
});

app.get('/blog/botox-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/botox-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/botox-ouro-preto/index', data);
});

app.get('/blog/endodontista-ouro-preto-mg/', function (req, res) {

  let data = {
    cssIndex: '/blog/endodontista-ouro-preto-mg/index.css',
    GA: false
  };

  res.render('blog/endodontista-ouro-preto-mg/index', data);
});

app.get('/blog/camera-intraoral-odontologica/', function (req, res) {

  let data = {
    cssIndex: '/blog/camera-intraoral-odontologica/index.css',
    GA: false
  };

  res.render('blog/camera-intraoral-odontologica/index', data);
});

app.get('/blog/laserterapia-ouro-preto-mg/', function (req, res) {

  let data = {
    cssIndex: '/blog/laserterapia-ouro-preto-mg/index.css',
    GA: false
  };

  res.render('blog/laserterapia-ouro-preto-mg/index', data);
});

app.get('/blog/odontopediatra-para-bebe-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/odontopediatra-para-bebe-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/odontopediatra-para-bebe-ouro-preto/index', data);
});

app.get('/blog/dor-dentes-sensiveis-tratamento-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/dor-dentes-sensiveis-tratamento-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/dor-dentes-sensiveis-tratamento-ouro-preto/index', data);
});

app.get('/blog/odontopediatra-canal-em-criancas-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/odontopediatra-canal-em-criancas-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/odontopediatra-canal-em-criancas-ouro-preto/index', data);
});

app.get('/blog/gengivoplastia-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/gengivoplastia-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/gengivoplastia-ouro-preto/index', data);
});

app.get('/blog/parestesia-o-que-e/', function (req, res) {

  let data = {
    cssIndex: '/blog/parestesia-o-que-e/index.css',
    GA: false
  };

  res.render('blog/parestesia-o-que-e/index', data);
});

app.get('/blog/recontorno-estetico-dental-contorno-dentes/', function (req, res) {

  let data = {
    cssIndex: '/blog/recontorno-estetico-dental-contorno-dentes/index.css',
    GA: false
  };

  res.render('blog/recontorno-estetico-dental-contorno-dentes/index', data);
});

app.get('/blog/protese-dentadura-removivel-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/protese-dentadura-removivel-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/protese-dentadura-removivel-ouro-preto/index', data);
});

app.get('/blog/crianca-quebrou-dente-ouro-preto/', function (req, res) {

  let data = {
    cssIndex: '/blog/crianca-quebrou-dente-ouro-preto/index.css',
    GA: false
  };

  res.render('blog/crianca-quebrou-dente-ouro-preto/index', data);
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`)
});

const liveReloadServer = livereload
  .createServer({
    usePolling: true,
    extraExts: ['ejs']
  });

liveReloadServer
  .watch([publicPath, viewsPath]);

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});