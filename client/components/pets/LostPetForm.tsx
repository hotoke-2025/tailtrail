import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PetData } from '../../../models/pet'
import { addPet } from '../../apis/pets'

const initialState = {
  species: '',
  breed: '',
  name: '',
  sex: '',
  desexed: false,
  colour: '',
  age: 0,
  size: '',
  microchipped: false,
  homeSuburb: '',
  lastLocation: '',
  lastSeenDate: '',
  photoUrl: '',
  lost: true,
  registrationNumber: 0,
}

type LostPetFormProps = {
  onClose?: () => void
  onSuccess?: () => void
}

export default function LostPetForm({ onClose, onSuccess }: LostPetFormProps) {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const key = event.target.id
    const value = event.target.value
    const newLostPet = { ...formData, [key]: value }
    setFormData(newLostPet)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addMutation.mutate(formData, {
      onSuccess: () => {
        setFormData(initialState)
        if (onClose) onClose()
        if (onSuccess) onSuccess()
      },
    })
  }

  function addLostPet(variables: PetData) {
    return addPet(variables)
  }

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addLostPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })

  // not sure what to do for the "photoURL" segment of the form
  // multer library. PetPals. docs file README for multer
  // how are "id" and "owner id" handled here?
  // do any owner details go here? For the database

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        value={formData.name}
        onChange={handleChange}
        type="text"
        id="name"
        placeholder="Name of the animal"
        required
      />
      <label htmlFor="species">Species:</label>
      <input
        value={formData.species}
        onChange={handleChange}
        type="text"
        id="species"
        placeholder="Species of the animal"
        required
      />
      <label>
        Sex:
        <select value={formData.sex} onChange={handleChange} id="sex" required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label htmlFor="home suburb">Home Suburb:</label>
      <input
        value={formData.homeSuburb}
        onChange={handleChange}
        type="text"
        id="homeSuburb"
        placeholder="Home suburb of the animal"
        required
      />
      <label htmlFor="registration number">Council Registration Number:</label>
      <input
        value={formData.registrationNumber}
        onChange={handleChange}
        type="number"
        id="registrationNumber"
        placeholder="The council registration number of the animal (if applicable)"
      />
      <label htmlFor="microchipped">Is the animal micro-chipped?</label>
      <input
        type="checkbox"
        checked={formData.microchipped}
        onChange={(e) =>
          setFormData({ ...formData, microchipped: e.target.checked })
        }
        id="microchipped"
      />
      <label htmlFor="desexed">Has the animal been desexed?</label>
      <input
        type="checkbox"
        checked={formData.desexed}
        onChange={(e) =>
          setFormData({ ...formData, desexed: e.target.checked })
        }
        id="desexed"
      />
      <label htmlFor="breed">Breed:</label>
      <input
        value={formData.breed}
        onChange={handleChange}
        type="text"
        id="breed"
        placeholder="Breed of the animal (if applicable)"
      />
      <label htmlFor="colour">Colours:</label>
      <input
        value={formData.colour}
        onChange={handleChange}
        type="text"
        id="colour"
        placeholder="Dominant colours of the animal"
      />
      <label htmlFor="age">Age:</label>
      <input
        value={formData.age}
        onChange={handleChange}
        type="number"
        id="age"
        placeholder="Approximate age of the animal"
      />
      <label>
        Size:
        <select value={formData.size} onChange={handleChange} id="size">
          <option value="">Select</option>
          <option value="Very small">Very small</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Very large">Very large</option>
        </select>
      </label>
      <label htmlFor="last location">Last Known Location:</label>
      <input
        value={formData.lastLocation}
        onChange={handleChange}
        type="text"
        id="lastLocation"
        placeholder="Last known location of the animal (as specifically as you can)"
      />
      <label htmlFor="last seen date">Date Last Seen:</label>
      <input
        value={formData.lastSeenDate}
        onChange={handleChange}
        type="date"
        id="lastSeenDate"
        placeholder="Date on which the animal was last seen in the last known location"
      />
      <label htmlFor="photo url">Photo:</label>
      <input
        value={formData.photoUrl}
        onChange={handleChange}
        type="text"
        id="photoUrl"
        placeholder="Upload an up-to-date photo of the animal"
      />
      <button data-pending={addMutation.isPending}>Submit</button>
    </form>
  )
}
