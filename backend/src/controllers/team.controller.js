import * as collectionService from '../services/collection.service.js';

export async function list(_req, res) {
  const items = await collectionService.listTeam(_req.user.id);
  res.json({ items });
}

export async function moveFromBackpack(_req, res) {
  const { pokemonId } = _req.body;
  if (!pokemonId) return res.status(400).json({ error: 'pokemonId required' });
  const item = await collectionService.getBackpackItem(_req.user.id, Number(pokemonId));
  if (!item) return res.status(404).json({ error: 'Pokémon not found in backpack' });

  try {
    const added = await collectionService.addToTeam(_req.user.id, item.pokemonId, item.pokemonName, item.pokemonSprites);
    await collectionService.removeFromBackpack(_req.user.id, Number(pokemonId));
    res.status(201).json({ member: added });
  } catch (err) {
    if (err.code === 'TEAM_LIMIT') return res.status(400).json({ error: 'Team may have maximum 6 members' });
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Pokémon already in team' });
    throw err;
  }
}

export async function moveToBackpack(_req, res) {
  const { pokemonId } = _req.body;
  if (!pokemonId) return res.status(400).json({ error: 'pokemonId required' });
  const teamItems = await collectionService.listTeam(_req.user.id);
  const member = teamItems.find((m) => m.pokemonId === Number(pokemonId));
  if (!member) return res.status(404).json({ error: 'Pokémon not found in team' });

  try {
    await collectionService.addToBackpack(_req.user.id, member.pokemonId, member.pokemonName, { frontDefault: member.pokemonSprites });
    await collectionService.removeFromTeam(_req.user.id, Number(pokemonId));
    res.status(201).end();
  } catch (err) {
    if (err.code === 'BACKPACK_LIMIT') return res.status(400).json({ error: 'Backpack may have maximum 6 Pokémon' });
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Pokémon already in backpack' });
    throw err;
  }
}

export async function removeFromTeam(_req, res) {
  const { pokemonId } = _req.body;
  if (!pokemonId) return res.status(400).json({ error: 'pokemonId required' });
  await collectionService.removeFromTeam(_req.user.id, Number(pokemonId));
  res.status(204).end();
}