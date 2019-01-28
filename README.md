# Static vue tailwind broilerplate
> Download this code and modify as needed, feel free to change the title of this readme :-D

## Setup
``` bash
# install dependencies and run tests
$ npm it
```

## Running tests
``` bash
# run all tests
$ npm t

# run lint
$ npm run lint

# run unit tests
$ npm run test:unit
```

## Building code
``` bash
# build dev code
$ npm run dev

# watch and build dev code on change
$ npm run watch

# build production code
$ npm t && npm run build
```

## Code
Both CSS and Javacript is compiled with [Webpack](https://webpack.js.org/). Configure webpack with `webpack.config.js`.

### CSS
CSS is generated with [Tailwind CSS](https://tailwindcss.com/docs/what-is-tailwind/).

Configure Tailwind with the `tailwind.js`-file.

CSS-files are located in `src/css`. If you want to add additional CSS files you can put them here. You can map input CSS-files to output in the `webpack.config.js`-file. Output shoul be placed in `dist/css`.

You can view a PDF with the color chart in the file `colorchart.pdf`

### Javascript

#### Code format
Javascript components should be written with modern Javascript syntax (ES2017+) and compiled with [Babel](https://babeljs.io/). Browser support for compiled Javascript can be configured in `.babelrc`.

#### Framework
We use [Vue 2](https://vuejs.org/) as a framework for writing Javascript components. The Vue-code is placed in the `vue` folder.

#### Linting
Linting is done with [ESLint](https://eslint.org/). Configure ESLint in `.eslintrc.js`

Run code lint with:
`$ npm run lint`

#### Testing
Testing is done with [Jest](https://jestjs.io/). Configure jest in `jest.config.js`.

##### Unit testing
Add unit tests to a `__test__` folder in the same folder as the component you are unit testing. Test files are named the same as the component they are testing `ComponentName.spec.js`.

Run unit tests with:
`$ npm run test:unit`

##### E2E testing
End to end tests are not configured. Set up and add the tests in the `e2e` folder as needed.

#### Create a new component
For each new component to be included:

1.  Create a javascript-file with the unique component name in camel case (`componentName.js`) in the vue folder root.
2.  Create a vue-file with the component name in pascal case (`ComponentName.vue`).
3.  In the javascript file import `vue` and the component vue-file and attatch a component create function to the global `window`.
4.  Write tests for your vue component and sub-components in the `components`-folder with Jest.
5.  If you do not have Epi-server installed but want to test the code locally, create a simple html-file in the `src/_proto`-folder and render the component there. Name the file using kebab case.
6.  Include the component in an Epi View file using the create function.
7.  Profit $$$

componentName.js
``` javascript
import Vue from 'vue'

import ComponentName from './ComponentName.vue'

window.vueCreateComponentName = function (id) {
  const app = new Vue({
    el: `#${id}`,
    render: h => h(ComponentName)
  })

  return { app }
}
```

Static html page or CMS template
``` html
  <div id="componentId"></div>

  <!-- Include view component ComponentName -->
  <script src="../../dist/js/componentName.js" type="text/javascript"></script>
  <script>
    vueCreateComponentName('componentId');
  </script>
```
If possible add the javascript just before the `</body>`-tag.