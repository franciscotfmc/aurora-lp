'use strict';

const fs = require('fs').promises;
const fsEx = require('fs-extra');
const CleanCSS = require('clean-css');
const ejs = require('ejs');
const minify = require('html-minifier').minify;
const terser = require('terser');

const comentarios = require('./comentarios');
const imagens = require('./imagens');
const artigos = require('./artigos');
const pageSize = 3;

const publicPath = `${__dirname}/../public`;
const publicBlogPath = `${__dirname}/../public/blog`;
const cssPath = `${__dirname}/../public/css`;
const cssBlogPath = `${__dirname}/../public/css/blog`;
const ejsPath = `${__dirname}/../views`;
const ejsBlogPath = `${__dirname}/../views/blog`;
const jsPath = `${__dirname}/../public/js`;
const imgPath = `${__dirname}/../public/img`;
const fontsPath = `${__dirname}/../public/fonts`;
const distPath = `${__dirname}/../../dist`;
const distBlogPath = `${__dirname}/../../dist/blog`;
const distCssPath = `${__dirname}/../../dist/css`;
const distCssBlogPath = `${__dirname}/../../dist/css/blog`;
const distHtmlPath = `${__dirname}/../../dist`;
const distHtmlBlogPath = `${__dirname}/../../dist/blog`;
const distJsPath = `${__dirname}/../../dist/js`;
const distImgPath = `${__dirname}/../../dist/img`;
const distImgBlogPath = `${__dirname}/../../dist/img`;
const distFontsPath = `${__dirname}/../../dist/fonts`;

class Build {

  constructor() {
    this.timestamp = new Date().getTime();
    this.timestampBlog = this.timestamp + 1;
  }

  async execute() {
    console.info('Starting build...');

    await fs.rm(distPath, { recursive: true, force: true });
    await fs.mkdir(distBlogPath, { recursive: true });
    await fs.mkdir(distCssBlogPath, { recursive: true });
    await fs.mkdir(`${distJsPath}/lib`, { recursive: true });

    await this._minifyCss(cssPath, distCssPath, this.timestamp);

    const ejsOutput = await this._compileEjs(
      this.timestamp, 'Aurora Odontologia - Clínica Odontológica em Ouro Preto MG', ejsPath, ''
    );

    await this._minifyHtml(ejsOutput, distHtmlPath);
    await this._minifyJs();
    await this._copyJsLibs();
    await this._copyFonts();
    await this._copyImgs();
    await this._copyRobots();

    await this._minifyCss(
      cssBlogPath,
      distCssBlogPath,
      this.timestampBlog
    );

    // Build blog pagination
    const length = (artigos.length / pageSize) +
      (artigos.length % pageSize);

    for (let index = 1; index <= length; index++) {
      if (index === 1) {
        this._buildBlogIndex(
          distHtmlBlogPath,
          { pageSize: pageSize, page: 1 }
        );
      }

      if (index > 1) {

        await fs.mkdir(
          `${distHtmlBlogPath}/page/${index}`, { recursive: true }
        );

        this._buildBlogIndex(
          `${distHtmlBlogPath}/page/${index}`,
          { pageSize: pageSize, page: index }
        );
      }
    }

    // Build blog articles
    for (let a of artigos) {
      const cssFolder = `${distCssBlogPath}/${a.name}`;
      const htmlFolder = `${distBlogPath}/${a.name}`;
      const ejsBlogFolderPath = `${ejsBlogPath}/${a.name}`;

      await fs.mkdir(htmlFolder, { recursive: true });
      await fs.mkdir(cssFolder, { recursive: true });

      await this._minifyCss(
        `${cssBlogPath}/${a.name}`,
        cssFolder,
        this.timestampBlog
      );

      const ejsOutputBlog = await this._compileEjs(
        this.timestampBlog, null, ejsBlogFolderPath,
        `blog/${a.name}/`
      );

      await this._minifyHtml(ejsOutputBlog, htmlFolder);
    }
  }

  async _minifyCss(path, distPath, timestamp) {
    const cssFile = await fs.readFile(`${path}/index.css`);
    const output = new CleanCSS().minify(cssFile);
    const fileName = `${distPath}/index${timestamp}.css`;
    return await fs.writeFile(fileName, output.styles);
  }

  async _buildBlogIndex(distPath, pageData) {
    const ejsOutputBlogIndex = await this
      ._compileBlogEjs(
        this.timestampBlog, null,
        ejsBlogPath, 'blog/', pageData
      );

    await this._minifyHtml(
      ejsOutputBlogIndex,
      distPath
    );
  }

  async _compileBlogEjs(timestamp, title, path, cssFolder, pageData) {

    const page = pageData.page;
    const start = (pageData.page * pageData.pageSize) - pageData.pageSize;
    const end = start + pageData.pageSize;
    const total = artigos.length;

    const data = {
      artigos: artigos.slice(start, end),
      page: page,
      pageSize: pageSize,
      total: total,
      cssIndex: `${cssFolder}index${timestamp}.css`,
      jsIndex: `main${timestamp}.js`,
      imagens: imagens,
      title: title,
      GA: true
    };

    const ejsIndex = `${path}/index.ejs`;
    return ejs.renderFile(ejsIndex, data);
  }

  async _compileEjs(timestamp, title, path, cssFolder) {
    const data = {
      artigos: artigos,
      cssIndex: `${cssFolder}index${timestamp}.css`,
      jsIndex: `main${timestamp}.js`,
      comentarios: comentarios,
      imagens: imagens,
      title: title,
      GA: true
    };

    const ejsIndex = `${path}/index.ejs`;
    return ejs.renderFile(ejsIndex, data);
  }

  async _minifyHtml(htmlData, path) {
    const options = {
      removeComments: true,
      collapseWhitespace: true
    };

    const fileName = `${path}/index.html`
    const minifiedData = minify(htmlData, options);
    await fs.writeFile(fileName, minifiedData);
  }

  async _minifyJs() {
    const options = { sourceMap: true };
    const jsFile = await fs.readFile(`${jsPath}/main.js`);
    const output = await terser.minify(jsFile.toString(), options);
    const fileName = `${distJsPath}/main${this.timestamp}.js`;
    await fs.writeFile(fileName, output.code);
  }

  async _copyJsLibs() {
    return fsEx.copy(
      `${jsPath}/lib`,
      `${distJsPath}/lib`
    );
  }

  async _copyFonts() {
    return fsEx.copy(fontsPath, distFontsPath);
  }

  async _copyImgs() {
    await fs.copyFile(`${publicPath}/favicon.ico`, `${distPath}/favicon.ico`);
    return fsEx.copy(imgPath, distImgPath);
  }

  async _copyRobots() {
    return await fs.copyFile(`${publicPath}/robots.txt`, `${distPath}/robots.txt`);
  }
};

new Build().execute().then(() => {
  console.info('Build finished!');
});