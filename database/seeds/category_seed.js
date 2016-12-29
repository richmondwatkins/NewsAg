
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(), 

    knex('categories').insert({id: 1, name: 'Politics'})
  );
};
