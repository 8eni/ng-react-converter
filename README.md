# ng-react-converter

Convert your stateless Angular components to React with this simple nodejs script.



## Usage
Download `convert.js` to root of components directory.

```
.
├── ...
├── components              # Component directory
│   ├── convert.js          # Nodejs script to convert Angular component to React
│   ├── hello.component.js  # Example stateless component displaying name
│   └── ...                 # etc.
└── ...
```
In the components folder run the below command to generate React component.

```node
# Single component conversion
node ./convert.js hello
```
New folder structure should include Hello.js and Hello.css
```
.
├── ...
├── components              # Component directory
│   ├── convert.js          # Nodejs script to convert Angular component to React
│   ├── hello.component.js  # Example stateless component displaying name
│   ├── Hello.js            # Generated javascript file
│   ├── Hello.css           # Generated stylesheet
│   └── ...                 # etc.
└── ...
```

## Example
### Angular component
```javascript
// hello.component.js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{firstname}} {{lastname}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent {
  @Input() firstname: string;
  @Input() lastname: string;
}
```
`node ./convert.js hello` converts to...
### React component
```javascript
// Hello.js
import React from 'react';
export default ({ firstname, lastname }) => <h1>Hello {{firstname}} {{lastname}}!</h1>;
```
```scss
// Hello.css
h1 { font-family: Lato; }
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)