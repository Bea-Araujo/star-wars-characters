import Link from "next/link";
import {
  Character,
  CustomError,
  FilmsDTO,
  PlanetDTO,
  SpeciesDTO,
  StarshipsDTO,
  VehiclesDTO,
} from "../libs/types";
import styles from "./page.module.css";

interface DetailedCharacterPage {
  params: {
    id: string;
  };
}

async function fetchCharacterById(id: string) {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    const newData = new Character(data);

    const homeworld: PlanetDTO = await fetchAdditionalData(newData.homeworld);
    const species: SpeciesDTO[] = await fetchManyUrls(newData.species);
    const vehicles: VehiclesDTO[] = await fetchManyUrls(newData.vehicles);
    const starships: StarshipsDTO[] = await fetchManyUrls(newData.starships);
    const films: FilmsDTO[] = await fetchManyUrls(newData.films);

    newData.homeworldData = homeworld;
    newData.speciesData = species;
    newData.vehiclesData = vehicles;
    newData.starshipsData = starships;
    newData.filmsData = films;
    return newData;
  } catch (e) {
    return new CustomError("Unable to get character's data");
  }
}

async function fetchAdditionalData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchManyUrls(urls: string[]) {
  return await Promise.all(urls.map((url) => fetchAdditionalData(url)));
}

export default async function DetailedCharacterPage({
  params: { id },
}: DetailedCharacterPage) {
  const character: Character | CustomError = await fetchCharacterById(id);

  const fields = {
    name: "Name",
    height: "Height",
    mass: "Weight",
    gender: "Gender",
    eyeColor: "Eye color",
    hairColor: "Hair color",
    skinColor: "Skin color",
    birthYear: "Year of birth",
  };

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
  };

  const filmFields = {
    title: "Title",
    episode_id: "Episode",
    director: "Director",
    producer: "Producer",
    release_date: "Release date",
  };

  const vehicleFields = {
    name: "Name",
    model: "Model",
    manufacturer: "Manufacturer",
    cost_in_credits: "Cost",
    length: "Length",
    max_atmosphering_speed: "Max atmospheric speed",
    cargo_capacity: "Cargo capacity",
    consumables: "Consumables",
    vehicle_class: "Vehicle class",
  };

  const starshipFields = {
    name: "Name",
    model: "Model",
    manufacturer: "Manufacturer",
    cost_in_credits: "Cost",
    length: "Length",
    max_atmosphering_speed: "Max atmospheric speed",
    cargo_capacity: "Cargo capacity",
    consumables: "Consumables",
    hyperdrive_rating: "Hyperdrive rating",
    MGLT: "MGLT",
    starship_class: "Vehicle class",
  };

  function createRowsOfData(
    typeOfField: string,
    fieldsObject: Record<string, string>,
    valueObject: any
  ) {
    return Object.entries(fieldsObject).map(([key, value]) => {
      return (
        <article
          key={`${typeOfField}-${key}`}
          className={styles.informationRow}
        >
          <p>{value}</p>
          <p>{valueObject[key]}</p>
        </article>
      );
    });
  }

  function createRowsOfSubData(
    typeOfField: string,
    fieldsObject: Record<string, string>,
    arrayOfValues: any[]
  ) {
    return arrayOfValues.map((objectValue, i) => {
      return (
        <div key={`${typeOfField}-${i}`}>
          {createRowsOfData(typeOfField, fieldsObject, objectValue)}
        </div>
      );
    });
  }

  return character instanceof CustomError ? (
    <main className={styles.pageContent}>
      <p>{character.errorDescription}</p>
    </main>
  ) : (
    <main className={styles.pageContent}>
      <Link className={styles.navigationBtn} href={"/"}>
        <span className="material-symbols-outlined">arrow_back</span>
        Go back</Link>

      <section className={styles.cardsContainer}>
      <div className={styles.cardContainer}>
        <h3>Character data</h3>
        <div className={styles.informationGrid}>
          {createRowsOfData("character-fields", fields, character)}
        </div>
      </div>

      <div className={styles.cardContainer}>
        <h3>Homeworld data</h3>
        <div className={styles.informationGrid}>
          {createRowsOfData(
            "homeworld-fields",
            homeworldFields,
            character.homeworldData
          )}
        </div>
      </div>

      <div className={styles.cardContainer}>
        <h3>Vehicles data</h3>
        <div className={styles.informationGrid}>
          {createRowsOfSubData(
            "vehicle-fields",
            vehicleFields,
            character.vehiclesData!
          )}
        </div>
      </div>

      <div className={styles.cardContainer}>
        <h3>Starships data</h3>
        <div className={styles.informationGrid}>
          {createRowsOfSubData(
            "starships-fields",
            starshipFields,
            character.starshipsData!
          )}
        </div>
      </div>

      <div className={styles.cardContainer}>
        <h3>Films data</h3>
        <div className={styles.informationGrid}>
          {createRowsOfSubData("film-fields", filmFields, character.filmsData!)}
        </div>
      </div>
      </section>
    </main>
  );
}
