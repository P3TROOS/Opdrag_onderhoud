// Backpack and team persistence; enforce ownership in every query.

import { createPool } from '../config/database.js';

const pool = createPool();

//Helpers - Rugsak
export async function listBackpack(userId) {
  const [rows] = await pool.query(
    'SELECT id, pokemon_id AS pokemonId, pokemon_name AS pokemonName, pokemon_sprite AS pokemonSprites, created_at AS createdAt FROM rugsak WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
  );
  return rows;
}

export async function addToBackpack(userId, pokemonId, pokemonName, pokemonSprites) {
  const [result] = await pool.query(
    'INSERT INTO rugsak (user_id, pokemon_id, pokemon_name, pokemon_sprite) VALUES (?, ?, ?, ?)',
    [userId, pokemonId, pokemonName, pokemonSprites.frontDefault],
  );

  return {
    id: result.insertId,
    pokemonId,
    pokemonName,
  };
}

export async function removeFromBackpack(userId, pokemonId) {
  await pool.query(
    'DELETE FROM rugsak WHERE user_id = ? AND pokemon_id = ?',
    [userId, pokemonId],
  );
}

// Helpers - Span
export async function listTeam(userId) {
  const [rows] = await pool.query(
    'SELECT id, pokemon_id AS pokemonId, pokemon_name AS pokemonName, pokemon_sprite AS pokemonSprites, created_at AS createdAt FROM team WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
  );
  return rows;
}

export async function countTeam(userId) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM team WHERE user_id = ?',
    [userId],
  );
  return Number(rows[0]?.count ?? 0);
}

export async function addToTeam(userId, pokemonId, pokemonName, pokemonSprite) {
  const currentCount = await countTeam(userId);
  if (currentCount >= 6) {
    const error = new Error('Team limit reached');
    error.code = 'TEAM_LIMIT';
    throw error;
  }

  const [result] = await pool.query(
    'INSERT INTO team (user_id, pokemon_id, pokemon_name, pokemon_sprite) VALUES (?, ?, ?, ?)',
    [userId, pokemonId, pokemonName, pokemonSprite],
  );

  return {
    id: result.insertId,
    pokemonId,
    pokemonName,
  };
}

export async function removeFromTeam(userId, pokemonId) {
  await pool.query(
    'DELETE FROM team WHERE user_id = ? AND pokemon_id = ?',
    [userId, pokemonId],
  );
}

export async function getBackpackItem(userId, pokemonId) {
  const [rows] = await pool.query(
    'SELECT id, pokemon_id AS pokemonId, pokemon_name AS pokemonName, pokemon_sprite AS pokemonSprites, created_at AS createdAt FROM rugsak WHERE user_id = ? AND pokemon_id = ? LIMIT 1',
    [userId, pokemonId],
  );
  return rows[0] || null;
}

