function LostPetForm() {
  const [newLostPet, setNewLostPet] = useState({
    species: '',
    breed: '',
    name: '',
    sex: '',
    desexed: '',
    colour: '',
    age: '',
    size: '',
    microchipped: '',
    homeSuburb: '',
    lastLocation: '',
    lastSeenDate: '',
    photoUrl: '',
    lost: '',
    registrationNumber: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.id
    const value = event.target.value
    const newLostPetObject = { ...newLostPet, [key]: value }
    setNewLostPet(newLostPetObject)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAdd(newLostPet)

    setNewLostPet({
      species: '',
      breed: '',
      name: '',
      sex: '',
      desexed: '',
      colour: '',
      age: '',
      size: '',
      microchipped: '',
      homeSuburb: '',
      lastLocation: '',
      lastSeenDate: '',
      photoUrl: '',
      lost: '',
      registrationNumber: '',
    })
  }

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addLostPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })

  const handleAdd = async () => {
    addMutation.mutate(newLostPet)
  }

  // somewhere in here we need to set "lost" to "true" in the database upon submission of form
  // not sure what to do for the "photoURL" segment of the form
  // need to change the inputs for "desexed" and "microchipped" to booleans
  // "last seen date" could be a calendar. It's a timestamp in the database currently
  // how are "id" and "owner id" handled here?
  // do any owner details go here? For the database

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        value={newLostPet.name}
        onChange={handleChange}
        type="text"
        id="name"
        placeholder="Name of the animal"
      />
      <label htmlFor="registration number">Council Registration Number:</label>
      <input
        value={newLostPet.registrationNumber}
        onChange={handleChange}
        type="text"
        id="registrationNumber"
        placeholder="The council registration number of the animal (if applicable)"
      />
      <label htmlFor="microchipped">Micro-chipped:</label>
      <input
        value={newLostPet.microchipped}
        onChange={handleChange}
        type="text"
        id="microchipped"
        placeholder="Is the animal micro-chipped? (if applicable)"
      />
      <label htmlFor="species">Species:</label>
      <input
        value={newLostPet.species}
        onChange={handleChange}
        type="text"
        id="species"
        placeholder="Species of the animal"
      />
      <label htmlFor="breed">Breed:</label>
      <input
        value={newLostPet.breed}
        onChange={handleChange}
        type="text"
        id="breed"
        placeholder="Breed of the animal (if applicable)"
      />
      <label htmlFor="sex">Sex:</label>
      <input
        value={newLostPet.sex}
        onChange={handleChange}
        type="text"
        id="sex"
        placeholder="Sex of the animal (male or female)"
      />
      <label htmlFor="desexed">Desexed:</label>
      <input
        value={newLostPet.desexed}
        onChange={handleChange}
        type="text"
        id="desexed"
        placeholder="Has the animal been desexed?"
      />
      <label htmlFor="colour">Colours:</label>
      <input
        value={newLostPet.colour}
        onChange={handleChange}
        type="text"
        id="colour"
        placeholder="Dominant colours of the animal"
      />
      <label htmlFor="age">Age:</label>
      <input
        value={newLostPet.age}
        onChange={handleChange}
        type="text"
        id="age"
        placeholder="Approximate age of the animal"
      />
      <label htmlFor="size">Size:</label>
      <input
        value={newLostPet.size}
        onChange={handleChange}
        type="text"
        id="size"
        placeholder="Size of the animal (very small, small, medium, large, very large)"
      />
      <label htmlFor="home suburb">Home Suburb:</label>
      <input
        value={newLostPet.homeSuburb}
        onChange={handleChange}
        type="text"
        id="homeSuburb"
        placeholder="Home suburb of the animal"
      />
      <label htmlFor="last location">Last Known Location:</label>
      <input
        value={newLostPet.lastLocation}
        onChange={handleChange}
        type="text"
        id="lastLocation"
        placeholder="Last known location of the animal (as specifically as you can)"
      />
      <label htmlFor="last seen date">Date Last Seen:</label>
      <input
        value={newLostPet.lastSeenDate}
        onChange={handleChange}
        type="text"
        id="lastSeenDate"
        placeholder="Date on which the animal was last seen in the last known location"
      />
      <label htmlFor="photo url">Photo:</label>
      <input
        value={newLostPet.photoUrl}
        onChange={handleChange}
        type="text"
        id="photoUrl"
        placeholder="Upload an up-to-date photo of the animal"
      />
      <button data-pending={addLostPet.isPending}>Submit</button>
    </form>
  )
}
