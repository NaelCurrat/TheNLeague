import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Création de la table teams
  await db.exec(`
    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT NOT NULL,
      championship TEXT NOT NULL,
      countryFlag TEXT NOT NULL
    )
  `);

  // Vérifier si la table est vide
  const count = await db.get('SELECT COUNT(*) as count FROM teams');
  if (count.count === 0) {
    // Insérer les données initiales
    await db.exec(`
      INSERT INTO teams (id, name, logo, championship, countryFlag) VALUES
      ('1', 'Manchester City', '../assets/images/teams/mancity.png', '../assets/images/championships/premierleague.png', '../assets/images/flags/gb.png'),
      ('2', 'Real Madrid', '../assets/images/teams/realmadrid.png', '../assets/images/championships/laliga.png', '../assets/images/flags/es.png'),
      ('3', 'Bayern Munich', '../assets/images/teams/bayern.png', '../assets/images/championships/bundesliga.png', '../assets/images/flags/de.png'),
      ('4', 'PSG', '../assets/images/teams/psg.png', '../assets/images/championships/ligue1.png', '../assets/images/flags/fr.png'),
      ('5', 'Inter Milan', '../assets/images/teams/inter.png', '../assets/images/championships/seriea.png', '../assets/images/flags/it.png'),
      ('6', 'Benfica', '../assets/images/teams/benfica.png', '../assets/images/championships/ligaportugal.png', '../assets/images/flags/pt.png'),
      ('7', 'Young Boys', '../assets/images/teams/youngboys.png', '../assets/images/championships/superleague.png', '../assets/images/flags/ch.png')
    `);
  }

  return db;
} 