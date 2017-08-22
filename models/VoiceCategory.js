var keystone = require('keystone');

/**
 * VoiceCategory Model
 * ==================
 */

var VoiceCategory = new keystone.List('VoiceCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

VoiceCategory.add({
	name: { type: String, required: true },
});

VoiceCategory.relationship({ ref: 'Voice', path: 'categories' });

VoiceCategory.register();
