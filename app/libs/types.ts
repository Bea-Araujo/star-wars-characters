export type ApiResponse = {
    "count": 82,
    "next": "https://swapi.dev/api/people/?page=2",
    "previous": null,
    "results": any[]
}

export class CharacterDTO{
    constructor (
        public name: string,
        public height: string,
        public mass: string,
        public hair_color: string,
        public skin_color: string,
        public eye_color: string,
        public birth_year: string,
        public gender: string,
        public homeworld: string,
        public films: string[],
        public species: string[],
        public vehicles: string[],
        public starships: string[],
        public created: string,
        public edited: string,
        public url: string,
    ) {}
}

export class Character{
    id: string 

    name: string
    height: string
    mass: string
    gender: string
    
    homeworld: string
    homeworldData?: {}

    films: string[]
    filmsData?: string[]
    species: string[]
    speciesData?: string[]
    vehicles: string[]
    vehiclesData?: string[]
    starships: string[]
    starshipsData?: string[]
    url: string
        
    hairColor: string
    skinColor: string
    eyeColor: string
    birthYear: string

    constructor(character: CharacterDTO){
      
        this.name = character.name
        this.height = character.height
        this.mass =    character.mass,
        this.gender = character.gender,
        this.homeworld = character.homeworld,
        this.films = character.films,
        this.species = character.species,
        this.vehicles = character.vehicles,
        this.starships = character.starships,
        this.url = character.url
        this.hairColor = character.hair_color,
        this.skinColor = character.skin_color,
        this.eyeColor = character.eye_color,
        this.birthYear = character.birth_year,

        this.id = this._getId()
    }

    _getId(){
        return this.url.split('/')[5] || 'Not Available'
    }
}

export class PlanetDTO{
    constructor(
        public name: string,
        public rotation_period: string,
        public orbital_period: string,
        public diameter: string,
        public climate: string,
        public gravity: string,
        public terrain: string,
        public surface_water: string,
        public population: string,
        public residents: string[]
    ) {}
}