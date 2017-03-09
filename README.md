# Configrrr <sup>v1.0.2-dev</sup>

- :muscle: Powerful and simple
	- :white_check_mark: Supports environment variables, command switches, and local storage overrides
- :baby_chick: Light: no dependencies, 846 bytes (minified + gzip)

# Installation

```bash
npm install configrrr
```

# Usage

```javascript
import { Config } from 'configrrr';

const config = new Config({
	APP_NAME: 'Example',
	ANGRY: false,
	PORT_NUMBER: 3000,
});
```

```javascript
// Override with an environment variable
env ANGRY=true npm start

// Override with a command switch
npm start --ANGRY true

// Override 'on the fly' within the browser
localStorage.ANGRY = true;

// Override by hard coding
config.ANGRY = true;
```

```javascript
console.log(config.ANGRY);
// true

console.log(config.toJSON());
// { APP_NAME: 'Example', ANGRY: true, PORT_NUMBER: 3000 }

console.log(config.hasOwnProperty('DOES_NOT_EXIST'));
// false

console.log(config.keys);
// [ 'APP_NAME', 'ANGRY', 'PORT_NUMBER' ]
```

## Config override priority

```javascript
// #1. Hard coded
config.ANGRY = '1st priority';

// #2. Local storage
localStorage.ANGRY = '2nd priority';

// #3. Command switch
npm start --ANGRY '3rd priority'

// #4. Environment variable
env ANGRY='4th priority' npm start

// #5. Initial config
new Config({ ANGRY: '5th priority' })
```

## Usage without ES6 module support

```javascript
// CommonJS / Node.js
const configrrr = require('configrrr');
const config = new configrrr.Config({ TEST: true });

// AMD / RequireJS 
define(['configrrr'], function(configrrr) {
	const config = new configrrr.Config({ TEST: true });
});

// Global / window
const config = new configrrr.Config({ TEST: true });
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
module.exports = { API_URL: undefined };

// /app/config/config.env-dev.js
module.exports = { API_URL: 'http://dev.example.com/' };

// /app/config/config.env-prod.js
module.exports = { API_URL: 'http://api.example.com/' };

// /app-config.local.js
module.exports = { API_URL: 'http://localhost:1234/' };
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

console.log(config.API_URL);
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
