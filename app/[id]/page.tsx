import { Character } from "../libs/types"

interface DetailedCharacterPage{
    params: {
        id: string
    }
}

async function fetchCharacterById(id: string){
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const data = await response.json()
    console.log(data)
    const newData = new Character(data)
  
    
    return newData
}

async function fetchAdditionalData(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

export default async function DetailedCharacterPage({params: {id}}: DetailedCharacterPage) {
    console.log(id)
    const character: Character = await fetchCharacterById(id)
    console.log(character)

    const fields = {
        name: 'Name',
        height: "Height",
        mass: "Weight",
        gender: "Gender",
        films: "Films",
        species: "Species",
        vehicles: "Vehicles",
        starships: "Starships",
        eyeColor: "Eye color",
        hairColor: "Hair color",
        skinColor: "Skin color",
        birthYear: 'Year of birth',
    }

    const homeworldFields = {
        name: 'Name',
        rotation_period: 'Rotation period',
        orbital_period: 'Orbital period',
        diameter: 'Diameter',
        climate: 'Climate',
        gravity: 'Gravity',
        terrain: 'Terrain',
        surface_water: 'Surface water',
        population: 'Population',
    }

    return (
        <main>
            {/* {
                Object.entries(fields).map(([key, value]) => {
                    return (
                        <p key={`field-${key}`}>{value} and {character[key]}</p>
                    )
                })
            }
             */}
             aaa
        </main>
    )
}