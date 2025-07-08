const API_URL = 'https://health-management-backend-one.vercel.app/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export async function apiFetch(path, options = {}) {
  try {
      const token = getToken();
  console.log(path);
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  console.log('API_URL:',API_URL);
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error((await res.json()).message || 'API error');
  return res.json();
  } catch (error) {
    console.log(error);
  }
}
