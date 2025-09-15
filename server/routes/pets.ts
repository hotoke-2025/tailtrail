import express from 'express'
import * as db from '../db/pets'
import multer from 'multer'

// Multer code starts

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

// Multer code ends

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

// PATCH /api/v1/pets/:id - Update a pet
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updatedData = req.body
    await db.updatePetById(id, updatedData)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update pet' })
  }
})

// DELETE /api/v1/pets/:id - Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deletePetById(id)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete pet' })
  }
})

// PUT /api/v1/pets/:id - Upload an image via Multer
router.put('/:id', upload.single('uploaded_file'), async (req, res) => {
  let pet
  try {
    if (req.file)
      pet = await db.uploadPet(Number(req.params.id), {
        ...req.body,
        imgUrl: `/images/${req.file.filename}`,
      })
    else pet = await db.updatePet(Number(req.params.id), req.body)

    if (!pet) res.status(404).json({ error: 'No such pet' })
    else res.status(200).json(pet)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error while uploading image')
    }
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

export default router
