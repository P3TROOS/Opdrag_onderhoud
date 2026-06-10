import { useEffect, useState } from 'react';
import { listTeam, moveToBackpack } from '../../api/client.js';

/**
 * Team feature — root for `/team`.
 * Compose slot grid, move controls, and feedback components.
 */
export function TeamArea() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await listTeam();
        if (mounted) setItems(data.items ?? []);
      } catch (err) {
        if (mounted) setError(err.message || 'Kon nie die span laai nie.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function handleMoveToBackpack(pokemonId) {
    setError('');
    try {
      await moveToBackpack(pokemonId);
      setItems((prev) => prev.filter((it) => it.pokemonId !== pokemonId));
    } catch (err) {
      setError(err.message || 'Kon nie terug skuif rugsak toe nie.');
    }
  }

  return (
    <section>
      <h1>Span</h1>
      {loading && <p>Laai span...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && items.length === 0 && <p>Jou span is leeg.</p>}

      {!loading && items.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.pokemonSprites && (
                  <img src={item.pokemonSprites} alt={item.pokemonName} style={{ width: 56, height: 56 }} />
                )}
                <div>
                  <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item.pokemonName}</div>
                  <div style={{ color: '#666' }}>#{item.pokemonId}</div>
                </div>
              </div>
              <div>
                <button 
                  type="button"
                  onClick={() => handleMoveToBackpack(item.pokemonId)} 
                  style={{ 
                    padding: '0.4rem 0.6rem', 
                    background: '#28a745', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 4, 
                    cursor: 'pointer'
                  }}
                >
                  Terug rugsak toe
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
