# Curation
A curation interface for the data produced by the [Ingestion] project.  
Uses NodeJS to query data from Cassandra and the file system and serves it as a REST endpoint.  
Uses React, Redux and MaterialUI to create a modern frontend for this data.

This project uses the yarn package manager instead of npm. You can install it by executing:

    npm install -g yarn
    
or by using brew on macOS:

    brew update
    brew install yarn
    
After you installed yarn you can setup the project by running `yarn` in the root directory.

You can begin developing by running the wepack-dev-server using the command:

    npm install
    npm run dev
    
The interface will be served under http://localhost:8080

# Tests

This project uses the [jest framework](https://facebook.github.io/jest/) for testing its components. For now you can run all specified tests by executing:

    npm test

You can update your snapshots by running:

    npm run test:update

You can learn more about jest and how to write tests by reading the [docs](https://facebook.github.io/jest/docs/getting-started.html). There is also a good [article](https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f#.tlptja67v) on testing with jest and [enzyme](https://github.com/airbnb/enzyme).
The main [configuration](https://facebook.github.io/jest/docs/configuration.html#configuration) of jest is done in your package.json and the jest.config.js file.

# Linting

This project uses [eslint](http://eslint.org/) to check the projects code. To this end it enforces the [airbnb coding
conventions](https://github.com/airbnb/javascript). Further it defines the following build targets:

1. `yarn run lint:code` - is used to manually start the linting process of all javascript and jsx files.
2. `yarn run lint:autofix` - tries to automatically fix some of those linting errors.
3. `yarn run lint:styles` - run [stylelint](https://stylelint.io/) on all css files.

Further [eslint-loader](https://github.com/MoOx/eslint-loader) is used to continuously run the linting process together with webpack2. The configuration for the eslint-loader is contained in the `linter.part.js` file.
