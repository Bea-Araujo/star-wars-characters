"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { ApiResponse, Character } from "./libs/types";
import CharacterCard from "./components/characterCard";

export default function Home() {
  const [page, setPage] = useState(1);
  const isPageMin = useMemo(() => {
    return page === 1;
  }, [page]);

  function increasePage() {
    if (isPageMax || isLoading) return;
    setPage((previousPage) => previousPage + 1);
  }

  function decreasePage() {
    if (isPageMin || isLoading) return;
    setPage((previousPage) => previousPage - 1);
  }

  const [results, setResults] = useState<Character[] | null>(null);
  const [count, setCount] = useState(0);

  const maxPage = useMemo(() => {
    const hasAdditionalPage = count % 10 > 0;
    return Math.round(count / 10) + (hasAdditionalPage ? 1 : 0);
  }, [count]);

  const isPageMax = useMemo(() => {
    return page === maxPage;
  }, [maxPage, page]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCharacters() {
    try {
      setError(false);
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`,
        { cache: "no-store" }
      );
      const data: ApiResponse = await response.json();
      setResults(data.results.map(el =>  new Character(el)));
      setCount(data.count);
      return;
    } catch (e) {
      setError(true);
      setPage(1);
      setCount(0);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCharacters();
  }, [page]);

  return (
    <main className={styles.main}>
      
      <div className={styles.navigationContainer}>
        <button className={`${styles.previous} ${(isPageMin? styles.inactive : '')}`} onClick={decreasePage}>Previous</button>
        <p>
          {page} / {maxPage}
        </p>
        <button className={`${styles.next} ${(isPageMax && styles.inactive)}`} onClick={increasePage}>Next</button>
      </div>

      {isLoading && <p>Loading</p>}

      <section className={styles.cardsGrid}>
        {results === null ? (
          <p>aaa</p>
        ) : (
          results.map((el, i) => {
            return (
              <CharacterCard
                height={el.height}
                mass={el.mass}
                gender={el.gender}
                name={el.name}
                id={el.id}
                key={`character-${el.id}-${el.name}`}
              />
            );
          })
        )}
      </section>

    </main>
  );
}
