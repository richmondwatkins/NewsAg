"use strict"; 

var pg = require('../database/pg.js'),
    similarity = require('similarity');

class Associater {
    constructor() {
        this.offset = 0
    }

    go() {
        var scope = this;
        new PostIterator(function(post, firstPostIteratorCompletion) {

            new PostIterator(function(nestedPost, nestedIteratorComplete) {

                var sim = scope.getSimilarityScore(post, nestedPost);

                if (sim > 0.18) {
                    scope.setSimRelationshipIfNeeded(post, nestedPost, function() {
                        nestedIteratorComplete();
                    });
                } else {
                    nestedIteratorComplete();
                }
            }, function() {

                firstPostIteratorCompletion();

            }, {content_source_id: post.content_source_id}).start();

        }, function() {

        }).start();
    }

    setSimRelationshipIfNeeded(post, nestedPost, completion) {
        var scope = this;
        var leftSide = post,
            rightSide = nestedPost;

        if (nestedPost.id < post.id) {
            leftSide = nestedPost;
            rightSide = post;
        }

        pg('aggregated_posts_posts')
            .where({
                post_id: leftSide.id
            }).where({
                matching_post_id: rightSide.id
            }).then(function(posts) {
                //aggregated_post_id
                if (posts.length) {
                   // scope.insertNewPair(post, nestedPost, posts[0].aggregated_post_id, completion);
                } else {
                    pg('aggregated_posts').insert({}).returning('id').then(function(aggPostId) {
                        scope.insertNewPair(post, nestedPost, aggPostId[0], completion);
                    });
                }
            });
    }

    insertNewPair(post, matchingPost, aggId, completion) {
        pg('aggregated_posts_posts').insert({
            post_id: post.id,
            matching_post_id: matchingPost.id,
            aggregated_post_id: aggId
        }).then(completion);
    } 

    getSimilarityScore(post1, post2) {
        return similarity(post1.description, post2.description);
    }
}

class PostIterator {

    constructor(processorFN, completionFN, whereNot) {
        this.offset = 0
        this.posts = [];
        this.processorFN = processorFN
        this.completionFN = completionFN;
        this.whereNot = whereNot;
    }

    start() {
        var scope = this;
        var query = pg('posts')
            .orderBy('posts.id')
            .limit(100)
            .offset(this.offset);

        if (this.whereNot) {
            query.whereNot(this.whereNot);
        }

         query
            .then(function(posts) {
                if (posts.length) {
                    scope.posts = posts;
                    scope.execute(scope.posts[0], 0);
                } else {
                    scope.completionFN();
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    execute(post, i) {
        var scope = this;
        scope.processorFN(post, function() {
            var j = i + 1;
            if (scope.posts[j]) {
                scope.execute(scope.posts[j], j);
            } else {
               scope.offset += 100;
               scope.start();
            }
        });
    }
}

module.exports = Associater;