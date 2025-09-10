export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('owners').del()

  // Inserts seed entries
  await knex('owners').insert([
    {
      id: 1,
      auth0_id: 'auth0|123456',
      first_name: 'gloria',
      last_name: 'irlam',
      phone_number: '0220751111',
      email_address: 'gloria@gmail.com',
      suburb: 'auckland central',
    },
    {
      id: 2,
      auth0_id: 'github|1234567',
      first_name: 'dwayne',
      last_name: 'johnson',
      phone_number: '027567098',
      email_address: 'therock@gmail.com',
      suburb: 'island bay',
    },
    {
      id: 3,
      auth0_id: 'google-oauth2|108356789012345678901',
      first_name: 'anna',
      last_name: 'white',
      phone_number: '0215687945',
      email_address: 'anna.email@gmail.com',
      suburb: 'miramar',
    },
    {
      id: 4,
      auth0_id: 'facebook|123456789012345',
      first_name: 'jack',
      last_name: 'black',
      phone_number: '0270039485',
      email_address: 'jack_b@gmail.com',
      suburb: 'hamilton',
    },
  ])
}
