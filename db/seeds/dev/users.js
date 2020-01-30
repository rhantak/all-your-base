exports.seed = function(knex) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('users').del() // delete all users

    // Now that we have a clean slate, we can re-insert our user data
    .then(() => {
      return Promise.all([
        // Insert a single user, return the user ID
        knex('users').insert({
          api_key: "asdf1234"
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
