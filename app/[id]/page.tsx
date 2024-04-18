import { Character, CustomError } from "../libs/types"

interface DetailedCharacterPage{
    params: {
        id: string
    }
}

async function fetchCharacterById(id: string){
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`)
        const data = await response.json()
        const newData = new Character(data)

        const homeworld = await fetchAdditionalData(newData.homeworld)
        const species = await fetchManyUrls(newData.species);
        const vehicles = await fetchManyUrls(newData.vehicles);
        const starships = await fetchManyUrls(newData.starships)
        const films = await fetchManyUrls(newData.films)

        newData.homeworldData = homeworld;
        newData.speciesData = species;
        newData.vehiclesData = vehicles;
        newData.starshipsData = starships;
        newData.filmsData = films;
        console.log(newData)
        return newData
    } catch(e) {
        return new CustomError("Unable to get character's data")
    }   
}

async function fetchAdditionalData(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

async function fetchManyUrls(urls: string[] ){
    return await Promise.all(urls.map(url => fetchAdditionalData(url)));
}

export default async function DetailedCharacterPage({params: {id}}: DetailedCharacterPage) {
    console.log(id)
    const character: Character | CustomError = await fetchCharacterById(id)
    console.log(character)

    type CharacterFields = Pick<Character, "name" | "height" | "mass" | "gender"| "eyeColor" | "hairColor" | "skinColor" | "birthYear">;

    const fields: CharacterFields = {
        name: 'Name',
        height: "Height",
        mass: "Weight",
        gender: "Gender",
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

    return character instanceof CustomError? (
        <main>
            <p>{character.errorDescription}</p>
        </main>
    ) : (
        <main>
            <div>
                <h3>Character data</h3>
                {
                    Object.entries(fields).map(([key, value]) => {
                        return (
                            <article key={`field-${key}`}>
                                <p>{value}</p>
                                <p>{character[key as keyof CharacterFields]}</p>
                            </article>
                        )
                    })
                }
            </div>

            <div>
                <h3>Homeworld data</h3>
            </div>

            <div>
                <h3>Films data</h3>
            </div>

            <div>
                <h3>Vehicles data</h3>
            </div>

            <div>
                <h3>Starships data</h3>
            </div>
        </main>
    )
}