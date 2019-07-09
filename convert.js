// Run script in root of directory
const fs = require('fs')

function convertComponent(file) {
  fs.readFile(`${__dirname}/${file}.component.js`, 'utf8', (err, data) => {
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

for (let i = 2; i < process.argv.length; i++) {
  convertComponent(process.argv[i]);
}