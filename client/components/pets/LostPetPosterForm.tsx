import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PetFileData } from '../../../models/pet'
import { addPet } from '../../apis/pets'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { useRef } from 'react'

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
  latitude: '',
  longitude: '',
  file: undefined,
}

type LostPetPosterFormProps = {
  isOpen: boolean
  onClose?: () => void
  onSuccess?: () => void
}

export default function LostPetPosterForm({
  isOpen,
  onClose,
  onSuccess,
}: LostPetPosterFormProps) {
  const [formData, setFormData] = useState(initialState)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const handlePlaceChange = () => {
    if (!autocompleteRef.current) return
    const place = autocompleteRef.current.getPlace()
    const address = place?.formatted_address ?? ''
    const lat = place?.geometry?.location?.lat
      ? place.geometry.location.lat().toString()
      : ''
    const lng = place?.geometry?.location?.lng
      ? place.geometry.location.lng().toString()
      : ''
    if (address && lat && lng) {
      setFormData((prev: PetFileData) => ({
        ...prev,
        lastLocation: address,
        latitude: lat,
        longitude: lng,
      }))
    }
  }

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files)
      setFormData({
        ...formData,
        file: evt.target.files[0],
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    multiFormData.append(
      'registrationNumber',
      String(formData.registrationNumber),
    )
    multiFormData.append('latitude', formData.latitude)
    multiFormData.append('longitude', formData.longitude)

    if (formData.file) multiFormData.append('uploaded_file', formData.file)
    else multiFormData.append('photoUrl', formData.photoUrl)

    addMutation.mutate(multiFormData, {
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

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded bg-white p-6 shadow-lg">
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
          <p>Please upload a photo or copy of the poster below.</p>
          <input
            className="mt-4 flex justify-center rounded-md bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
            onChange={handleFileChange}
            type="file"
            required
          />
          <br></br>
          <p>Please provide as many details as possible.</p>
          <label htmlFor="lastLocation">
            <strong>Last Known Location (or location of poster): </strong>
          </label>{' '}
          <span className="text-red-500"> *</span>
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current =
                autocomplete as google.maps.places.Autocomplete
            }}
            onPlaceChanged={handlePlaceChange}
          >
            <input
              className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              // value={formData.lastLocation}
              // onChange={handleChange}
              type="text"
              id="lastLocation"
              placeholder="Enter last known location"
              required
            />
          </Autocomplete>
          <br></br>
          <label htmlFor="name">
            <strong>Name: </strong>
          </label>
          <input
            className="rounded border border-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
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
          <br></br>
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
