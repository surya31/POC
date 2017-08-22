// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
}
if (process.env.OPENSHIFT_NODEJS_IP) {
	keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}
if (process.env.OPENSHIFT_NODEJS_PORT) {
	keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
}

var social = require('keystone-social-login');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Politik POC',
	'brand': 'Politik POC',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': ['templates', 'templates/views'],
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});


social.config({
    keystone: keystone,
    providers: {
        google: {
            clientID: '661292737266-4tss2t55hakcjngvo2ihudgbcv0i5c3a.apps.googleusercontent.com',
            clientSecret: '_yvT0ywf-hGKuDzq4yjWCkEj'
        },
        facebook: {
            clientID: '645975065561718',
            clientSecret: '40d5465f89c3961a06fb5bcdf549f3d7'
        },
        twitter: {
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret'
        }
    }
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

social.start();

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	voices: ['voices', 'voice-categories'],
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
