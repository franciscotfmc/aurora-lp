'use strict';

const fs = require('fs').promises;
const CleanCSS = require('clean-css');
const ejs = require('ejs');
const minify = require('html-minifier').minify;

const cssPath = `${__dirname}/../public/css`;
const ejsPath = `${__dirname}/../views`;
const distPath = `${__dirname}/../../dist`;
const distCssPath = `${__dirname}/../../dist/css`;
const distHtmlPath = `${__dirname}/../../dist`;

class Build {

  constructor() {
    this.timestamp = new Date().getTime();
  }

  async execute() {
    await fs.rm(distPath, { recursive: true, force: true });
    await fs.mkdir(distCssPath, { recursive: true });
    await this._minifyCss();
    const ejsOutput = await this._compileEjs();
    await this._minifyHtml(ejsOutput);
  }

  async _minifyCss() {
    const cssFile = await fs.readFile(`${cssPath}/index.css`);
    const output = new CleanCSS().minify(cssFile);
    const fileName = `${distCssPath}/index${this.timestamp}.css`;
    await fs.writeFile(fileName, output.styles);
  }

  async _compileEjs() {
    const ejsIndex = `${ejsPath}/index.ejs`;
    const data = { cssIndex: `index${this.timestamp}.css` };
    return ejs.renderFile(ejsIndex, data);
  }

  async _minifyHtml(htmlData) {
    const options = {
      removeComments: true,
      collapseWhitespace: true
    };

    const fileName = `${distHtmlPath}/index.html`
    const minifiedData = minify(htmlData, options);
    await fs.writeFile(fileName, minifiedData);
  }
};

new Build().execute().then(() => {
  console.log('Finished');
});