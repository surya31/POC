var keystone = require('keystone');
var Types = keystone.Field.Types;
var social = require('keystone-social-login');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	location: { type: Types.Text },
	post: { type: Types.Text },
	company: { type: Types.Text },
	qualification: { type: Types.Text },
	university: { type: Types.Text },
	party: { type: Types.Text },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Admin', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Voice', path: 'voices', refPath: 'author' });

social.plugin(User);

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
