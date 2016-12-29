
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('aggregated_posts', function(table){
        table.increments('id').primary();
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
