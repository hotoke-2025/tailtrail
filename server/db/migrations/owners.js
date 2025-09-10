/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('owners', (table) => {
    table.increments('id')
    table.string('auth0_id')
    table.string('first_name')
    table.string('last_name')
    table.string('phone_number')
    table.string('email_address')
    table.string('suburb')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('owners')
}