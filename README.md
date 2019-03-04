# conversational-ui

Conversational UI web app experiment. [Demo](https://librarian.dev/conversational-ui/)

![](https://raw.githubusercontent.com/dermike/conversational-ui-referencing-guide/master/screenshot/screenshot.jpg)

## Setup

### js/app.js

Built upon the structure `Category -> Sub-category -> Info` as defined in `js/app.js`. Also check this file for customising the selection of replies, randomly selected for each step. See [this repo](https://github.com/dermike/conversational-ui-referencing-guide) for a real world example using AJAX for content.

### index.html

Content view for the info step is defined here under `.content` div. Id's from menu and submenu need to be combined.

### Build

This project mainly uses ES2015 JavaScript features. Can be run in Chrome or Safari Technical Preview without a hitch, but needs transpilation with [Babel](https://babeljs.io) for other browsers using [Gulp](http://gulpjs.com).

To transpile, install [Node.js](https://nodejs.org) and [Gulp](http://gulpjs.com) if you haven't already. Then install the project dependencies required, listed in `package.json`, with:

```sh
npm install
```

Then run the transpile task defined in `gulpfile.js`:

```sh
gulp js
````

This transpiles and minifies to `js/app.min.js`.
