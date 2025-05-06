"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('database.sqlite');
// Création de la table teams
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    championship TEXT NOT NULL,
    countryFlag TEXT NOT NULL
  )`);
    // Données initiales
    const initialTeams = [
        {
            id: '1',
            name: 'Manchester City',
            logo: '/assets/images/teams/manchester-city.png',
            championship: '/assets/images/championships/premier-league.png',
            countryFlag: '/assets/images/flags/england.png'
        },
        {
            id: '2',
            name: 'Real Madrid',
            logo: '/assets/images/teams/real-madrid.png',
            championship: '/assets/images/championships/la-liga.png',
            countryFlag: '/assets/images/flags/spain.png'
        },
        {
            id: '3',
            name: 'Paris Saint-Germain',
            logo: '/assets/images/teams/psg.png',
            championship: '/assets/images/championships/ligue1.png',
            countryFlag: '/assets/images/flags/fr.png'
        },
        {
            id: '4',
            name: 'Bayern Munich',
            logo: '/assets/images/teams/bayern.png',
            championship: '/assets/images/championships/bundesliga.png',
            countryFlag: '/assets/images/flags/de.png'
        },
        {
            id: '5',
            name: 'Inter Milan',
            logo: '/assets/images/teams/inter.png',
            championship: '/assets/images/championships/seriea.png',
            countryFlag: '/assets/images/flags/it.png'
        },
        {
            id: '6',
            name: 'Benfica',
            logo: '/assets/images/teams/benfica.png',
            championship: '/assets/images/championships/ligaportugal.png',
            countryFlag: '/assets/images/flags/pt.png'
        },
        {
            id: '7',
            name: 'Young Boys',
            logo: '/assets/images/teams/youngboys.png',
            championship: '/assets/images/championships/superleague.png',
            countryFlag: '/assets/images/flags/ch.png'
        }
    ];
    // Insertion des données
    const stmt = db.prepare('INSERT OR REPLACE INTO teams (id, name, logo, championship, countryFlag) VALUES (?, ?, ?, ?, ?)');
    initialTeams.forEach(team => {
        stmt.run(team.id, team.name, team.logo, team.championship, team.countryFlag);
    });
    stmt.finalize();
});
db.close((err) => {
    if (err) {
        console.error('Erreur lors de la fermeture de la base de données:', err);
    }
    else {
        console.log('Base de données initialisée avec succès');
    }
});
