import db from './connection.ts'
import { Pet } from '../../models/pet.ts'

// GET all pets from the "pets" table
export async function getAllPets() {
  const pets = await db('pets').select()
  return pets as Pet[]
}

// GET by ID
export async function getPetById(id: number | string) {
  const pet = await db('pets').select().first().where({ id })
  return pet as Pet
}

//POST: Add a new pet
export async function addPet(data: Pet) {
  const [id] = await db('pets').insert(data)
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