import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchPokemon } from '../../../../../backend/src/services/pokeapi.service';

/**
 * Result list region — driven only by `query` from the URL.
 * Implement: fetch via API, loading/error/empty states, links to `/pokemon/:id`.
 */
export const SearchResultsPanel = memo(function SearchResultsPanel({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchPokemon(query);
        setResults(data ?? []); 
      } catch (err) {
        setError(err.message || 'Iets het fout gegaan');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  //States
  if (!query) {
    return (
      <p data-testid="search-results-empty" style={{ color: '#666' }}>
        Voer ’n soekterm in en druk Soek — die resultate verskyn hier sonder dat die bladsy herlaai.
      </p>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (results.length === 0) {
    return <p>Geen Pokémon gevind vir "{query}" nie.</p>;
  }

  return (
    <div data-testid="search-results-active" aria-live="polite">
      <h2 className="sr-only">Resultate</h2>
      <p>
        Resultate vir <strong>{query}</strong>
      </p>
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <Link to={`/pokemon/${item.id}`} state={{ pokemonData: item }}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
