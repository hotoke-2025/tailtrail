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