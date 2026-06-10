import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/client.js';

/**
 * Login feature — root for `/login`.
 * Compose form fields, submit control, and error display components.
 */
export function LoginArea() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Epos en wagwoord is vereis.');
      return;
    }

    try {
      await login(email, password);
      navigate('/search');
    } catch (err) {
      setError(err.message || 'Aanmelding het gefaal.');
    }
  }

  return (
    <section>
      <h1>Meld aan</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
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
        <div style={{ marginBottom: '1rem' }}>
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
          Meld Aan
        </button>
        {error && <p style={{ color: 'crimson', marginBottom: '1rem' }}>{error}</p>}
      </form>
    </section>
  );
}
