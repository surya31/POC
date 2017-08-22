var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Voice Model
 * ==========
 */

var Voice = new keystone.List('Voice', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Voice.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Datetime, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'VoiceCategory', many: true },
	agree: {type: Types.Number },
	disagree: {type: Types.Number }
});

Voice.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Voice.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Voice.register();
