const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const port = 3000;
const publicPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '/../views');

const app = express();

app.use(connectLivereload());

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

const liveReloadServer = livereload
  .createServer({
    usePolling: true
  });

liveReloadServer
  .watch(publicPath);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});