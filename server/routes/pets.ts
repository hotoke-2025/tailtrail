import express from 'express'
import * as db from '../db/pets'

const router = express.Router()

// GET /api/pets - return all pets
router.get('/', async (req, res) => {
  try {
    const pets = await db.getAllPets()
    res.json(pets)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to fetch pets' })
  }
})

// GET /api/pets/:id - return one pet by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const pet = await db.getPetById(id)
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' })
    }
    res.json(pet)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to fetch pet' })
  }
})

// POST /api/v1/pets - Add new pet
router.post('/', async (req, res) => {
  try {
    const newPetData = req.body
    const newPet = await db.addPet(newPetData)
    res.status(201).json(newPet)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add pet' })
  }
})

export default router