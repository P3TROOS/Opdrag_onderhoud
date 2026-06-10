import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
//import { searchPokemon } from '../../../../../backend/src/services/pokeapi.service';

/**
 * Search input — commits query to the URL (`?q=`) via the history API.
 * No full page load: React Router updates location; parent layout stays mounted.
 */
export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const committed = searchParams.get('q') ?? '';
  const [value, setValue] = useState(committed);

  useEffect(() => {
    setValue(committed);
  }, [committed]);

  function handleSubmit(e) {
    e.preventDefault();
    const v = value.trim();
    if (v) {
      setSearchParams({ q: v });
      // try {
      //   const data = searchPokemon(v);
      //   console.log('React ' + data);
      // } catch (err) {
      //   console.log(err.message);
      // }
    } else {
      setSearchParams({});
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Soek Pokémon">
      <label htmlFor="search-q" className="sr-only">
        Soekterm
      </label>
      <input
        id="search-q"
        name="q"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Soek volgens naam…"
        style={{ marginRight: '0.5rem', minWidth: '16rem' }}
      />
      <button type="submit">Soek</button>
    </form>
  );
}
