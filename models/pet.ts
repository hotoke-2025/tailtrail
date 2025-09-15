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
  latitude: string
  longitude: string
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
  latitude: string
  longitude: string
}

export interface PetFileData extends PetData {
  file: File | undefined
}
