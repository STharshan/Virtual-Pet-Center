import React, { useState } from 'react';
import { addPet } from '../services/api';

const AddPetForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', species: '', age: '', personality: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPet({ ...form, age: parseInt(form.age) });
    setForm({ name: '', species: '', age: '', personality: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="species"
          placeholder="Species"
          value={form.species}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="personality"
          placeholder="Personality"
          value={form.personality}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-200 w-full sm:w-auto"
        >
          Add Pet
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
