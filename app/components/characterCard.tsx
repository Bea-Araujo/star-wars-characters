import Link from "next/link";
import style from "./characterCard.module.css"

interface CharacterCardProps{
  height: string;
  mass: string;
  gender: string;
  name: string;
  id: string;
}

export default function CharacterCard({height, mass, gender, name, id}: CharacterCardProps) {
    return (
      <div className={style.container}>
        <h3>{name}</h3>

        <p>Height: {height}cm</p>
        <p>Weight: {mass}kg</p>
        <p>Gender: {gender}</p>
        {id}

        <p>See more -&gt;</p>
        <Link href={`/${id}`}>See more</Link>
      </div>
    );
  }
  