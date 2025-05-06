"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('database.sqlite');
// Créer la table teams si elle n'existe pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    championship TEXT NOT NULL,
    countryFlag TEXT NOT NULL
  )`);
    // Supprimer les données existantes
    db.run('DELETE FROM teams');
    // Insérer les données initiales
    const teams = [
        {
            name: 'Paris Saint-Germain',
            logo: 'assets/images/teams/psg.png',
            championship: 'Ligue 1',
            countryFlag: 'assets/images/flags/fr.png'
        },
        {
            name: 'Real Madrid',
            logo: 'assets/images/teams/realmadrid.png',
            championship: 'La Liga',
            countryFlag: 'assets/images/flags/es.png'
        },
        {
            name: 'Manchester City',
            logo: 'assets/images/teams/mancity.png',
            championship: 'Premier League',
            countryFlag: 'assets/images/flags/gb.png'
        },
        {
            name: 'Bayern Munich',
            logo: 'assets/images/teams/bayern.png',
            championship: 'Bundesliga',
            countryFlag: 'assets/images/flags/de.png'
        },
        {
            name: 'Inter Milan',
            logo: 'assets/images/teams/inter.png',
            championship: 'Serie A',
            countryFlag: 'assets/images/flags/it.png'
        },
        {
            name: 'Benfica',
            logo: 'assets/images/teams/benfica.png',
            championship: 'Liga Portugal',
            countryFlag: 'assets/images/flags/pt.png'
        },
        {
            name: 'Young Boys',
            logo: 'assets/images/teams/youngboys.png',
            championship: 'Super League',
            countryFlag: 'assets/images/flags/ch.png'
        }
    ];
    const stmt = db.prepare('INSERT INTO teams (name, logo, championship, countryFlag) VALUES (?, ?, ?, ?)');
    teams.forEach(team => {
        stmt.run(team.name, team.logo, team.championship, team.countryFlag);
    });
    stmt.finalize();
});
console.log('Base de données initialisée avec succès');
db.close();
