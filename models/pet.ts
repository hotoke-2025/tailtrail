export interface Pet {
  id: number
  ownerId: number
  species: string
  breed: string
  name: string
  sex: string
  desexed: boolean
  colour: string
  age: number
  size: string
  microchipped: boolean
  homeSuburb: string
  lastLocation: string
  lastSeenDate: string
  photoUrl: string
  lost: boolean
  registrationNumber: number
}

export interface PetData {
  species: string
  breed: string
  name: string
  sex: string
  desexed: boolean
  colour: string
  age: number
  size: string
  microchipped: boolean
  homeSuburb: string
  lastLocation: string
  lastSeenDate: string
  photoUrl: string
  lost: boolean
  registrationNumber: number
}