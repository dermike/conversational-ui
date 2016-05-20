# conversational-ui

Conversational UI web app experiment. [Demo](https://librarian.codes/conversational-ui/)

## Setup

### js/app.js

Built upon the structure `Category 1 -> Category 2 -> Info` as defined in `js/app.js`. Also check this file for customising the selection of replies, randomly selected for each step. See [this repo](https://github.com/dermike/conversational-ui-referencing-guide) for a real world example using AJAX for content.

### index.html

Content view for the info step is defined here under `.content` div. Id's from menu and submenu need to be combined.

### Build

This project mainly uses ES2015 JavaScript features. Can be run in Chrome or Safari Technical Preview, but needs transpilation with [Babel](https://babeljs.io) for other browsers using [Gulp](http://gulpjs.com).

```sh
gulp js
````

transpiles and minifies to `js/app.min.js`.
