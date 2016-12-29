
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('aggregated_posts_posts', function(table){
        table.integer('post_id').unsigned().index().references('id').inTable('posts');
        table.integer('matching_post_id').unsigned().index().references('id').inTable('posts');
        table.integer('aggregated_post_id').unsigned().index().references('id').inTable('aggregated_posts');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
