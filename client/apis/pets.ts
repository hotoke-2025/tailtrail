import request from 'superagent'
import type { Pet, PetFileData } from '../../models/pet'

const rootURL = new URL(`/api/v1`, document.baseURI)

// GET (Fetch all pets)
export async function getPets(): Promise<Pet[]> {
  const response = await request.get(`${rootURL}/pets`)
  return response.body as Pet[]
}

// GET (Fetch one pet by ID)
export async function getPetById(id: number): Promise<Pet> {
  const response = await request.get(`${rootURL}/pets/${id}`)
  return response.body as Pet
}

// POST (Add new pet)
export async function addPet(data: PetFileData): Promise<Pet> {
  const response = await request.post(`${rootURL}/pets`).send(data)
  return response.body as Pet
}

// PATCH (Update a pet)
export async function updatePet(id: number, data: Pet) {
  await request.patch(`${rootURL}/pets/${id}`).send(data)
}

// DELETE (Delete a pet)
export async function deletePet(id: number) {
  await request.delete(`${rootURL}/pets/${id}`)
}
