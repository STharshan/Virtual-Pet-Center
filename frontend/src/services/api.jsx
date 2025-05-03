const BASE_URL = 'http://localhost:5000/pets';

export const getAllPets = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addPet = async (pet) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  return res.json();
};

export const updatePet = async (id, pet) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet),
  });
  return res.json();
};

export const deletePet = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};

export const adoptPet = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/adopt`, { method: 'PATCH' });
  return res.json();
};

export const filterPetsByMood = async (mood) => {
  const res = await fetch(`${BASE_URL}/filter?mood=${mood}`);
  return res.json();
};

export const checkPetMoods = async () => {
  const res = await fetch(`${BASE_URL}/check-moods`);
  return res.json();
};