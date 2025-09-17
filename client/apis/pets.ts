import request from 'superagent'
import type { Pet } from '../../models/pet'
import { useAccessToken } from '../components/nav/Authenticated'

const rootURL = new URL(`/api/v1`, document.baseURI)

const authenticatedRequest = async (method: string, endpoint: string, data?: any) => {
  const token = await useAccessToken()
  let req = request(method, `${rootURL}${endpoint}`)
    .set('Authorization', `Bearer ${token}`)
  
  if (data) {
    req = req.send(data)
  }
  
  return req
}

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
export async function addPet(petData: FormData): Promise<Pet> {
  const response = await authenticatedRequest('POST', '/pets', petData)
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
