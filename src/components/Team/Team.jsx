import React from 'react';
import team from '../../data/team.json';
import styles from './Team.module.css';

const positionOrder = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
const positionLabels = {
  Goalkeeper: 'Goalkeepers',
  Defender: 'Defenders',
  Midfielder: 'Midfirlders',
  Forward: 'Forwards',
};

export default function Team() {
  const playersByPosition = team.players.reduce((acc, player) => {
    if (!acc[player.position]) acc[player.position] = [];
    acc[player.position].push(player);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1 className={styles.brand}>Team Squad</h1>

      {positionOrder.map((pos) => {
        const players = playersByPosition[pos];
        if (!players || players.length === 0) return null;
        return (
          <section key={pos} className={styles.section}>
            <h2 className={styles.heading}>{positionLabels[pos]}</h2>
            <ul className={styles.list}>
              {players.map((player) => (
                <li key={player.number} className={styles.item}>
                  <span className={styles.number}>#{player.number}</span>{' '}
                  <span className={styles.name}>{player.name}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className={styles.section}>
        <h2 className={styles.heading}>Coaches</h2>
        <ul className={styles.list}>
          {team.coaches.map((coach, idx) => (
            <li key={idx} className={styles.item}>
              <span className={styles.name}>{coach.name}</span>{' — '}
              <span className={styles.role}>{coach.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}