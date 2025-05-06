import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { Team } from './interfaces/team.interface';
import { initializeDatabase } from './database/db';

const server = fastify({
  logger: true
});

// Configuration CORS
server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

// Configuration des fichiers statiques
server.register(fastifyStatic, {
  root: path.join(__dirname, 'assets'),
  prefix: '/assets/'
});

// Routes
server.get('/teams', async (request, reply) => {
  const db = await initializeDatabase();
  const teams = await db.all('SELECT * FROM teams');
  return teams;
});

server.get('/teams/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const db = await initializeDatabase();
  const team = await db.get('SELECT * FROM teams WHERE id = ?', id);
  
  if (!team) {
    reply.code(404);
    return { error: 'Team not found' };
  }
  return team;
});

server.post('/teams', async (request, reply) => {
  const team = request.body as Team;
  const db = await initializeDatabase();
  await db.run(
    'INSERT INTO teams (id, name, logo, championship, countryFlag) VALUES (?, ?, ?, ?, ?)',
    [team.id, team.name, team.logo, team.championship, team.countryFlag]
  );
  return team;
});

server.put('/teams/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const updatedTeam = request.body as Team;
  const db = await initializeDatabase();
  
  const result = await db.run(
    'UPDATE teams SET name = ?, logo = ?, championship = ?, countryFlag = ? WHERE id = ?',
    [updatedTeam.name, updatedTeam.logo, updatedTeam.championship, updatedTeam.countryFlag, id]
  );

  if (result.changes === 0) {
    reply.code(404);
    return { error: 'Team not found' };
  }
  return updatedTeam;
});

server.delete('/teams/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM teams WHERE id = ?', id);

  if (result.changes === 0) {
    reply.code(404);
    return { error: 'Team not found' };
  }
  return { success: true };
});

// Démarrage du serveur
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Serveur démarré sur EC2');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();