
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('content_sources', function(table){
        table.increments('id').primary();
        table.integer('content_provider_id').unsigned().index().references('id').inTable('content_providers');
        table.integer('category_id').unsigned().index().references('id').inTable('categories');
        table.string('url');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
