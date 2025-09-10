/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('pets', (table) => {
    table.increments('id')
    table.integer('owner_id')
    table.string('species')
    table.string('breed')
    table.string('name')
    table.string('sex')
    table.boolean('desexed')
    table.string('colour')
    table.integer('age')
    table.string('size')
    table.boolean('microchipped')
    table.string('home_suburb')
    table.string('last_location')
    table.timestamp('last_seen_date')
    table.string('photo_url')
    table.boolean('lost')
    table.integer('registration_number')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('pets')
}
