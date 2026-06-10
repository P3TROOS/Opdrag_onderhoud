import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiFetch } from '../../api/client.js';

/**
 * Detail + evolution feature — root for `/pokemon/:pokeapiId`.
 * Compose e.g. `Sprite`, `StatsTable`, `EvolutionTree`, `OwnershipBadges` as child components.
 */
export function PokemonDetailArea() {
  const { pokeapiId } = useParams();
  const location = useLocation();
  const pokemon = location.state?.pokemonData;
  const [error, setError] = useState('');

  async function handleAddToBackpack() {
    setError('');
    try {
      await apiFetch('/api/backpack', {
        method: 'POST',
        body: JSON.stringify({
          pokemonId: pokemon.id,
          name: pokemon.forms?.[0]?.name || pokemon.name || '',
          pokemonSprites: {
            frontDefault: pokemon.sprites?.front_default || '',
          },
        }),
      });
    } catch (err) {
      setError(err.message || 'Kon nie bygevoeg word nie.');
    }
  }

  //Additional check - checks that no one navigates without using the link
  if (!pokemon) {
    return (
      <p>
        Geen Pokemon gevind. Asseblief kies een uit die lys.
      </p>
    );
  }

    // <section aria-labelledby="detail-title">
    //   <h1 id="detail-title">Pokémon #{pokeapiId}</h1>
    //   <p>Stub — implement detail and evolution views from smaller components.</p>
    // </section>
    return (
    <div className="detail-panel">
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
        <h2 style={{ textTransform: 'capitalize', margin: '0 0 0.25rem 0' }}>
          {pokemon.forms?.[0]?.name || 'Onbekend'} #{pokemon.id}
        </h2>
        <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
          <strong>Hoogte: </strong>{pokemon.height / 10} m ---- 
          <strong> Ervaring: </strong>{pokemon.base_experience} XP
        </p>
        <button
          type="button"
          onClick={handleAddToBackpack}
          style={{
            marginTop: '0.75rem',
            padding: '0.6rem 0.9rem',
            border: '1px solid #333',
            borderRadius: '6px',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
        >
          Voeg by rugsak
        </button>
        {status && <p style={{ margin: '0.5rem 0 0 0', color: 'green' }}>{status}</p>}
        {error && <p style={{ margin: '0.5rem 0 0 0', color: 'crimson' }}>{error}</p>}
      </header>


      {/*Sprites*/}
      <section style={{ margin: '1rem 0' }}>
        <h3>Sprites</h3>
        <div className="sprites-gallery" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
        
          {pokemon.sprites?.front_default && (
            <div style={{ textAlign: 'center', background: 'lightgrey', padding: '0.5rem', borderRadius: '6px' }}>
              <img 
                src={pokemon.sprites.front_default} 
                alt={`${pokemon.name} front default`} 
                style={{ width: '130px', height: '130px' }} 
              />
              <div>Voor</div>
            </div>
          )}

          {pokemon.sprites?.back_default && (
            <div style={{ textAlign: 'center', background: 'lightgrey', padding: '0.5rem', borderRadius: '6px' }}>
              <img 
                src={pokemon.sprites.back_default} 
                alt={`${pokemon.name} back default`} 
                style={{ width: '130px', height: '130px' }} 
              />
              <div>Agter</div>
            </div>
          )}
        </div>
      </section>

      {/*Abilities*/}
      <section style={{ margin: '1rem 0' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Abilities</h3>
        <ul>
          {pokemon.abilities?.map((item) => (
            <li key={item.slot} style={{ textTransform: 'capitalize'}}>
              <div>{item.ability.name}</div> 
            </li>
          ))}
        </ul>
      </section>

      {/*Moves*/}
      <section style={{ margin: '1rem 0' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Moves</h3>
        <div style={{ 
          maxHeight: '150px', 
          overflowY: 'auto', 
          border: '1px solid #eee', 
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {pokemon.moves?.map((item) => (
              <li key={item.move.name} style={{ textTransform: 'capitalize', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                {item.move.name.replace('-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*Stats Tabel*/}
      <section style={{ margin: '1rem 0' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Stats Tabel</h3>
        <div style={{ 
          maxHeight: '150px', 
          overflowY: 'auto', 
          border: '1px solid #eee', 
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {pokemon.moves?.map((item) => (
              <li key={item.move.name} style={{ textTransform: 'capitalize', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                {item.move.name.replace('-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )};
