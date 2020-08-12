import styles from "../assets/styles/Home.module.css";
import { useState } from "react";
import { teams, getLeagues } from "./api/teams";

const leagues = getLeagues();

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [filterLeague, setFilterLeague] = useState();
  const [filterStar, setFilterStar] = useState();
  const [matches, setMatches] = useState([]);

  const handleChangeLeague = (e) => {
    setFilterLeague(e.target.value);
  };

  const handleChangeStar = (e) => {
    setFilterStar(e.target.value ? parseFloat(e.target.value) : undefined);
  };

  const handleSelectTeam = (team) => {
    setSelected((prevState) => {
      const index = prevState.findIndex((t) => t.id === team.id);
      const newState = [...prevState];
      if (index !== -1) {
        newState.splice(index, 1);
        return newState;
      } else {
        return [...newState, team];
      }
    });
  };

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

  const handleStart = () => {
    const randomTeams = shuffle(selected);

    const totalMatches = Math.floor(selected.length / 2);

    const newMatches = [];
    let homeIndex = 0;
    let awayIndex = randomTeams.length - 1;
    for (let i = 0; i < totalMatches; i++) {
      newMatches.push({
        home: randomTeams[homeIndex],
        away: randomTeams[awayIndex],
      });
      homeIndex++;
      awayIndex--;
    }

    setMatches(newMatches);
  };

  if (matches && matches.length !== 0) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>FIGHT!</h1>
          <div className={styles.grid}>
            {matches.map((match) => (
              <div
                className={styles.card}
                key={`${match.home.id}_${match.away.id}`}
              >
                <img src={require(`../assets/images/${match.away.id}.webp`)} />
                <span
                  style={{
                    margin: "5px",
                    fontSize: "2rem",
                    marginBottom: "5px",
                  }}
                >
                  X
                </span>
                <img src={require(`../assets/images/${match.home.id}.webp`)} />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const teamsFiltered =
    filterLeague || filterStar
      ? teams.filter((team) => {
          const isLeagueEqual = filterLeague
            ? team.league === filterLeague
            : true;
          const isStarsEqual = filterStar ? team.stars === filterStar : true;
          return isStarsEqual && isLeagueEqual;
        })
      : teams;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>FIFA KOMBAT</h1>
        <div className={styles.filters}>
          <span>Filtrar por:</span>
          <select onChange={handleChangeLeague}>
            <option>Liga</option>
            {leagues &&
              leagues.map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
          </select>

          <select onChange={handleChangeStar}>
            <option>Estrelas</option>
            <option value="5">5</option>
            <option value="4.5">4.5</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
            <option value="2.5">2.5</option>
            <option value="2">2</option>
            <option value="1.5">1.5</option>
            <option value="1">1</option>
          </select>

          
        </div>

        <div className={styles.grid}>
          {teamsFiltered.map((team) => {
            return (
              <div
                className={styles.card}
                key={team.id}
                onClick={() => handleSelectTeam(team)}
              >
                <img src={require(`../assets/images/${team.id}.webp`)} />
                <span>{team.name}</span>
              </div>
            );
          })}
        </div>
      </main>

      {selected && selected.length !== 0 && (
        <footer className={styles.footer}>
          <div className={styles.gridrow}>
            {selected.map((team) => (
              <img
                key={team.id}
                src={require(`../assets/images/${team.id}.webp`)}
              />
            ))}
            {selected.length % 2 === 0 && (
              <button type="button" onClick={handleStart}>
                Start
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
