import { Character, CustomError, FilmsDTO, PlanetDTO, SpeciesDTO, StarshipsDTO, VehiclesDTO } from "../libs/types"

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

        const homeworld: PlanetDTO = await fetchAdditionalData(newData.homeworld)
        const species: SpeciesDTO[] = await fetchManyUrls(newData.species);
        const vehicles: VehiclesDTO[] = await fetchManyUrls(newData.vehicles);
        const starships: StarshipsDTO[] = await fetchManyUrls(newData.starships)
        const films: FilmsDTO[] = await fetchManyUrls(newData.films)

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
        name: "Name",
        height: "Height",
        mass: "Weight",
        gender: "Gender",
        eyeColor: "Eye color",
        hairColor: "Hair color",
        skinColor: "Skin color",
        birthYear: "Year of birth",
    }

    const homeworldFields = {
        name: "Name",
        rotation_period: "Rotation period",
        orbital_period: "Orbital period",
        diameter: "Diameter",
        climate: "Climate",
        gravity: "Gravity",
        terrain: "Terrain",
        surface_water: "Surface water",
        population: "Population",
    }

    const filmFields = {
        title: "Title",
        episode_id: "Episode",
        director: "Director",
        producer: "Producer",
        release_date: "Release date"
    }

    const vehicleFields = {
        name: "Name",
        model: "Model",
        manufacturer: "Manufacturer",
        cost_in_credits: "Cost",
        length: "Length",
        max_atmospheric_speed: "Max atmospheric speed",
        cargo_capacity: "Cargo capacity",
        consumables: "Consumables",
        vehicle_class: "Vehicle class"
    }

    const starshipFields = {
        name: "Name",
        model: "Model",
        manufacturer: "Manufacturer",
        cost_in_credits: "Cost",
        length: "Length",
        max_atmospheric_speed: "Max atmospheric speed",
        cargo_capacity: "Cargo capacity",
        consumables: "Consumables",
        hyperdrive_rating: 'Hyperdrive rating',
        MGLT: "MGLT",
        starship_class: "Vehicle class",
    }

    function createRowsOfData(typeOfField: string, fieldsObject: Record<string, string>, valueObject: any){
        return Object.entries(fieldsObject).map(([key, value]) => {
            return (
                <article key={`${typeOfField}-${key}`}>
                    <p>{value}</p>
                    <p>{valueObject[key]}</p>
                </article>
            )
        })
    }

    return character instanceof CustomError? (
        <main>
            <p>{character.errorDescription}</p>
        </main>
    ) : (
        <main>
            <div>
                <h3>Character data</h3>
                { createRowsOfData('character-fields', fields, character) }
            </div>

            <div>
                <h3>Homeworld data</h3>
                { createRowsOfData('character-fields', homeworldFields, character.homeworldData) }
            </div>

            <div>
                <h3>Films data</h3>
                { character.filmsData!.map(film => createRowsOfData('character-fields', filmFields, film))}
            </div>

            <div>
                <h3>Vehicles data</h3>
                { character.vehiclesData!.map(vehicle => createRowsOfData('character-fields', vehicleFields, vehicle))}
            </div>

            <div>
                <h3>Starships data</h3>
                { character.starshipsData!.map(starship => createRowsOfData('character-fields', starshipFields, starship))}
            </div>
        </main>
    )
}