import db from './connection.ts'
import { Pet } from '../../models/pet.ts'

// GET all pets from the "pets" table
export async function getAllPets() {
  const pets = await db('pets').select()
  return pets.map((pet) => ({
    ...pet,
    homeSuburb: pet.home_suburb,
    lastLocation: pet.last_location,
    lastSeenDate: pet.last_seen_date,
    photoUrl: pet.photo_url,
    registrationNumber: pet.registration_number,
  })) as Pet[]
}

// GET by ID
export async function getPetById(id: number | string) {
  const pet = await db('pets').select().first().where({ id })
  return {
    ...pet,
    homeSuburb: pet.home_suburb,
    lastLocation: pet.last_location,
    lastSeenDate: pet.last_seen_date,
    photoUrl: pet.photo_url,
    registrationNumber: pet.registration_number,
  } as Pet
}

//POST: Add a new pet
export async function addPet(data: Pet) {
  const [id] = await db('pets').insert({
    species: data.species,
    breed: data.breed,
    name: data.name,
    sex: data.sex,
    desexed: data.desexed,
    colour: data.colour,
    age: data.age,
    size: data.size,
    microchipped: data.microchipped,
    home_suburb: data.homeSuburb,
    last_location: data.lastLocation,
    last_seen_date: data.lastSeenDate,
    photo_url: data.photoUrl,
    registration_number: data.registrationNumber,
  })
  // { last_seen_date: data.lastSeenDate }
  const newPet = await getPetById(id)
  return newPet
}

// UPDATE a pet by ID
export async function updatePetById(id: number, data: Pet) {
  await db('pets').where({ id }).update(data)
}

// DELETE a pet by ID
export async function deletePetById(id: number) {
  await db('pets').where({ id }).del()
}
