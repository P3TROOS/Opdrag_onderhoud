import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/client.js';

/**
 * Registration feature — root for `/register`.
 * Compose validation messages and fields as separate components.
 */
export function RegisterArea() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Wagwoord moet minstens 8 karakters wees.');
      return;
    }

    try {
      await register(email, password);
      navigate('/search');
    } catch (err) {
      setError(err.message || 'Registrasie het gefaal.');
    }
  }

  return (
    <section>
      <h1>Registreer</h1>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: '1rem'}}>
          <label htmlFor="email">
            Epos:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label htmlFor="password">
            Wagwoord:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Registreer
        </button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
    </section>
  );
}
