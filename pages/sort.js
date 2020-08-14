import styles from "../assets/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([
    "Mateus",
    "Nandim",
    "Renanzin",
    "Marllon",
    "Léo",
    "lekD",
    "Ronaldo",
    "Jeff",
    "Raphael",
    "David",
    "Feijão",
    "Renatovisk",
    "Felipe",
    "Sandro Choradeira",
    "William",
  ]);
  const [list, setList] = useState([]);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const handleSort = () => {
    const randomPlayers = shuffle(players);
    const player = randomPlayers.shift();
    setPlayers(randomPlayers);

    const sorted = [...list];
    sorted.push(player);

    setList(sorted);
  };

  return (
    <div className={styles.container} style={{ justifyContent: "flex-start" }}>
      <main className={styles.main} style={{ justifyContent: "flex-start" }}>
        <h1 className={styles.title}>SORTEIO CHAMPS LEAGUE - COPA DO BRASIL</h1>
        <div className={styles.grid}>
          {list.map((player, index) => {
            const pos = index + 1;
            return (
              <div className={styles.card} key={index}>
                <span>
                  {pos}. {player}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.filters}>
          <button type="button" onClick={handleSort}>
            Sortear
          </button>
        </div>
      </main>
    </div>
  );
}
