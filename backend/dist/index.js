"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const server = (0, fastify_1.default)({
    logger: true
});
// Configuration CORS
server.register(cors_1.default, {
    origin: '*',
});
await server.listen({ port: 3000, host: '0.0.0.0' });
// Configuration des fichiers statiques
server.register(static_1.default, {
    root: path_1.default.join(__dirname, '..', '..', 'src', 'app', 'assets'),
    prefix: '/assets/'
});
// Données en mémoire
const teams = [
    {
        id: '1',
        name: 'Manchester City',
        logo: 'assets/images/teams/manchester-city.png',
        championship: 'assets/images/championships/premier-league.png',
        countryFlag: 'assets/images/flags/england.png'
    },
    {
        id: '2',
        name: 'Real Madrid',
        logo: 'assets/images/teams/real-madrid.png',
        championship: 'assets/images/championships/la-liga.png',
        countryFlag: 'assets/images/flags/spain.png'
    },
    {
        id: '3',
        name: 'Bayern Munich',
        logo: 'assets/images/teams/bayern-munich.png',
        championship: 'assets/images/championships/bundesliga.png',
        countryFlag: 'assets/images/flags/germany.png'
    },
    {
        id: '4',
        name: 'PSG',
        logo: 'assets/images/teams/psg.png',
        championship: 'assets/images/championships/ligue-1.png',
        countryFlag: 'assets/images/flags/france.png'
    },
    {
        id: '5',
        name: 'Inter Milan',
        logo: 'assets/images/teams/inter-milan.png',
        championship: 'assets/images/championships/serie-a.png',
        countryFlag: 'assets/images/flags/italy.png'
    },
    {
        id: '6',
        name: 'FC Porto',
        logo: 'assets/images/teams/porto.png',
        championship: 'assets/images/championships/liga-portugal.png',
        countryFlag: 'assets/images/flags/portugal.png'
    },
    {
        id: '7',
        name: 'PSV Eindhoven',
        logo: 'assets/images/teams/psv.png',
        championship: 'assets/images/championships/eredivisie.png',
        countryFlag: 'assets/images/flags/netherlands.png'
    }
];
// Routes
server.get('/teams', async () => {
    return teams;
});
server.get('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const team = teams.find(t => t.id === id);
    if (!team) {
        reply.code(404);
        return { error: 'Team not found' };
    }
    return team;
});
server.post('/teams', async (request, reply) => {
    const team = request.body;
    teams.push(team);
    return team;
});
server.put('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const updatedTeam = request.body;
    const index = teams.findIndex(t => t.id === id);
    if (index === -1) {
        reply.code(404);
        return { error: 'Team not found' };
    }
    teams[index] = updatedTeam;
    return updatedTeam;
});
server.delete('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const index = teams.findIndex(t => t.id === id);
    if (index === -1) {
        reply.code(404);
        return { error: 'Team not found' };
    }
    teams.splice(index, 1);
    return { success: true };
});
// Démarrage du serveur
const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Serveur démarré sur http://localhost:3000');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
