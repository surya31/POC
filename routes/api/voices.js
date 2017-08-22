var async = require('async'),
	keystone = require('keystone');

var Voice = keystone.list('Voice');

/**
 * List Voices
 */
exports.list = function(req, res) {
	Voice.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		return res.json(items);
	});
}

/**
 * Get Voice by ID
 */
exports.get = function(req, res) {
	Voice.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		return res.json(item);
	});
}


/**
 * Create a Voice
 */
exports.create = function(req, res) {
	
	var item = new Voice.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.json(200,err);
		
		return res.redirect('/');
		
	});
}

/**
 * Get Voice by ID
 */
exports.update = function(req, res) {
	Voice.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			return res.json(item);
			
		});
		
	});
}

/**
 * Delete Voice by ID
 */
exports.remove = function(req, res) {
	Voice.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.json({
				success: true
			});
		});
		
	});
}