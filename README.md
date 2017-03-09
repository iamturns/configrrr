# Configrrr <sup>v1.0.2-dev</sup>

- :angry: Angry configuration for your JS (grrr...)
- :muscle: Automatically overrides your config values with environment variables, command line switches, and local storage
- :timer_clock: Simple setup, minimal configuration
- :hatched_chick: No dependencies, 846 bytes (minified + gzip)

# Installation

```bash
npm install configrrr
```

# Usage

```javascript
import { Config } from 'configrrr';

const config = new Config({
	appName: 'Example',
	angry: false,
	portNumber: 3000,
});
```

```javascript
// Override with an environment variable
env angry=true npm start

// Override with a command switch
npm start --angry true

// Override 'on the fly' within the browser
localStorage.angry = true;

// Override by hard coding
config.angry = true;
```

```javascript
console.log(config.angry);
// true

console.log(config.toJSON());
// { appName: 'Example', angry: true, portNumber: 3000 }

console.log(config.hasOwnProperty('doesNotExist'));
// false

console.log(config.keys);
// [ 'appName', 'angry', 'portNumber' ]
```

## Config override priority

```javascript
// #1. Hard coded
config.angry = '1st priority';

// #2. Local storage
localStorage.angry = '2nd priority';

// #3. Command switch
npm start --angry '3rd priority'

// #4. Environment variable
env angry='4th priority' npm start

// #5. Initial config
new Config({ angry: '5th priority' })
```

## Usage without ES6 module support

```javascript
// CommonJS / Node.js
const configrrr = require('configrrr');
const config = new configrrr.Config({ test: true });

// AMD / RequireJS 
define(['configrrr'], function(configrrr) {
	const config = new configrrr.Config({ test: true });
});

// Global / window
const config = new configrrr.Config({ test: true });
```

# Use Case: Layered environment config files

Provide the following directory structure:

- `/app/config/index.js`
- `/app/config/config.default.js`
- `/app/config/config.env-dev.js`
- `/app/config/config.env-prod.js`
- `/app-config.local.js` (Ignored from source control)

```javascript
// /app/config/config.default.js
module.exports = { apiUrl: undefined };

// /app/config/config.env-dev.js
module.exports = { apiUrl: 'http://dev.example.com/' };

// /app/config/config.env-prod.js
module.exports = { apiUrl: 'http://api.example.com/' };

// /app-config.local.js
module.exports = { apiUrl: 'http://localhost:1234/' };
```

```javascript
// /app/config/index.js

import { Config } from 'configrrr';

const env = process.env.hasOwnProperty('NODE_ENV') ? process.env['NODE_ENV'] : 'dev';

const initConfig = Object.assign(
	{},
	require('./config.default.js'),
	require(`./config.env-${env}.js`),
	require('../../app-config.local.js'),
);

export const config = new Config(initConfig);
```

```javascript
// app.js

import { config } from '/app/config/';

console.log(config.apiUrl);
```

# Roadmap

- Unit tests
- Improve boolean switches (`--example` instead of `--example true`)
- TypeScript definition files
- Support `npm config` settings

# Notes

- Config supports key value pairs only
	- Improves performance (no deep merging required)
	- Promotes keeping config files simple

# More documentation

- [Change log](CHANGELOG.md)
- [Develop](docs/develop.md)
- [Release](docs/release.md)

# Author

[Matthew Turnbull](http://turnbullm.com) <[turnbullm@gmail.com](mailto:turnbullm@gmail.com)>

# License

Open sourced under the [MIT license](http://turnbullm.mit-license.org/).

[npm-badge]: https://img.shields.io/npm/v/configrrr.svg
[npm-badge-url]: https://www.npmjs.com/package/configrrr
