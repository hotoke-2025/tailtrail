import request from 'superagent'
import type { Pet } from '../../models/pet'
import { useAccessToken } from '../components/nav/Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

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
export async function addPet(petData: FormData, token: string): Promise<Pet> {
  
  try {
    console.log('Making request with token:', token)
    const response = await fetch(`${rootURL}/pets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: petData,
    })
    
    if (!response.ok) {
       const errorText = await response.text()
      console.error('Server error:', errorText)
      throw new Error('Failed to add pet')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error adding pet:', error)
    throw error
  }
}


// PATCH (Update a pet)
export async function updatePet(id: number, data: Pet, token: string) {
  console.log('Making request with token:', token)
  const response = await fetch(`${rootURL}/pets/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: petData,
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Server error:', errorText)
    throw new Error('Failed to update pet')
  }
}

// DELETE (Delete a pet)
export async function deletePet(id: number) {
  await request.delete(`${rootURL}/pets/${id}`)
}
