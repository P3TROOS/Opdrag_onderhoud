const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

/**
 * JSON fetch helper; attaches Bearer token when present (set after login).
 */
export async function apiFetch(path, init = {}) {
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = {
    'Content-Type': 'application/json',
    ...init.headers,
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function register(email, password) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function login(email, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function listBackpack() {
  return apiFetch('/api/backpack');
}

export async function removeFromBackpack(pokemonId) {
  return apiFetch('/api/backpack/remove', {
    method: 'POST',
    body: JSON.stringify({ pokemonId }),
  });
}

export async function moveFromBackpack(pokemonId) {
  return apiFetch('/api/team/move-from-backpack', {
    method: 'POST',
    body: JSON.stringify({ pokemonId }),
  });
}

export async function listTeam() {
  return apiFetch('/api/team');
}

export async function moveToBackpack(pokemonId) {
  return apiFetch('/api/team/move-to-backpack', {
    method: 'POST',
    body: JSON.stringify({ pokemonId }),
  });
}
