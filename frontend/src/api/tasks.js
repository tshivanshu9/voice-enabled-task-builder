const BASE = 'http://localhost:8000/api';

export async function getTasks(params = {}) {
  const { page = 1, limit = 5 } = params;
  const searchParams = new URLSearchParams({ page, limit });
  const url = `${BASE}/tasks?${searchParams.toString()}`;
  return fetch(url).then(r => r.json());
}

export async function getTask(id) {
  return fetch(`${BASE}/tasks/${id}`).then(r => r.json());
}

export async function createTask(data) {
  return fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());
}

export async function updateTask(id, data) {
  return fetch(`${BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());
}

export async function deleteTask(id) {
  return fetch(`${BASE}/tasks/${id}`, {
    method: 'DELETE',
  }).then(r => r.json());
}
