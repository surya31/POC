var async = require('async'),
	keystone = require('keystone');

var User = keystone.list('User');

exports.update = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.json(200,err);
			
			return res.redirect('/profile/' + req.params.id + '/edit');
			
		});
		
	});
}