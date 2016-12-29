"use strict"; 

var RSSParser = require('../vendor/feeder-parser').RSSParser,
	request = require('request');

class RSSImporter {

	static get(url, fn) {
		request(url, function(err, res, data) {
			var parser = new RSSParser({
				path: this.url
			});
			parser.setResult(data);
			parser.parse(function(parser) {
				fn(parser.posts);
			});
		});
	}
}

module.exports = RSSImporter;