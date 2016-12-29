
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table){
        table.increments('id').primary();
        table.integer('content_source_id').unsigned().index().references('id').inTable('content_sources');
        table.string('guid');
        table.text('title');
        table.string('url');
        table.text('description');
        table.text('summary');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
