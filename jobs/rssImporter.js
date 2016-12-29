var RSSImporter = require('../services/RSSImporter.js'),
    pg = require('../database/pg.js'),
    TLDR = require('../services/TLDR.js'),
    sanitizeHtml = require('sanitize-html');

var scope = this;
var allContentSources = []
var currentContentSourceIndex = 0;

pg.select().from('content_sources').then(function(contentSources) {
    allContentSources = contentSources;
    processSource(allContentSources[currentContentSourceIndex]);
}).catch(function(err) {
    console.log(err);
});

function processSource(source) {
    RSSImporter.get(source.url, function(posts) {
        posts = posts.map(p => {
            return {
                content_source_id: source.id,
                title: p.title,
                guid: p.guid,
                url: p.link,
                description: sanitizeHtml(p.summary)
            }
        });

        getSummaries(source, posts);
    });
}

function getSummaries(source, posts) {
    posts = posts.map(p => {
        p.summary = new TLDR(p.title, p.description).getSummary();
        return p;
    });

    batchSave(source, posts);
}

function batchSave(source, posts) {
    console.log(posts.length);
    function updateOrInsert(post, i) {
        var completion = function(result) {
            var j = i + 1;

            if (posts[j]) {
                updateOrInsert(posts[j], j);
            } else {
                complete();
            }
        }

        pg.select().from('posts').where('posts.guid', '=', post.guid).then(function(dbPost) {
            if (dbPost[0]) {
                pg('posts')
                    .where('posts.guid', '=', post.guid)
                    .update(post).then(completion);
            } else {
                pg('posts').insert(post).then(completion);
            }
        }).catch(function(err) {
            console.log(err);
        });
    }

    updateOrInsert(posts[0], 0);
}

function complete() {
    var i = currentContentSourceIndex + 1;
    if (allContentSources[i]) {
        processSource(allContentSources[i]);
        currentContentSourceIndex = i;
    } else {
        var associater = require('./associatePosts.js');
        new associater().go();
    }
}