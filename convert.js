// Run script in root of directory
const fs = require('fs')

function convertComponent() {
  fs.readFile(`${__dirname}/${process.argv[2]}.component.js`, 'utf8', (err, data) => {
    if (err) throw err;

    const filename = data.match(/(?<=export class )(.*)(?=Component {)/);
    const template = data.match(/(?<=template: `)(.*)(?=`)/);
    const styles = data.match(/(?<=styles: \[`)(.*)(?=`)/);
    const convertedCode = getConvertedCode(getInputs(data), template[0]);
    
    createFile(`${filename[0]}.js`, convertedCode);
    if (styles) {
      createFile(`${filename[0]}.css`, styles[0]); 
    } 
    
  });
}

function createFile(filename, data) {
  fs.writeFile(`${__dirname}/${filename}`, data, err => err ? console.log(err) : console.log(`${filename} created.`)); 
}

function getConvertedCode(input, template) {
  return `
  // Converts Angular Component to React
  import React from 'react';
  export default ({ ${input} }) => ${template};`
}

function getInputs(str) {
  const regex = /(?<=@Input\(\) )(.*)(?=:)/gm;
  let m;
  let results = [];
  while ((m = regex.exec(str)) !== null) {
    (m.index === regex.lastIndex) && regex.lastIndex++;
    m.forEach((match) => (results.indexOf(match) === -1) && results.push(match));
  }
  return results;
}

convertComponent();