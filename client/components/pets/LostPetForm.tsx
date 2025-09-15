import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PetFileData } from '../../../models/pet'
import { addPet } from '../../apis/pets'

const initialState: PetFileData = {
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
  registrationNumber: '',
  file: undefined,
}

type LostPetFormProps = {
  isOpen: boolean
  onClose?: () => void
  onSuccess?: () => void
}

export default function LostPetForm({
  isOpen,
  onClose,
  onSuccess,
}: LostPetFormProps) {
  const [formData, setFormData] = useState(initialState)

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files)
      setFormData({
        ...formData,
        photoUrl: evt.target.files
          ? URL.createObjectURL(evt.target.files[0])
          : '',
      })
  }

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

    const multiFormData = new FormData()

    multiFormData.append('desexed', String(formData.desexed))
    multiFormData.append('species', formData.species)
    multiFormData.append('breed', formData.breed)
    multiFormData.append('name', formData.name)
    multiFormData.append('sex', formData.sex)
    multiFormData.append('colour', formData.colour)
    multiFormData.append('age', String(formData.age))
    multiFormData.append('size', formData.size)
    multiFormData.append('microchipped', String(formData.microchipped))
    multiFormData.append('homeSuburb', formData.homeSuburb)
    multiFormData.append('lastLocation', formData.lastLocation)
    multiFormData.append('lastSeenDate', formData.lastSeenDate)
    multiFormData.append('lost', String(formData.lost))
    multiFormData.append('registrationNumber', formData.registrationNumber)

    if (formData.file) multiFormData.append('uploaded_file', formData.file)
    else multiFormData.append('photoUrl', formData.photoUrl)

    addMutation.mutate(formData, {
      onSuccess: () => {
        setFormData(initialState)
        if (onClose) onClose()
        if (onSuccess) onSuccess()
      },
    })
  }

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })

  if (!isOpen) return null

  // not sure what to do for the "photoURL" segment of the form
  // multer library. PetPals. docs file README for multer
  // how are "id" and "owner id" handled here?
  // do any owner details go here? For the database

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl rounded bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-sm text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
        <form
          encType="multipart/form-data"
          className="space-y-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            <strong>Name: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            required
          />
          <br></br>
          <label htmlFor="species">
            <strong>Species: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.species}
            onChange={handleChange}
            type="text"
            id="species"
            required
          />
          <br></br>
          <br></br>
          <label>
            <strong>Sex: </strong>
            <select
              className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sex}
              onChange={handleChange}
              id="sex"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <br></br>
          <label htmlFor="home suburb">
            <strong>Home Suburb: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.homeSuburb}
            onChange={handleChange}
            type="text"
            id="homeSuburb"
            required
          />
          <br></br>
          <label htmlFor="registration number">
            <strong>Council Registration Number: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.registrationNumber}
            onChange={handleChange}
            type="string"
            id="registrationNumber"
          />
          <br></br>
          <label htmlFor="microchipped">
            <strong>Is the animal micro-chipped? </strong>
          </label>
          <input
            type="checkbox"
            checked={formData.microchipped}
            onChange={(e) =>
              setFormData({ ...formData, microchipped: e.target.checked })
            }
            id="microchipped"
          />
          <br></br>
          <label htmlFor="desexed">
            <strong>Has the animal been desexed? </strong>
          </label>
          <input
            type="checkbox"
            checked={formData.desexed}
            onChange={(e) =>
              setFormData({ ...formData, desexed: e.target.checked })
            }
            id="desexed"
          />
          <br></br>
          <label htmlFor="breed">
            <strong>Breed: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.breed}
            onChange={handleChange}
            type="text"
            id="breed"
          />
          <br></br>
          <label htmlFor="colour">
            <strong>Colours: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.colour}
            onChange={handleChange}
            type="text"
            id="colour"
          />
          <br></br>
          <label htmlFor="age">
            <strong>Age: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.age}
            onChange={handleChange}
            type="number"
            id="age"
            placeholder="Approximate age of the animal"
          />
          <br></br>
          <br></br>
          <label>
            <strong>Size: </strong>
            <select
              className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.size}
              onChange={handleChange}
              id="size"
            >
              <option value="">Select</option>
              <option value="Very small">Very small</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Very large">Very large</option>
            </select>
          </label>
          <br></br>
          <label htmlFor="last location">
            <strong>Last Known Location: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.lastLocation}
            onChange={handleChange}
            type="text"
            id="lastLocation"
          />
          <br></br>
          <label htmlFor="last seen date">
            <strong>Date Last Seen: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.lastSeenDate}
            onChange={handleChange}
            type="date"
            id="lastSeenDate"
          />
          <br></br>
          <input
            className="mt-4 flex justify-center rounded-md bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
            onChange={handleFileChange}
            type="file"
            // accept="image/*"
          />
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700"
              data-pending={addMutation.isPending}
            >
              <strong>Submit</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
