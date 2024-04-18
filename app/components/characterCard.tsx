import Link from "next/link";
import style from "./characterCard.module.css";

interface CharacterCardProps {
  height: string;
  mass: string;
  gender: string;
  name: string;
  id: string;
}

export default function CharacterCard({
  height,
  mass,
  gender,
  name,
  id,
}: CharacterCardProps) {
  return (
    <div className={style.container}>
      <h3>{name}</h3>

      <article className={style.informationGrid}>
        <p>Height: </p>
        <p>{height}cm</p>
        <p>Weight:</p>
        <p> {mass}kg</p>
        <p>Gender: </p>
        <p> {gender}</p>
      </article>

      <Link href={`/${id}`}>See more</Link>
    </div>
  );
}
