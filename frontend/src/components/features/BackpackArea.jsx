import { useEffect, useState } from 'react';
import { listBackpack, removeFromBackpack, moveFromBackpack } from '../../api/client.js';
/**
 * Backpack feature — root for `/backpack`.
 * Compose list rows, empty state, actions into dedicated components.
 */
export function BackpackArea() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function fetchBackpack() {
    setError('');
    try {
      const data = await listBackpack();
      setItems(data.items ?? []);
    } catch (err) {
      setError(err.message || 'Kon nie die rugsak lys laai nie.');
    }
  }

  useEffect(() => {
    fetchBackpack();
  }, []);

  async function handleRemove(pokemonId) {
    try {
      await removeFromBackpack(pokemonId);
      setItems((prev) => prev.filter((item) => item.pokemonId !== pokemonId));
    } catch (err) {
      setError(err.message || 'Kon nie verwyder word nie.');
    }
  }

  async function handleMoveToTeam(pokemonId) {
    try {
      await moveFromBackpack(pokemonId);
      setItems((prev) => prev.filter((item) => item.pokemonId !== pokemonId));
    } catch (err) {
      setError(err.message || 'Kon nie die Pokémon na die span skuif nie.');
    }
  }

  return (
    <section style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h1>Rugsak</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!error && items.length === 0 && (
        <p>Jou rugsak is leeg.</p>
      )}
      {!error && items.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div>
                <strong style={{ textTransform: 'capitalize' }}>{item.pokemonName}</strong>
                <div>#{item.pokemonId}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.pokemonSprites && (
                  <img
                    src={item.pokemonSprites}
                    alt={item.pokemonName}
                    style={{ width: '80px', height: '80px' }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleMoveToTeam(item.pokemonId)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Skuif na Span
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.pokemonId)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Verwyder
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
