import * as collectionService from '../services/collection.service.js';

export async function list(_req, res) {
  const items = await collectionService.listBackpack(_req.user.id);
  res.json({ items });
}

export async function add(_req, res) {
  const { pokemonId, name , pokemonSprites} = _req.body;
  if (!pokemonId || !name || !pokemonSprites) {
    return res.status(400).json({ error: 'pokemonId, name, and pokemonSprites are required' });
  }

  try {
    const item = await collectionService.addToBackpack(_req.user.id, Number(pokemonId), name, pokemonSprites);
    res.status(201).json({ item });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Hierdie pokeon is klaar in jou rugsak' });
    }
    throw error;
  }
}

export async function remove(_req, res) {
  const { pokemonId } = _req.body;
  if (!pokemonId) {
    return res.status(400).json({ error: 'pokemonId is required' });
  }
  await collectionService.removeFromBackpack(_req.user.id, Number(pokemonId));
  res.status(204).end();
}
