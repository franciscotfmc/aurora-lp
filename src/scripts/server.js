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
  GA: false
};

const port = 3000;
const distPath = `${__dirname}/../../dist`;
const publicPath = `${__dirname}/../public`;
const viewsPath = `${__dirname}/../views`;

const app = express();

app.use(connectLivereload());

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.render('index', indexData);
});

app.get('/blog', function (req, res) {

  let data = {
    artigos: artigos,
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